#!/usr/bin/env node

/**
 * Script para fazer varredura completa do workspace n8n
 * Não modifica nada no n8n, apenas coleta informações
 */

import fs from 'fs';
import path from 'path';

const N8N_API_BASE = 'https://fluxos.eleveaagencia.com.br/api/v1';
const N8N_API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMjdiNTliMS1kNzA3LTQ0ZmMtOTNkZS03Y2NmYTNlN2RhNzEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzYwOTAwMTE3fQ.INFaDR3UONfjP6Gfd9MkO1kfGrV-b1af5yQDY36wBH4';

class N8NScanner {
  constructor() {
    this.baseURL = N8N_API_BASE;
    this.token = N8N_API_TOKEN;
    this.results = {
      workflows: [],
      credentials: [],
      executions: [],
      webhooks: [],
      summary: {}
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    console.log(`🔍 Scanning: ${endpoint}`);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'X-N8N-API-KEY': this.token,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        console.warn(`⚠️  Warning: ${response.status} ${response.statusText} for ${endpoint}`);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(`❌ Error scanning ${endpoint}:`, error.message);
      return null;
    }
  }

  async scanWorkflows() {
    console.log('\n📋 Scanning Workflows...');
    const workflows = await this.request('/workflows');
    
    if (workflows && Array.isArray(workflows)) {
      this.results.workflows = workflows;
      console.log(`✅ Found ${workflows.length} workflows`);
      
      // Analyze each workflow
      for (const workflow of workflows) {
        console.log(`  📄 ${workflow.name} (ID: ${workflow.id}) - Active: ${workflow.active}`);
        
        // Look for webhook nodes
        if (workflow.nodes) {
          const webhookNodes = workflow.nodes.filter(node => 
            node.type === 'n8n-nodes-base.webhook' || 
            node.type.includes('webhook')
          );
          
          if (webhookNodes.length > 0) {
            console.log(`    🔗 Webhooks found: ${webhookNodes.length}`);
            webhookNodes.forEach(webhook => {
              console.log(`      - Path: ${webhook.parameters?.path || 'N/A'}`);
              console.log(`      - Method: ${webhook.parameters?.httpMethod || 'N/A'}`);
            });
          }
        }
      }
    } else if (workflows) {
      console.log(`✅ Found workflows data:`, typeof workflows);
      console.log(`📊 Workflows data:`, JSON.stringify(workflows, null, 2));
    }
  }

  async scanCredentials() {
    console.log('\n🔑 Scanning Credentials...');
    const credentials = await this.request('/credentials');
    
    if (credentials) {
      this.results.credentials = credentials;
      console.log(`✅ Found ${credentials.length} credentials`);
      
      // Group by type
      const credentialTypes = {};
      credentials.forEach(cred => {
        credentialTypes[cred.type] = (credentialTypes[cred.type] || 0) + 1;
      });
      
      console.log('  📊 Credential Types:');
      Object.entries(credentialTypes).forEach(([type, count]) => {
        console.log(`    - ${type}: ${count}`);
      });
    }
  }

  async scanExecutions() {
    console.log('\n⚡ Scanning Recent Executions...');
    const executions = await this.request('/executions?limit=50');
    
    if (executions && executions.data) {
      this.results.executions = executions.data;
      console.log(`✅ Found ${executions.data.length} recent executions`);
      
      // Analyze execution status
      const statusCounts = {};
      executions.data.forEach(exec => {
        statusCounts[exec.status] = (statusCounts[exec.status] || 0) + 1;
      });
      
      console.log('  📊 Execution Status:');
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`    - ${status}: ${count}`);
      });
    }
  }

  async analyzeWorkflowPatterns() {
    console.log('\n🔍 Analyzing Workflow Patterns...');
    
    const patterns = {
      authentication: [],
      webhooks: [],
      integrations: [],
      aiWorkflows: []
    };

    this.results.workflows.forEach(workflow => {
      if (!workflow.nodes) return;

      // Check for authentication patterns
      const authNodes = workflow.nodes.filter(node => 
        node.type.includes('auth') || 
        node.type.includes('oauth') ||
        node.type.includes('login')
      );
      
      if (authNodes.length > 0) {
        patterns.authentication.push({
          workflow: workflow.name,
          id: workflow.id,
          nodes: authNodes.length
        });
      }

      // Check for webhook patterns
      const webhookNodes = workflow.nodes.filter(node => 
        node.type === 'n8n-nodes-base.webhook'
      );
      
      if (webhookNodes.length > 0) {
        patterns.webhooks.push({
          workflow: workflow.name,
          id: workflow.id,
          webhooks: webhookNodes.map(w => ({
            path: w.parameters?.path,
            method: w.parameters?.httpMethod
          }))
        });
      }

      // Check for AI patterns
      const aiNodes = workflow.nodes.filter(node => 
        node.type.includes('openai') ||
        node.type.includes('gemini') ||
        node.type.includes('ai') ||
        node.type.includes('agent')
      );
      
      if (aiNodes.length > 0) {
        patterns.aiWorkflows.push({
          workflow: workflow.name,
          id: workflow.id,
          aiNodes: aiNodes.length
        });
      }
    });

    console.log(`  🔐 Authentication Workflows: ${patterns.authentication.length}`);
    console.log(`  🔗 Webhook Workflows: ${patterns.webhooks.length}`);
    console.log(`  🤖 AI Workflows: ${patterns.aiWorkflows.length}`);

    this.results.patterns = patterns;
  }

  async generateSummary() {
    console.log('\n📊 Generating Summary...');
    
    this.results.summary = {
      totalWorkflows: this.results.workflows.length,
      activeWorkflows: this.results.workflows.filter(w => w.active).length,
      totalCredentials: this.results.credentials.length,
      recentExecutions: this.results.executions.length,
      webhookWorkflows: this.results.patterns?.webhooks.length || 0,
      authWorkflows: this.results.patterns?.authentication.length || 0,
      aiWorkflows: this.results.patterns?.aiWorkflows.length || 0
    };

    console.log('\n🎯 N8N Workspace Summary:');
    console.log(`  📋 Total Workflows: ${this.results.summary.totalWorkflows}`);
    console.log(`  ✅ Active Workflows: ${this.results.summary.activeWorkflows}`);
    console.log(`  🔑 Total Credentials: ${this.results.summary.totalCredentials}`);
    console.log(`  ⚡ Recent Executions: ${this.results.summary.recentExecutions}`);
    console.log(`  🔗 Webhook Workflows: ${this.results.summary.webhookWorkflows}`);
    console.log(`  🔐 Auth Workflows: ${this.results.summary.authWorkflows}`);
    console.log(`  🤖 AI Workflows: ${this.results.summary.aiWorkflows}`);
  }

  async saveResults() {
    const outputPath = path.join(process.cwd(), 'docs', 'n8n-scan-results.json');
    
    fs.writeFileSync(outputPath, JSON.stringify(this.results, null, 2));
    console.log(`\n💾 Results saved to: ${outputPath}`);
  }

  async scan() {
    console.log('🚀 Starting N8N Workspace Scan...');
    console.log('⚠️  Note: This script only reads data, it does not modify anything in n8n');
    
    await this.scanWorkflows();
    await this.scanCredentials();
    await this.scanExecutions();
    await this.analyzeWorkflowPatterns();
    await this.generateSummary();
    await this.saveResults();
    
    console.log('\n✅ Scan completed successfully!');
    return this.results;
  }
}

// Run the scan
const scanner = new N8NScanner();
scanner.scan().catch(console.error);

export default N8NScanner;

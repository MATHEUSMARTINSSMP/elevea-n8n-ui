#!/usr/bin/env node

/**
 * Script para testar diferentes métodos de autenticação da API n8n
 */

import fs from 'fs';

const N8N_BASE_URL = 'https://fluxos.eleveaagencia.com.br';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMjdiNTliMS1kNzA3LTQ0ZmMtOTNkZS03Y2NmYTNlN2RhNzEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzYwOTAwMTE3fQ.INFaDR3UONfjP6Gfd9MkO1kfGrV-b1af5yQDY36wBH4';

class N8NAPITester {
  constructor() {
    this.results = [];
  }

  async testEndpoint(url, headers = {}, method = 'GET') {
    console.log(`🔍 Testing: ${method} ${url}`);
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      const result = {
        url,
        method,
        headers,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        data: null
      };

      if (response.ok) {
        try {
          result.data = await response.json();
        } catch (e) {
          result.data = await response.text();
        }
      }

      console.log(`  ${result.ok ? '✅' : '❌'} ${result.status} ${result.statusText}`);
      return result;
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
      return {
        url,
        method,
        headers,
        error: error.message,
        ok: false
      };
    }
  }

  async testAllMethods() {
    console.log('🚀 Testing N8N API Authentication Methods...\n');

    const endpoints = [
      '/api/v1/workflows',
      '/api/workflows',
      '/workflows',
      '/api/v1/credentials',
      '/api/credentials',
      '/credentials'
    ];

    const authMethods = [
      { name: 'Bearer Token', headers: { 'Authorization': `Bearer ${API_TOKEN}` } },
      { name: 'X-N8N-API-KEY', headers: { 'X-N8N-API-KEY': API_TOKEN } },
      { name: 'API-Key', headers: { 'API-Key': API_TOKEN } },
      { name: 'X-API-Key', headers: { 'X-API-Key': API_TOKEN } },
      { name: 'Authorization Basic', headers: { 'Authorization': `Basic ${Buffer.from(API_TOKEN).toString('base64')}` } },
      { name: 'No Auth', headers: {} }
    ];

    for (const endpoint of endpoints) {
      console.log(`\n📋 Testing endpoint: ${endpoint}`);
      
      for (const authMethod of authMethods) {
        const url = `${N8N_BASE_URL}${endpoint}`;
        const result = await this.testEndpoint(url, authMethod.headers);
        
        this.results.push({
          ...result,
          authMethod: authMethod.name
        });

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Test webhook endpoints
    console.log('\n🔗 Testing webhook endpoints...');
    const webhookTests = [
      '/webhook-test/test',
      '/webhook/test',
      '/api/webhook/test'
    ];

    for (const webhook of webhookTests) {
      const url = `${N8N_BASE_URL}${webhook}`;
      const result = await this.testEndpoint(url, { 'X-N8N-API-KEY': API_TOKEN }, 'POST');
      
      this.results.push({
        ...result,
        authMethod: 'X-N8N-API-KEY (POST)'
      });
    }

    await this.saveResults();
    await this.generateSummary();
  }

  async saveResults() {
    const outputPath = 'docs/n8n-api-test-results.json';
    fs.writeFileSync(outputPath, JSON.stringify(this.results, null, 2));
    console.log(`\n💾 Test results saved to: ${outputPath}`);
  }

  async generateSummary() {
    console.log('\n📊 API Test Summary:');
    
    const successful = this.results.filter(r => r.ok);
    const failed = this.results.filter(r => !r.ok);
    
    console.log(`  ✅ Successful requests: ${successful.length}`);
    console.log(`  ❌ Failed requests: ${failed.length}`);
    
    if (successful.length > 0) {
      console.log('\n🎯 Working endpoints:');
      successful.forEach(result => {
        console.log(`  ${result.method} ${result.url} (${result.authMethod})`);
      });
    }

    if (failed.length > 0) {
      console.log('\n⚠️  Failed endpoints:');
      const statusCounts = {};
      failed.forEach(result => {
        statusCounts[result.status] = (statusCounts[result.status] || 0) + 1;
      });
      
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`  ${status}: ${count} requests`);
      });
    }
  }
}

// Run the tests
const tester = new N8NAPITester();
tester.testAllMethods().catch(console.error);

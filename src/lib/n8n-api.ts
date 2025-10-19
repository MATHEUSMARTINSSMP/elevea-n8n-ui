// N8N API Configuration
const N8N_API_BASE = 'https://fluxos.eleveaagencia.com.br/api/v1';
const N8N_API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMjdiNTliMS1kNzA3LTQ0ZmMtOTNkZS03Y2NmYTNlN2RhNzEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzYwOTAwMTE3fQ.INFaDR3UONfjP6Gfd9MkO1kfGrV-b1af5yQDY36wBH4';

export interface N8NWorkflow {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  nodes: any[];
  connections: any;
  settings?: any;
}

export interface N8NExecution {
  id: string;
  workflowId: string;
  status: string;
  startedAt: string;
  finishedAt?: string;
  data: any;
}

export interface N8NCredential {
  id: string;
  name: string;
  type: string;
  data: any;
}

class N8NAPI {
  private baseURL: string;
  private token: string;

  constructor() {
    this.baseURL = N8N_API_BASE;
    this.token = N8N_API_TOKEN;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`N8N API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Workflows
  async getWorkflows(): Promise<N8NWorkflow[]> {
    return this.request('/workflows');
  }

  async getWorkflow(id: string): Promise<N8NWorkflow> {
    return this.request(`/workflows/${id}`);
  }

  async activateWorkflow(id: string): Promise<N8NWorkflow> {
    return this.request(`/workflows/${id}/activate`, { method: 'POST' });
  }

  async deactivateWorkflow(id: string): Promise<N8NWorkflow> {
    return this.request(`/workflows/${id}/deactivate`, { method: 'POST' });
  }

  // Executions
  async getExecutions(workflowId?: string): Promise<N8NExecution[]> {
    const endpoint = workflowId ? `/executions?workflowId=${workflowId}` : '/executions';
    return this.request(endpoint);
  }

  async getExecution(id: string): Promise<N8NExecution> {
    return this.request(`/executions/${id}`);
  }

  // Credentials
  async getCredentials(): Promise<N8NCredential[]> {
    return this.request('/credentials');
  }

  async getCredential(id: string): Promise<N8NCredential> {
    return this.request(`/credentials/${id}`);
  }

  // Webhooks
  async getWebhooks(): Promise<any[]> {
    return this.request('/webhooks');
  }

  async getWebhook(id: string): Promise<any> {
    return this.request(`/webhooks/${id}`);
  }

  // Test webhook
  async testWebhook(webhookUrl: string, data: any): Promise<any> {
    return fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}

export const n8nAPI = new N8NAPI();

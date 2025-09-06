import { getAuthToken } from '@/lib/auth';

class ApiClient {
  private baseURL: string;
  private token?: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      cache: "force-cache"
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      // Handle different response types
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      } else {
        return (await response.text()) as T;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Create instances for different services
export const authApiClient = new ApiClient('https://service.rmosweb.com');
export const frontApiClient = new ApiClient('https://frontapi.rmosweb.com/api');

// Helper function to get authenticated front API client
export async function getAuthenticatedFrontApiClient(): Promise<ApiClient> {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('No authentication token found');
  }

  const client = new ApiClient('https://frontapi.rmosweb.com/api');
  client.setToken(token);
  return client;
}

export default ApiClient;

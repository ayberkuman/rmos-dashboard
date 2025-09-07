import type {
  LoginRequest,
  LoginResponse,
  ForecastRequest,
  ForecastResponse,
  BlacklistGetRequest,
  BlacklistGetResponse,
  BlacklistCreateUpdateRequest,
  BlacklistCreateUpdateResponse,
} from '@/lib/types/api';

// Base URLs
const AUTH_BASE_URL = 'https://service.rmosweb.com';
const FRONT_API_BASE_URL = 'https://frontapi.rmosweb.com/api';

// Token storage - we'll store the token in memory and sync with localStorage
let authToken: string | null = null;

// Initialize token from localStorage on client side
if (typeof window !== 'undefined') {
  authToken = localStorage.getItem('auth-token');
}

// Helper function to get auth token
export function getAuthToken(): string | null {
  return authToken;
}

// Helper function to set auth token
export function setAuthToken(token: string | null) {
  authToken = token;
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('auth-token', token);
    } else {
      localStorage.removeItem('auth-token');
    }
  }
}

// Generic fetch function with error handling
async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
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

// Generic authenticated fetch function
async function authenticatedApiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  if (!token) {
    throw new Error('No authentication token found');
  }

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  };

  return apiRequest<T>(url, config);
}

// Authentication query functions
export async function loginUser(request: LoginRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse>(`${AUTH_BASE_URL}/security/createToken`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

// Forecast query functions
export async function fetchForecastData(request: ForecastRequest): Promise<ForecastResponse> {
  return authenticatedApiRequest<ForecastResponse>(
    `${FRONT_API_BASE_URL}/Procedure/StpRmforKlasik_2`,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );
}

// Blacklist query functions
export async function fetchBlacklistData(request: BlacklistGetRequest): Promise<BlacklistGetResponse> {
  return authenticatedApiRequest<BlacklistGetResponse>(
    `${FRONT_API_BASE_URL}/Kara/Getir_Kod`,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );
}

export async function createBlacklistItem(request: BlacklistCreateUpdateRequest): Promise<BlacklistCreateUpdateResponse> {
  return authenticatedApiRequest<BlacklistCreateUpdateResponse>(
    `${FRONT_API_BASE_URL}/Kara/Ekle`,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );
}

export async function updateBlacklistItem(request: BlacklistCreateUpdateRequest): Promise<BlacklistCreateUpdateResponse> {
  return authenticatedApiRequest<BlacklistCreateUpdateResponse>(
    `${FRONT_API_BASE_URL}/Kara/Ekle`,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );
}
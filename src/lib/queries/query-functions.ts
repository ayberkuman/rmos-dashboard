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

const AUTH_BASE_URL = 'https://service.rmosweb.com';
const FRONT_API_BASE_URL = 'https://frontapi.rmosweb.com/api';

// Keep token in memory and sync with localStorage
let authToken: string | null = null;

// Grab token from localStorage when running in browser
if (typeof window !== 'undefined') {
  authToken = localStorage.getItem('auth-token');
}

export function getAuthToken(): string | null {
  return authToken;
}

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

    // Check if response is JSON or plain text
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

export async function loginUser(request: LoginRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse>(`${AUTH_BASE_URL}/security/createToken`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export async function fetchForecastData(request: ForecastRequest): Promise<ForecastResponse> {
  return authenticatedApiRequest<ForecastResponse>(
    `${FRONT_API_BASE_URL}/Procedure/StpRmforKlasik_2`,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );
}
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
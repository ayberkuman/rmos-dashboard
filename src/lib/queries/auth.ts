import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser, setAuthToken, getAuthToken } from './query-functions';
import type { LoginRequest, LoginResponse } from '@/lib/types/api';

export const authKeys = {
  all: ['auth'] as const,
  login: () => [...authKeys.all, 'login'] as const,
  token: () => [...authKeys.all, 'token'] as const,
} as const;

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: authKeys.login(),
    mutationFn: async (request: LoginRequest) => {
      // Hit the login endpoint and set the httpOnly cookie
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const result = await response.json();
      return result.token;
    },
    onSuccess: (token) => {
      // Save token locally and in query cache
      setAuthToken(token);
      queryClient.setQueryData(authKeys.token(), token);

      // Refresh forecast and blacklist data
      queryClient.invalidateQueries({ queryKey: ['forecast'] });
      queryClient.invalidateQueries({ queryKey: ['blacklist'] });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return async () => {
    try {
      // Clear the httpOnly cookie
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout API error:', error);
    }

    // Wipe everything clean
    setAuthToken(null);
    queryClient.setQueryData(authKeys.token(), null);
    queryClient.clear();

    // Back to login
    window.location.href = '/';
  };
}

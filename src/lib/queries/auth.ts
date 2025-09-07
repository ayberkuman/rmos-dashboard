import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser, setAuthToken, getAuthToken } from './query-functions';
import type { LoginRequest, LoginResponse } from '@/lib/types/api';

// Query keys for authentication
export const authKeys = {
  all: ['auth'] as const,
  login: () => [...authKeys.all, 'login'] as const,
  token: () => [...authKeys.all, 'token'] as const,
} as const;

// Login mutation
export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: authKeys.login(),
    mutationFn: async (request: LoginRequest) => {
      // Call the login API and also set httpOnly cookie via server action
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
      // Store the token in our token storage
      setAuthToken(token);

      // Store token in query client for easy access
      queryClient.setQueryData(authKeys.token(), token);

      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ['forecast'] });
      queryClient.invalidateQueries({ queryKey: ['blacklist'] });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
}


// Helper function to logout (clear token)
export function useLogout() {
  const queryClient = useQueryClient();

  return async () => {
    try {
      // Call logout API route to clear httpOnly cookie
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout API error:', error);
    }

    // Clear the token from storage
    setAuthToken(null);

    // Clear token from query client
    queryClient.setQueryData(authKeys.token(), null);

    // Clear all queries
    queryClient.clear();

    // Redirect to login page
    window.location.href = '/';
  };
}

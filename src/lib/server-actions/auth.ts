'use server';

import { authApiClient } from '@/lib/api-client';
import type { LoginRequest, LoginResponse } from '@/lib/types/api';
import { loginSchema } from '@/lib/validations/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  // Parse and validate form data
  const rawFormData = {
    userName: formData.get('userName'),
    password: formData.get('password'),
  };

  const validatedFields = loginSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { userName, password } = validatedFields.data;

  try {
    // Call the RMOS API to authenticate using the API client
    const loginData: LoginRequest = {
      userName,
      password,
    };

    const token = await authApiClient.post<LoginResponse>('/security/createToken', loginData);

    // Store JWT in httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Redirect to forecast page on success
    redirect('/forecast');
  } catch (error) {
    // Don't catch redirect errors - let them bubble up
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    console.log(error);
    console.error('Login error:', error);
    return {
      errors: {
        root: ['An error occurred during login. Please try again.'],
      },
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  redirect("/");
}
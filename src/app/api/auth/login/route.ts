import { NextRequest, NextResponse } from 'next/server';
import { authApiClient } from '@/lib/api-client';
import type { LoginRequest, LoginResponse } from '@/lib/types/api';
import { loginSchema } from '@/lib/validations/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();

    // Validate the request
    const validatedFields = loginSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: 'Invalid credentials', details: validatedFields.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { userName, password } = validatedFields.data;

    // Call the RMOS API to authenticate
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

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 401 }
    );
  }
}

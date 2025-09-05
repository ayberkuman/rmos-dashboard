import { z } from 'zod';

export const loginSchema = z.object({
  userName: z.email(),
  password: z
    .string()
    .min(1, 'Password is required')
});

export type LoginFormData = z.infer<typeof loginSchema>;

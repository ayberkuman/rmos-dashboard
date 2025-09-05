"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { loginAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<{
    root?: string[];
    userName?: string[];
    password?: string[];
  }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerErrors({});

    try {
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("password", data.password);

      const result = await loginAction(formData);

      if (result?.errors) {
        setServerErrors(result.errors);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setServerErrors({
        root: ["An unexpected error occurred. Please try again."],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="userName">Email Address</Label>
          <Input
            id="userName"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            {...register("userName")}
            className="mt-1"
          />
          {errors.userName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.userName.message}
            </p>
          )}
          {serverErrors.userName && (
            <p className="mt-1 text-sm text-red-600">
              {serverErrors.userName[0]}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            {...register("password")}
            className="mt-1"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
          {serverErrors.password && (
            <p className="mt-1 text-sm text-red-600">
              {serverErrors.password[0]}
            </p>
          )}
        </div>
      </div>

      {serverErrors.root && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">
            {serverErrors.root.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        </div>
      )}

      <div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Demo credentials: yunus@test.com / yunus
        </p>
      </div>
    </form>
  );
}

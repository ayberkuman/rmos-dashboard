"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useLoginMutation } from "@/lib/queries/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        // Go to dashboard
        router.push("/forecast");
      },
      onError: (error) => {
        // Show error message
        if (
          error.message.includes("401") ||
          error.message.includes("Unauthorized")
        ) {
          setError("root", {
            message: "Invalid credentials. Please try again.",
          });
        } else {
          setError("root", {
            message: "An unexpected error occurred. Please try again.",
          });
        }
      },
    });
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
        </div>
      </div>

      {errors.root && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{errors.root.message}</div>
        </div>
      )}

      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
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

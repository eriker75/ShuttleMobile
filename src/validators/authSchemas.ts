import { z } from "zod";

// Email validation schema
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

// Code validation schema
export const codeSchema = z.object({
  code: z
    .string()
    .min(1, "Verification code is required")
    .length(6, "Verification code must be 6 digits"),
});

// Simple login schema for demo
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters"),
});

export type EmailForm = z.infer<typeof emailSchema>;
export type CodeForm = z.infer<typeof codeSchema>;
export type LoginForm = z.infer<typeof loginSchema>;

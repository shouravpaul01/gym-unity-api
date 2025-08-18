import { z } from "zod";

const userRoleEnum = z.enum(["admin", "trainer", "trainee"]);

export const registerValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: userRoleEnum.optional(),
   
  }),
});

export const loginValidation = z.object({
  body: z.object({
    email: z.string().email("Valid email is required"),
    password: z.string().min(1, "Password is required"),
  }),
});

export const AuthValidation = {
   registerValidation,
   loginValidation,
};

export default AuthValidation;


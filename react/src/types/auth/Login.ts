import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 6 characters" }),
    rememberMe: z.boolean().optional(),
})

export type LoginType = z.infer<typeof LoginSchema>
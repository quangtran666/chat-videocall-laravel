import {z} from "zod";

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    email_verified_at: z.string().datetime().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    avatar_url: z.string().nullable()
});

export type UserType = z.infer<typeof UserSchema>;
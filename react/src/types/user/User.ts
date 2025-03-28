import {z} from "zod";

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    avatar_url: z.string().nullable()
});

export const ExtendedUserSchema = UserSchema.extend({
    mutual_friends_count: z.number().optional(),
})

export type UserType = z.infer<typeof UserSchema>;
export type ExtendedUserType = z.infer<typeof ExtendedUserSchema>;

export type FriendAction = 'send' | 'accept' | 'reject' | 'cancel';

export const FriendSchema = ExtendedUserSchema.extend({
    online: z.boolean(),
    last_active: z.string().datetime().nullable(),
})

export type FriendType = z.infer<typeof FriendSchema>;
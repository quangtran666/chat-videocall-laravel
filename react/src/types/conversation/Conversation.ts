import {z} from "zod";
import {UserSchema} from "@/types/user/User.ts";
import {CursorPaginateRequest} from "@/types/paginate/cursorPaginateResponse.ts";

// @ts-ignore
export const MessageSchema = z.object({
    id: z.string(),
    content: z.string(),
    type: z.string(),
    created_at: z.string().datetime(),
    sender: UserSchema,
    reply_id: z.number().nullable(),
    // @ts-ignore
    reply: z.lazy(() => MessageSchema.nullable()),
    files: z.array(z.object({
        id: z.string(),
        url: z.string(),
        name: z.string(),
        type: z.string(),
    })).optional(),
    reactions_count: z.number().default(0),
    // Client-side property for optimistic updates
    status: z.enum(['sending', 'sent', 'error']).optional(),
})

export type MessageType = z.infer<typeof MessageSchema>;

export type MessageCursorPaginateRequest = CursorPaginateRequest & { conversationId: string }

export const SendMessageRequestSchema = z.object({
    content: z.string(),
    replyId: z.string().nullable(),
    files: z.array(z.instanceof(File)).optional(),
})

export type SendMessageRequestType = z.infer<typeof SendMessageRequestSchema>;
//
// export const SendMessageRequestSchema = SendMessageFormSchema.extend({
//     conversationId: z.string(),
// })
//
// export type SendMessageRequestType = z.infer<typeof SendMessageRequestSchema>;
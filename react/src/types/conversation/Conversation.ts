import {z} from "zod";
import {ExtendedUserSchema} from "@/types/user/User.ts";
import {CursorPaginateRequest} from "@/types/paginate/cursorPaginateResponse.ts";

// @ts-ignore
export const MessageSchema = z.object({
    id: z.number(),
    content: z.string(),
    type: z.string(),
    created_at: z.string().datetime(),
    sender: ExtendedUserSchema,
    reply_id: z.number().nullable(),
    // @ts-ignore
    reply: z.lazy(() => MessageSchema.nullable()),
    files: z.array(z.object({
        id: z.number(),
        url: z.string(),
        name: z.string(),
        type: z.string(),
    })).optional(),
    reactions_count: z.number().default(0),
})

export type MessageType = z.infer<typeof MessageSchema>;

export type MessageCursorPaginateRequest = CursorPaginateRequest & { conversationId: string }

import {z} from "zod";

export const RoomSchema = z.object({
    name: z.string()
        .min(1, { message: "Room name cannot be empty" })
        .max(100, { message: "Room name cannot exceed 100 characters" }),
    description: z.string()
        .max(500, { message: "Description cannot exceed 500 characters" }),
    is_private: z.boolean({
        invalid_type_error: "Room status must be a boolean (true/false)",
    }),
    tags: z.array(z.string())
        .min(1, { message: "At least one tag is required" })
        .max(10, { message: "Cannot have more than 10 tags" }),
});

export type RoomType = z.infer<typeof RoomSchema>;

export type RoomRequest = RoomType & { owner_id: number | undefined };
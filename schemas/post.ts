import { z } from "zod";

export const postSchema = z.object({
    title: z.string().min(2, { message: "Title is required" }),
    body: z.string().min(8, { message: "Please write something meaningful" }),
    channelId: z.string().min(8, { message: "Please select a channel" }),
});

export type PostSchema = z.infer<typeof postSchema>;

"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { postSchema, PostSchema } from "@/schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { Textarea } from "@/components/ui/textarea";
import { Channel } from "@prisma/client";
import { createPost } from "../_actions/post";

type NewPostFormProps = {
    channels: Channel[];
};

export const NewPostForm = ({ channels }: NewPostFormProps) => {
    const { result, status, execute } = useAction(createPost);

    const form = useForm<PostSchema>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            body: "",
            channelId: "",
        },
    });

    async function onSubmit({ title, body, channelId }: PostSchema) {
        execute({
            body,
            title,
            channelId,
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="john" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Body</FormLabel>
                            <FormControl>
                                <Textarea {...field} rows={4} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="channelId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Channel</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select channel to post" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {channels.map((channel) => (
                                        <SelectItem
                                            value={channel.id}
                                            key={channel.id}
                                        >
                                            {channel.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {result?.data?.error?.auth && (
                    <FormMessage>{result.data.error.auth}</FormMessage>
                )}

                {result?.serverError && (
                    <FormMessage>{result.serverError}</FormMessage>
                )}

                <Button type="submit" disabled={status === "executing"}>
                    Submit
                </Button>
            </form>
        </Form>
    );
};

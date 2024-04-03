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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../_actions/comment";
import { CommentSchema, commentSchema } from "@/schemas/comment";

type CommentFormProps = {
    postId: string;
    slug: string;
};

export const CommentForm = ({ postId, slug }: CommentFormProps) => {
    const { result, status, execute } = useAction(createComment);

    const form = useForm<CommentSchema>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            body: "",
            postId: "",
            slug: "",
        },
    });

    async function onSubmit({ body }: CommentSchema) {
        execute({
            body,
            postId,
            slug,
        });
        form.reset();
    }

    return (
        <div className="p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="body"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Comment</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Type your message here."
                                        {...field}
                                    />
                                </FormControl>
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

                    <Button
                        type="submit"
                        disabled={status === "executing"}
                        size="sm"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

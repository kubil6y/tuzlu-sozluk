"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { FormWrapper } from "./form-wrapper";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { loginUser } from "../_actions/user";

export const LoginForm = () => {
    const { result, status, execute } = useAction(loginUser);

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <FormWrapper
            label="Welcome back"
            backButtonText="Don't have an account?"
            backButtonHref="/register"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(execute)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="john@email.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="******"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {result?.data?.error && (
                        <FormMessage>{result.data.error}</FormMessage>
                    )}
                    <Button type="submit" disabled={status === "executing"}>
                        Submit
                    </Button>
                </form>
            </Form>
        </FormWrapper>
    );
};

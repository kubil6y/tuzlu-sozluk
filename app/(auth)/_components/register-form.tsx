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
import { registerUser } from "../_actions/user";
import { useForm } from "react-hook-form";
import { RegisterSchema, registerSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";

export const RegisterForm = () => {
    const { result, status, execute } = useAction(registerUser);

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    });

    let emailErrorMessage: string = "";
    if (result?.data?.error?.email) {
        emailErrorMessage = result.data.error.email;
    } else if (form.formState.errors?.email?.message) {
        emailErrorMessage = form.formState.errors.email.message;
    }

    let usernameErrorMessage: string = "";
    if (result?.data?.error?.username) {
        usernameErrorMessage = result.data.error.username;
    } else if (form.formState.errors?.username?.message) {
        usernameErrorMessage = form.formState.errors.username.message;
    }

    return (
        <FormWrapper
            label="Create an account"
            backButtonText="Already have an account?"
            backButtonHref="/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(execute)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="john" {...field} />
                                </FormControl>
                                {usernameErrorMessage && (
                                    <FormMessage>
                                        {usernameErrorMessage}
                                    </FormMessage>
                                )}
                            </FormItem>
                        )}
                    />

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
                                {emailErrorMessage && (
                                    <FormMessage>
                                        {emailErrorMessage}
                                    </FormMessage>
                                )}
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
                    {result?.serverError && (
                        <FormMessage>{result.serverError}</FormMessage>
                    )}
                    <Button type="submit" disabled={status === "executing"}>
                        Submit
                    </Button>
                </form>
            </Form>
        </FormWrapper>
    );
};

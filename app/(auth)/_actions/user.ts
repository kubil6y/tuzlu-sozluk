"use server";

import bcyrpt from "bcryptjs";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { loginSchema, registerSchema } from "@/schemas/user";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const registerUser = action(
    registerSchema,
    async ({ email, username, password }) => {
        const emailExists = await getUserByEmail(email);

        if (emailExists) {
            return {
                error: {
                    email: "Email is already taken",
                },
            };
        }

        const usernameExists = await db.user.findFirst({
            where: { username },
        });
        if (usernameExists) {
            return {
                error: {
                    username: `Username '${username}' is already taken`,
                },
            };
        }
        const hashedPassword = await bcyrpt.hash(password, 10);
        await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        redirect("/login");
    }
);

export const loginUser = action(loginSchema, async ({ email, password }) => {
    try {
        await signIn("credentials", {
            email,
            password,
        });
        redirect("/");
    } catch (err) {
        if (err instanceof AuthError) {
            switch (err.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw err;
    }
});

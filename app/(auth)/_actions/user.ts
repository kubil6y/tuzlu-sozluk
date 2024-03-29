"use server";

import bcyrpt from "bcryptjs";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { registerSchema } from "@/schemas/user";
import { redirect } from "next/navigation";

export const registerUser = action(
    registerSchema,
    async ({ email, username, password }) => {
        const emailExists = await db.user.findFirst({
            where: { email },
        });

        if (emailExists) {
            return {
                error: {
                    email: "Email is already taken",
                },
            };
        }

        const usernameExists = await db.user.findFirst({
            where: { username }
        })
        if (usernameExists) {
            return {
                error: {
                    username: `Username '${username}' is already taken`
                }
            }
        }
        const hashedPassword = await bcyrpt.hash(password, 10);
        await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        redirect("/");
    }
);

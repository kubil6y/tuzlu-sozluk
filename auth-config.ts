import bcyrpt from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./data/user";
import { loginSchema } from "./schemas/user";

export const authConfig = {
    providers: [
        GitHub,
        Credentials({
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials);
                if (!validatedFields.success) {
                    return null;
                }
                const { email, password } = validatedFields.data;
                const user = await getUserByEmail(email);
                if (!user || !user?.password) {
                    return null;
                }
                const passwordMatches = await bcyrpt.compare(
                    password,
                    user.password
                );
                if (!passwordMatches) {
                    return null;
                }
                return user;
            },
        }),
    ],
} satisfies NextAuthConfig;

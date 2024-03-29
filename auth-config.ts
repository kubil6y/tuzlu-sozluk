import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    providers: [
        GitHub,
        Credentials({
            async authorize(credentials, request) {
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;

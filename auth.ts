import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "@/lib/db";
import { authConfig } from "./auth-config";
import { getUserById } from "./data/user";

export const {
    signIn,
    signOut,
    handlers: { GET, POST },
    auth,
} = NextAuth({
    callbacks: {
        // Execution flow: jwt -> session -> user;
        async jwt({token}) {
            if (!token?.sub) {
                return token;
            }
            const user = await getUserById(token.sub);
            if (!user) {
                return token;
            }
            if (user.username) {
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.username = token.username;
            }
            return session;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});

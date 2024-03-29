import NextAuth from "next-auth";
import { authConfig } from "./auth-config";

const { auth } = NextAuth(authConfig);

const routes = {
    auth: ["/login", "/register"],
};

export default auth((req) => {
    const isLoggedIn = Boolean(req.auth);
    const isAuthRoute = routes.auth.includes(req.nextUrl.pathname);
    if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL("/", req.nextUrl));
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

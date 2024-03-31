import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { fontSans } from "@/components/fonts";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Tuzlu Sozluk",
    description: "eksimsi sozluk",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="en" suppressHydrationWarning>
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        fontSans.variable
                    )}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}

                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}

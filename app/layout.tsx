import "./globals.css";
import type { Metadata } from "next";
import { fontSans } from "@/components/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Sozluk",
    description: "eksimsi sozluk",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                {children}
            </body>
        </html>
    );
}

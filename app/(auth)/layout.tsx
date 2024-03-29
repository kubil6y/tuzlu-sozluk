export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex items-center justify-center h-screen w-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
            {children}
        </div>
    );
}

import { SideNav } from "./_components/side-nav";
import { TopNav } from "./_components/top-nav";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="container mx-auto">
            <TopNav />

            <div className="flex">
                <SideNav />
                <main className="flex-grow w-full">{children}</main>
            </div>
        </div>
    );
}

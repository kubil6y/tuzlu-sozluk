import { LineBar } from "./_components/line-bar";
import { SideNav } from "./_components/side-nav";
import { TopNav } from "./_components/top-nav";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <LineBar />
            <div className="container mx-auto">
                <TopNav />
                <div className="flex">
                    <SideNav />
                    <main className="flex-grow w-full p-4">{children}</main>
                </div>
            </div>
        </>
    );
}

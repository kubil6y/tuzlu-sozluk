import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SearchBar } from "./search-bar";
import { Logo } from "@/components/logo";
import { ChannelsNav } from "./channels-nav";
import { auth } from "@/auth";
import { NewPostIcon } from "./new-post-icon";
import { UserNav } from "./user-nav";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export async function TopNav() {
    const session = await auth();
    return (
        <div>
            <div className="flex items-center justify-between mt-2">
                <Logo />
                <SearchBar />

                {session?.user ? (
                    <div className="flex items-center space-x-4">
                        <NewPostIcon />
                        {session?.user && <UserNav />}
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link href="/login">login</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/register">register</Link>
                        </Button>
                        <ThemeToggle />
                    </div>
                )}
            </div>
            <ChannelsNav />
            <Separator />
        </div>
    );
}

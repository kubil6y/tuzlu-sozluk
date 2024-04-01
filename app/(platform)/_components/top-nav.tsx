import { Separator } from "@/components/ui/separator";
import { SearchBar } from "./search-bar";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChannelsNav } from "./channels-nav";
import { auth } from "@/auth";
import { NewPostIcon } from "./new-post-icon";

export async function TopNav() {
    const session = await auth();
    return (
        <div>
            <div className="flex items-center justify-between">
                <Logo />
                <SearchBar />

                <div className="flex items-center space-x-4">
                    <NewPostIcon />
                    {session?.user && <p>logged in</p>}
                    <ThemeToggle />
                </div>
            </div>
            <ChannelsNav />
            <Separator />
        </div>
    );
}

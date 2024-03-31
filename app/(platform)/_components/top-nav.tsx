import { Separator } from "@/components/ui/separator";
import { SearchBar } from "./search-bar";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChannelsNav } from "./channels-nav";
import { auth } from "@/auth";

export async function TopNav() {
    const session = await auth();
    return (
        <div>
            <div className="flex items-center justify-between">
                <Logo />
                <SearchBar />
                {session?.user && <p>logged in</p>}
                <ThemeToggle />
            </div>
            <ChannelsNav />
            <Separator />
        </div>
    )
}

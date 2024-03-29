import { Separator } from "@/components/ui/separator";
import { SearchBar } from "./search-bar";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function TopNav() {
    return (
        <div>
            <div className="flex items-center justify-between bg-pink-300">
                <Logo />
                <SearchBar />
                <ThemeToggle />
            </div>
            <Separator />
        </div>
    )
}

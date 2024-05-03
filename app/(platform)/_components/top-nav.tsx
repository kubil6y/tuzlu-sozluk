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
        <div className="">
            <div className="my-4 flex items-center justify-between">
                <Logo />

                <div className="hidden w-full md:block md:w-[40%] ">
                    <SearchBar />
                </div>

                {session?.user ? (
                    <div className="flex items-center space-x-4">
                        <NewPostIcon />
                        {session?.user && <UserNav />}
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <div className="hidden items-center space-x-2 md:flex ">
                            <Button variant="outline" asChild>
                                <Link href="/login">login</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/register">register</Link>
                            </Button>
                        </div>
                        <ThemeToggle />
                    </div>
                )}
            </div>

            <div className="mb-4 block md:hidden">
                <SearchBar />
            </div>

            {!session?.user && (
                <div className="mb-2 flex items-center space-x-4 md:hidden">
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/login">login</Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/register">register</Link>
                    </Button>
                </div>
            )}

            <ChannelsNav />
            <Separator />
        </div>
    );
}

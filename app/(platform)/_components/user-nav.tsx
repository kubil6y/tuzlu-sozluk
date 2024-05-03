"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { LogOut, MoonIcon, SunIcon, UserIcon } from "lucide-react";

export function UserNav() {
    const session = useSession();
    const mounted = useMounted();
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const ThemeIcon = theme === "light" ? SunIcon : MoonIcon;

    if (!mounted) {
        return null;
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" className="rounded-full">
                    <UserIcon />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session?.data?.user?.username && (
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => router.push(`/users/${session.data.user.username}`)}>
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                )}
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <ThemeIcon className="mr-2 h-4 w-4" />
                            <span>Theme</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem
                                    onClick={() => setTheme("light")}
                                >
                                    <SunIcon className="mr-2 h-4 w-4" />
                                    <span>Light</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setTheme("dark")}
                                >
                                    <MoonIcon className="mr-2 h-4 w-4" />
                                    <span>Dark</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        signOut({
                            callbackUrl: "/",
                            redirect: true,
                        });
                    }}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

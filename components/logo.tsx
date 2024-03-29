import Link from "next/link";
import { Icons } from "./icons";
import { titleFont } from "./fonts";
import { cn } from "@/lib/utils";

export const Logo = () => {
    return (
        <Link
            href="/"
            className="cursor-pointer flex items-center w-[200px] p-2 bg-blue-500"
        >
            <h1
                className={cn(
                    titleFont.className,
                    "text-2xl uppercase flex items-center justify-center"
                )}
            >
                TUZLU
                <span>
                    <Icons.logo className="size-6 mx-2" />
                </span>
                SOZLUK
            </h1>
        </Link>
    );
};

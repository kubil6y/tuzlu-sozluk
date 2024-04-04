import Link from "next/link";
import { titleFont } from "./fonts";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

export const Logo = () => {
    return (
        <Link
            href="/"
            className="cursor-pointer flex items-center w-[200px] p-2"
        >
            <h1
                className={cn(
                    titleFont.className,
                    "text-2xl uppercase flex items-center justify-center"
                )}
            >
                TUZLU
                <Icons.logo className="size-6 mx-2 fill-fuchsia-600" />
                SOZLUK
            </h1>
        </Link>
    );
};

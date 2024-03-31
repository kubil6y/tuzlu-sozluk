"use client";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { useTheme } from "next-themes";

export const LogoIcon = () => {
    const { theme } = useTheme();
    const fillColor = theme === "light" ? "fill-fuchsia-600" : "fill-pink-400";
    return <Icons.logo className={cn("size-6 mx-2", fillColor)} />;
};

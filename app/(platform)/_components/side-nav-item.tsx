import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type SideNavItemProps = {
    title: string;
    slug: string;
    commentAmount: number;
};

export function SideNavItem({ title, slug, commentAmount }: SideNavItemProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={`/posts/${slug}`}
                        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-primary/80 transition hover:text-white"
                    >
                        <p className="w-[90%] truncate">{title}</p>
                        <p className="w-[10%] text-end">{commentAmount}</p>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

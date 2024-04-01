import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export const NewPostIcon = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Link
                        href="/posts/new"
                        className="rounded-full bg-indigo-500 flex items-center justify-center p-1"
                    >
                        <PlusIcon className="size-4 text-white" />
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>New post</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

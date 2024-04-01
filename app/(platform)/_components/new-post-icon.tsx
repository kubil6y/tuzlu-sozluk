import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NewPostIcon = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" className="rounded-full" asChild>
                        <Link href="/posts/new">
                            <PlusIcon />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>New post</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

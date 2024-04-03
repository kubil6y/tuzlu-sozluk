"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
        return [1, 2, 3, "E", totalPages - 1, totalPages];
    }
    if (currentPage >= totalPages - 2) {
        return [1, 2, "E", totalPages - 2, totalPages - 1, totalPages];
    }
    return [
        1,
        "E",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "E",
        totalPages,
    ];
};

type CustomPaginationProps = {
    totalPages: number;
};

export function CustomPagination({ totalPages }: CustomPaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;
    const paginationItems = generatePagination(currentPage, totalPages);
    const isPrevActive = currentPage > 1;
    const isNextActive = currentPage < totalPages;
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <div className={cn(!isPrevActive && "pointer-events-none")}>
                        <PaginationPrevious href="#" className={cn(!isPrevActive && "text-foreground/50")}/>
                    </div>
                </PaginationItem>
                {paginationItems.map((item, i) => (
                    <PaginationItem key={i}>
                        {item === "E" ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href="#"
                                isActive={
                                    item ? item === currentPage : item === 1
                                }
                            >
                                {item}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
                <div className={cn(!isNextActive && "pointer-events-none")}>
                    <PaginationNext href="#" className={cn(!isNextActive && "text-foreground/50")}/>
                </div>
            </PaginationContent>
        </Pagination>
    );
}

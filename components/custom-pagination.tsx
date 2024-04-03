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
    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages;

    function generateUrl(page: number | string) {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <div
                        className={cn(isPrevDisabled && "pointer-events-none")}
                    >
                        <PaginationPrevious
                            href={generateUrl(currentPage - 1)}
                            className={cn(
                                isPrevDisabled && "text-foreground/50"
                            )}
                        />
                    </div>
                </PaginationItem>
                {paginationItems.map((item, i) => (
                    <PaginationItem key={i}>
                        {item === "E" ? (
                            <PaginationEllipsis />
                        ) : (
                            <div
                                className={cn(
                                    item === currentPage &&
                                    "pointer-events-none"
                                )}
                            >
                                <PaginationLink
                                    href={generateUrl(item)}
                                    isActive={item === currentPage}
                                >
                                    {item}
                                </PaginationLink>
                            </div>
                        )}
                    </PaginationItem>
                ))}
                <div className={cn(isNextDisabled && "pointer-events-none")}>
                    <PaginationNext
                        href={generateUrl(currentPage + 1)}
                        className={cn(isNextDisabled && "text-foreground/50")}
                    />
                </div>
            </PaginationContent>
        </Pagination>
    );
}

"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import { useDebounce, useClickAway } from "react-use/lib";
import { SearchIcon } from "lucide-react";
import { Icons } from "@/components/icons";

type PostResult = {
    id: string;
    title: string;
    slug: string;
};

export const SearchBar = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostResult[]>([]);
    const [showPosts, setShowPosts] = useState<boolean>(false);

    const [inputText, setInputText] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
    const clickAwayRef = useRef(null);

    useClickAway(clickAwayRef, () => {
        setShowPosts(false);
    });

    const debounceInterval = 400;
    useDebounce(
        () => {
            setDebouncedValue(inputText);
        },
        debounceInterval,
        [inputText]
    );

    useEffect(() => {
        const search = async () => {
            if (!debouncedValue) {
                setPosts([]);
                return;
            }

            try {
                setIsLoading(true);
                const res = await fetch(
                    `/api/posts?searchTerm=${debouncedValue}`,
                    { cache: "no-store" }
                );
                const data = await res.json();
                setPosts(data);
                setShowPosts(true);
            } catch (err) {
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };
        search();
        if (debouncedValue.length === 0) {
            setShowPosts(false);
        }
    }, [debouncedValue]);

    return (
        <div className="w-[30%] relative" ref={clickAwayRef}>
            <div className="relative h-10 w-full">
                <Input
                    onClick={() => {
                        if (!showPosts && debouncedValue.length > 0) {
                            setShowPosts(true);
                        }
                    }}
                    type="text"
                    value={inputText}
                    placeholder="Search"
                    onChange={({ currentTarget }) => {
                        setInputText(currentTarget.value);
                    }}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary">
                    {isLoading ? (
                        <Icons.spin className="animate-spin size-5" />
                    ) : (
                        <SearchIcon className="size-5" />
                    )}
                </div>
            </div>
            {showPosts && (
                <div className="absolute mt-1.5 w-full border shadow-md bg-background text-foreground">
                    {posts.length > 0 && !isLoading ? (
                        posts.map((post) => (
                            <Link
                                href={`/posts/${post.slug}`}
                                key={post.id}
                                className="block py-1.5 px-4 cursor-pointer hover:bg-primary/80 transition hover:text-white"
                                onClick={() => {
                                    if (showPosts) {
                                        setDebouncedValue("");
                                        setInputText("");
                                        setShowPosts(false);
                                    }
                                }}
                            >
                                {post.title}
                            </Link>
                        ))
                    ) : (
                        <div className="min-h-24 flex items-center justify-center">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

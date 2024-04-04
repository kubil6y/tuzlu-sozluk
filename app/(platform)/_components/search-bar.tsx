"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import { useDebounce, useClickAway } from "react-use/lib";

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

    useClickAway(clickAwayRef, (e) => {
        setShowPosts(false);
    });

    const debounceInterval = 400;
    const [, cancel] = useDebounce(
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
                const res = await fetch(
                    `/api/posts?searchTerm=${debouncedValue}`,
                    { cache: "no-store" }
                );
                const data = await res.json();
                setPosts(data);
                setShowPosts(true);
            } catch (err) {
                setPosts([]);
            }
        };
        search();
    }, [debouncedValue]);

    return (
        <div className="w-[30%] relative" ref={clickAwayRef}>
            <Input
                type="text"
                value={inputText}
                placeholder="Search"
                onChange={({ currentTarget }) => {
                    setInputText(currentTarget.value);
                }}
            />
            {showPosts && (
                <div className="absolute bg-gray-500">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id}>{post.title}</div>
                        ))
                    ) : (
                        <div>no posts found</div>
                    )}
                </div>
            )}
        </div>
    );
};

/*
 <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {/* Use map to loop over the dynamic list */}
          {fruits.map((fruit) => (
            // Make sure to set a unique key for each SelectItem
            <SelectItem key={fruit.id} value={fruit.id}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
*/

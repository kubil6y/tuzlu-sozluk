"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "react-use/lib";

type PostResult = {
    id: string;
    title: string;
    slug: string;
}[];

export const SearchBar = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostResult[]>([]);
    const [input, setInput] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    const debounceInterval = 400;
    const [, cancel] = useDebounce(
        () => {
            setDebouncedValue(input);
        },
        debounceInterval,
        [input]
    );

    useEffect(() => {
        const search = async () => {
            if (!debouncedValue) {
                setPosts([]);
                return;
            }
            const results = await fetch(
                `/api/posts?searchTerm=${debouncedValue}`,
                { cache: "no-store" }
            ).then((res) => res.json());
            setPosts(results);
        };
        search();
    }, [debouncedValue]);

    return (
        <div>
            <input
                type="text"
                value={input}
                placeholder="Debounced input"
                onChange={({ currentTarget }) => {
                    setInput(currentTarget.value);
                }}
            />
            <div>
                Debounced value: {debouncedValue}
                <button onClick={cancel}>Cancel debounce</button>
            </div>
        </div>
    );
};

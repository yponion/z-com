
import type { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getSearchResult: QueryFunction<Post[], [_1: string, _2: string, SearchParams: { q: string, f?: string, pf?: string }]>
    = async ({ queryKey }) => {
        const [, , searchParams] = queryKey;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${searchParams.q}?${searchParams.toString()}`,
            {
                next: {
                    tags: ["posts", "search", searchParams.q],
                },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    }

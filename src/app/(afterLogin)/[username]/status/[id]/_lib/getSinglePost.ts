import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/query-core";

export const getSinglePost: QueryFunction<
    Post,
    [_1: string, _2: string]
>
    = async ({ queryKey }) => {
        const [_1, id] = queryKey;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
            {
                next: {
                    tags: ["posts", id],
                },
                cache: "force-cache",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    }

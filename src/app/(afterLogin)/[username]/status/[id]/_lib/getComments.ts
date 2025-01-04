import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/query-core";

export const getComments: QueryFunction<
    Post[],
    [_1: string, _2: string, _3: string]
>
    = async ({ queryKey }) => {
        const [, id] = queryKey;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}/comments`,
            {
                next: {
                    tags: ["posts", id, "comments"],
                },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    }

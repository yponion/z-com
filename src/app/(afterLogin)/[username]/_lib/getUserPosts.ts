import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/query-core";

export const getUserPosts: QueryFunction<
    Post[],
    [_1: string, _2: string, _3: string]
>
    = async ({ queryKey }) => {
        const [, , username] = queryKey;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}/posts?cursor=0`,
            {
                next: {
                    tags: ["posts", "users", username],
                },
                credentials: 'include',
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    }

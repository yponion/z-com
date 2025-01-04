import { User } from "@/model/User";
import { QueryFunction } from "@tanstack/query-core";

export const getUser: QueryFunction<
    User,
    [_1: string, _2: string]
>
    = async ({ queryKey }) => {
        const [, username] = queryKey;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
            {
                next: {
                    tags: ["users", username],
                },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    }

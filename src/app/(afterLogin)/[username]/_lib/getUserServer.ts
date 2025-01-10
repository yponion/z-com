import { User } from "@/model/User";
import { QueryFunction } from "@tanstack/query-core";
import { cookies } from "next/headers";

export const getUserServer: QueryFunction<
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
                credentials: 'include',
                headers: { Cookie: (await cookies()).toString() }, // await 자동 완성 되길래 확인해보니 Next.js 15부터는 비동기 함수로 변경되었다고 해서 await 넣어줌
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    }

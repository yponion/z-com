export async function getRecommendFollow() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/recommend-follows`,
        {
            next: {
                tags: ["users", "recommend"],
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}
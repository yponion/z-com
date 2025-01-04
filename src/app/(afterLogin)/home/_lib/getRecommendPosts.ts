type Props = { pageParam?: number; }

export async function getRecommendPosts({ pageParam }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recommend-posts?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "recommend"],
        // revalidate: 60,
      },
      cache: "force-cache",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}
export async function getRecommendPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recommend-posts`,
    {
      next: {
        tags: ["posts", "recommends"],
        // revalidate: 60,
      },
      // cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getFollowingPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/following-posts`,
    {
      next: {
        tags: ["posts", "following"],
      },
      cache: "force-cache",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

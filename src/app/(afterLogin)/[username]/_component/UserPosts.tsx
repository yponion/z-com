"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import { getUserPosts } from "../_lib/getUserPosts";

type Props = { username: string };

export default function UserPosts({ username }: Props) {
  const { data } = useQuery<
    IPost[],
    Error,
    IPost[],
    [_1: string, _2: string, string]
  >({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
    staleTime: 60 * 1000,
    gcTime: 300000,
  });
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users", username]);
  if (user) return data?.map((post) => <Post key={post.postId} post={post} />);
  return null;
}

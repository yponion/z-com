"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecommendPosts } from "../_lib/getRecommendPosts";
import Post from "../../_component/Post";
import type { Post as IPost } from "@/model/Post";

export default function RecommendPosts() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getRecommendPosts,
    staleTime: 60 * 1000, // fresh -> stale, default: 0ms
    gcTime: 300000, // inactive 일 때 메모리 정리, default: 300000ms
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
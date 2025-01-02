"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import type { Post as IPost } from "@/model/Post";
import { getSearchResult } from "../_lib/getSearchResult";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export default function SearchResult({ searchParams }: Props) {
  const { data } = useQuery<
    IPost[],
    Error,
    IPost[],
    [_1: string, _2: string, Props["searchParams"]]
  >({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 60 * 1000, // fresh -> stale, default: 0ms
    gcTime: 300000, // inactive 일 때 메모리 정리, default: 300000ms
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}

"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getRecommendPosts } from "../_lib/getRecommendPosts";
import Post from "../../_component/Post";
import type { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function RecommendPosts() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    Error,
    InfiniteData<IPost[]>,
    [_1: string, _2: string], // queryKey
    number // initialPageParam의 type 자리
  >({
    queryKey: ["posts", "recommend"],
    queryFn: getRecommendPosts,
    initialPageParam: 0, // [[1, 2, 3, 4, 5], [6, 7, 8, 9,], ...]
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000, // fresh -> stale, default: 0ms
    gcTime: 300000, // inactive 일 때 메모리 정리, default: 300000ms
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) fetchNextPage();
  }, [inView]);

  return data?.pages.map((page, i) => (
    <>
      <Fragment key={i}>
        {page.map((post) => (
          <Post key={post.postId} post={post} />
        ))}
      </Fragment>
      <div ref={ref} style={{ height: 50 }}></div>
    </>
  ));
}

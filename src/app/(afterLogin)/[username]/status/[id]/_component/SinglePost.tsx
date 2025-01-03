"use client";

import { useQuery } from "@tanstack/react-query";
import type { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import { getSinglePost } from "../_lib/getSinglePost";

type Props = { id: string; noImage?: boolean };

export default function SinglePost({ id, noImage }: Props) {
  const { data: post, error } = useQuery<
    IPost,
    Error,
    IPost,
    [_1: string, _2: string]
  >({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300000,
  });
  if (error)
    return (
      <div
        style={{
          height: 100,
          alignItems: "center",
          fontSize: 31,
          fontWeight: "bold",
          justifyContent: "center",
          display: "flex",
        }}
      >
        게시글을 찾을 수 없습니다.
      </div>
    );
  if (!post) return null; // 로딩 중
  return <Post key={post.postId} post={post} noImage={noImage} />;
}

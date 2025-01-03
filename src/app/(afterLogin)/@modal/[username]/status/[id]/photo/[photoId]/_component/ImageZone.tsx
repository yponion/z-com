"use client";

import { useQuery } from "@tanstack/react-query";
import style from "../photoModal.module.css";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import type { Post as IPost } from "@/model/Post";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";

type Props = { id: string };

export default function ImageZone({ id }: Props) {
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
  if (!post?.Images[0]) return null;
  return (
    <div className={style.imageZone}>
      <img src={post.Images[0].link} alt={post.content} />
      <div
        className={style.image}
        style={{ backgroundImage: `url(${post.Images[0].link})` }}
      />
      <div className={style.buttonZone}>
        <div className={style.buttonInner}>
          <ActionButtons white />
        </div>
      </div>
    </div>
  );
}

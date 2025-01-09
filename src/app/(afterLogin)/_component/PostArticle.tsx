"use client";

import { useRouter } from "next/navigation";
import style from "./post.module.css";
import { ReactNode } from "react";
import type { PostImage } from "@/model/PostImage";

type Props = {
  children: ReactNode;
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: PostImage[];
  };
};

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };
  return (
    <article onClick={onClick} className={style.post}>
      {children}
    </article>
  );
}

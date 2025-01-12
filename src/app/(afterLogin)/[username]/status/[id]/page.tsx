import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./singlePost.module.css";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import SinglePost from "./_component/SinglePost";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSinglePost } from "./_lib/getSinglePost";
import { getComments } from "./_lib/getComments";
import Comments from "./_component/Comments";

import { Post } from "@/model/Post";
import { getUserServer } from "../../_lib/getUserServer";
import { User } from "@/model/User";
import { getSinglePostServer } from "./_lib/getSinglePostServer";

type Props = {
  params: Promise<{ id: string; username: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { username, id } = await params;
  const [user, post]: [User, Post] = await Promise.all([
    getUserServer({ queryKey: ["users", username] }),
    getSinglePostServer({ queryKey: ["posts", id] }),
  ]);
  return {
    metadataBase: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    title: `Z에서 ${user.nickname} 님 : ${post.content}`,
    description: post.content,
    openGraph: {
      title: `Z에서 ${user.nickname} 님 : ${post.content}`,
      description: post.content,
      images:
        post.Images?.length > 0
          ? post.Images?.map((v) => ({
              url: v.link,
              width: 600,
              height: 400,
              alt: "게시글 이미지",
            }))
          : [
              {
                url: user.image,
                width: 400,
                height: 400,
                alt: `${user.nickname} 프로필 이미지`,
              },
            ],
    },
  };
}

export default async function Page(props: Props) {
  const { id } = await props.params;
  // 서버에서 react query 데이터 먼저 불러오게
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}

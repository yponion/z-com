import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import style from "./photoModal.module.css";
import PhotoModalCloseButton from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/PhotoModalCloseButton";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import ImageZone from "./_component/ImageZone";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PhotoModal(props: Props) {
  const { id } = await props.params;
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
    <div className={style.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone id={id} />
        <div className={style.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm id={id} />
          <div>
            <Comments id={id} />
          </div>
        </div>
      </HydrationBoundary>
    </div>
  );
}

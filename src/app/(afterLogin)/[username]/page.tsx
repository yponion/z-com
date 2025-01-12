import style from "./profile.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserPosts } from "./_lib/getUserPosts";
import UserPosts from "./_component/UserPosts";
import UserInfo from "./_component/UserInfo";
import { getUserServer } from "./_lib/getUserServer";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { User } from "@/model/User";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  const user: User = await getUserServer({ queryKey: ["users", username] });
  return {
    metadataBase: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    title: `${user.nickname} (${user.id}) / Z`,
    description: `${user.nickname} (${user.id}) 프로필`,
    openGraph: {
      title: `${user.nickname} (${user.id}) / Z`,
      description: `${user.nickname} (${user.id}) 프로필`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${user.id}`,
      images: [
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

export default async function Profile(props: Props) {
  const { username } = await props.params;
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUserServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session as Session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}

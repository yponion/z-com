import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.css";
import { getRecommendPosts } from "./_lib/getRecommendPosts";
import TabDecider from "./_component/TabDecider";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommend"],
    queryFn: getRecommendPosts,
    initialPageParam: 0,
    staleTime: 60 * 1000, // 데이터 재요청 방지
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}

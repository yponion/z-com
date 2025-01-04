import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.css";
import { Suspense } from "react";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import Loading from "./loading";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  // throw "으하하하"; // 서버 컴포넌트 에러 발생 테스트
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}

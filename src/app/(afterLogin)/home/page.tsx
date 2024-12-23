import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.css";

export default function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        {/* <PotstForm />
        <Post />
        <Post />
        <Post /> */}
      </TabProvider>
    </main>
  );
}

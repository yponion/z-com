import style from "./chatRoom.module.css";
import MessageForm from "./_component/MessageForm";
import { auth } from "@/auth";
import { getUserServer } from "@/app/(afterLogin)/[username]/_lib/getUserServer";
import { QueryClient } from "@tanstack/react-query";
import UserInfo from "./_component/UserInfo";
import WebSocketComponent from "./_component/WebSocketComponent";
import MessageList from "./_component/MessageList";

type Props = {
  params: { room: string };
};

export default async function ChatRoom({ params }: Props) {
  const session = await auth();
  const ids = params.room.split("-").filter((v) => v !== session?.user?.email);
  if (!ids[0]) return null;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", ids[0]],
    queryFn: getUserServer,
  });

  return (
    <main className={style.main}>
      <WebSocketComponent />
      <UserInfo id={ids[0]} />
      <MessageList id={ids[0]} />
      <MessageForm id={ids[0]} />
    </main>
  );
}

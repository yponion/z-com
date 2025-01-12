import style from "./chatRoom.module.css";
import cx from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import MessageForm from "./_component/MessageForm";
import { auth } from "@/auth";
import { getUserServer } from "@/app/(afterLogin)/[username]/_lib/getUserServer";
import { QueryClient } from "@tanstack/react-query";
import UserInfo from "./_component/UserInfo";
import WebSocketComponent from "./_component/WebSocketComponent";

dayjs.locale("ko");
dayjs.extend(relativeTime);

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

  const messages = [
    {
      messageId: 1,
      roomId: 123,
      id: "yp071704",
      content: "안녕하세요",
      createdAt: new Date(),
    },
    {
      messageId: 2,
      roomId: 123,
      id: "hero",
      content: "안녕히가세요",
      createdAt: new Date(),
    },
  ];

  return (
    <main className={style.main}>
      <WebSocketComponent />
      <UserInfo id={ids[0]} />
      <div className={style.list}>
        {messages.map((m) => {
          if (m.id === "yp071704") {
            // 내 메세지면
            return (
              <div
                key={m.messageId}
                className={cx(style.message, style.myMessage)}
              >
                <div className={style.content}>{m.content}</div>
                <div className={style.date}>
                  {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
                </div>
              </div>
            );
          }
          return (
            <div
              key={m.messageId}
              className={cx(style.message, style.yourMessage)}
            >
              <div className={style.content}>{m.content}</div>
              <div className={style.date}>
                {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
              </div>
            </div>
          );
        })}
      </div>
      <MessageForm id={ids[0]} />
    </main>
  );
}

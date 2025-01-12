"use client";

import style from "../message.module.css";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import type { Room } from "@/model/Room";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  room: Room;
};

export default function Room({ room }: Props) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/messages/${room.room}`);
  };

  return (
    <div className={style.room} onClickCapture={onClick}>
      <div className={style.roomUserImage}>
        <img src={room.Receiver.image} alt="userImg" />
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{room.Receiver.nickname}</b>
          &nbsp;
          <span>@{room.Receiver.id}</span> · &nbsp;
          <span className={style.postDate}>
            {dayjs(room.createdAt).fromNow()}
          </span>
        </div>
        <div className={style.roomLastChat}>{room.content}</div>
      </div>
    </div>
  );
}

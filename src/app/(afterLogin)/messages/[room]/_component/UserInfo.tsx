"use client";

import style from "../chatRoom.module.css";
import Link from "next/link";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/app/(afterLogin)/[username]/_lib/getUser";

// 객체 type 써도 되고, interface 써도  됨
interface Props {
  id: string;
}

export default function UserInfo({ id }: Props) {
  const { data: user } = useQuery({
    queryKey: ["users", id],
    queryFn: getUser,
  });
  if (!user) return null;
  return (
    <>
      <div className={style.header}>
        <BackButton />
        <div>
          <h2>{user.nickname}</h2>
        </div>
      </div>
      <Link href={"/" + user.id} className={style.userInfo}>
        <img src={user.image} alt={user.id} />
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>@{user.id}</div>
      </Link>
    </>
  );
}

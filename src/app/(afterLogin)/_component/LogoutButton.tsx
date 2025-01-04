"use client";

import { Session } from "next-auth"; // 기존 useSession에서 SSR에선 안되니까 Props로 내려 받아서 사용하게 변경
// import { Session } from "@auth/core/types"; // 이것도 됨
import style from "./logoutButton.module.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = { me: Session | null };

export default function LogoutButton({ me }: Props) {
  const router = useRouter();

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };
  if (!me?.user) return null;
  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}

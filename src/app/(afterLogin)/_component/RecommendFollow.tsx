"use client";

import type { User } from "@/model/User";
import style from "./recommendFollow.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import cx from "classnames";

type Props = {
  user: User;
};

export default function RecommendFollow({ user }: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const followed = !!user.Followers?.find(
    (v) => v.userId === session?.user?.email
  );
  const follow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          method: "post",
          credentials: "include",
        }
      );
    },
    onMutate: (userId: string) => {
      // users가 늘어나면 queryCache 에서 찾아서 해줘야함
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "recommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: [{ userId: session?.user?.email as string }],
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["users", "recommends"], shallow);
      }
    },
    onError: () => {},
  });
  const unFollow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          method: "delete",
          credentials: "include",
        }
      );
    },
    onMutate: (userId: string) => {
      // users가 늘어나면 queryCache 에서 찾아서 해줘야함
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "recommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: shallow[index].Followers.filter(
            (v) => v.userId !== session?.user?.email
          ),
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers - 1,
          },
        };
        queryClient.setQueryData(["users", "recommends"], shallow);
      }
    },
    onError: () => {},
  });
  const onFollow = () => {
    if (followed) unFollow.mutate(user.id);
    else follow.mutate(user.id);
  };

  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div
        className={cx(style.followButtonSection, followed && style.followed)}
      >
        <button onClick={onFollow}>{followed ? "팔로잉" : "팔로우"}</button>
      </div>
    </div>
  );
}

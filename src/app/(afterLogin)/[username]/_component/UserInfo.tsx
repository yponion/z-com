"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import style from "../profile.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import { getUser } from "../_lib/getUser";
import { User } from "@/model/User";
import { useSession } from "next-auth/react";
import cx from "classnames";
import { MouseEventHandler } from "react";

type Props = { username: string };

export default function UserInfo({ username }: Props) {
  const { data: user, error } = useQuery<
    User,
    Error,
    User,
    [_1: string, _2: string]
  >({
    queryKey: ["users", username],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 300000,
  });
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const followFn = (userId: string) => {
    // users가 늘어나면 queryCache 에서 찾아서 해줘야함
    const value: User[] | undefined = queryClient.getQueryData([
      "users",
      "recommends",
    ]);
    if (value) {
      const index = value.findIndex((v) => v.id === userId);
      if (index > -1) {
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["users", "recommends"], shallow);
      }
    }

    const value2: User | undefined = queryClient.getQueryData([
      "users",
      userId,
    ]);
    if (value2) {
      const shallow = {
        ...value2,
        Followers: [{ id: session?.user?.email as string }],
        _count: {
          ...value2._count,
          Followers: value2._count?.Followers + 1,
        },
      };
      queryClient.setQueryData(["users", userId], shallow);
    }
  };
  const unFollowFn = (userId: string) => {
    // users가 늘어나면 queryCache 에서 찾아서 해줘야함
    const value: User[] | undefined = queryClient.getQueryData([
      "users",
      "recommends",
    ]);
    if (value) {
      const index = value.findIndex((v) => v.id === userId);
      if (index > -1) {
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: shallow[index].Followers.filter(
            (v) => v.id !== session?.user?.email
          ),
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers - 1,
          },
        };
        queryClient.setQueryData(["users", "recommends"], shallow);
      }
    }

    const value2: User | undefined = queryClient.getQueryData([
      "users",
      userId,
    ]);
    if (value2) {
      const shallow = {
        ...value2,
        Followers: value2.Followers.filter(
          (v) => v.id !== session?.user?.email
        ),
        _count: {
          ...value2._count,
          Followers: value2._count?.Followers - 1,
        },
      };
      queryClient.setQueryData(["users", userId], shallow);
    }
  };

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
      followFn(userId);
    },
    onError: (error: Error, userId: string) => {
      unFollowFn(userId);
    },
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
      unFollowFn(userId);
    },
    onError: (error: Error, userId: string) => {
      followFn(userId);
    },
  });
  if (error)
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>

        <div
          style={{
            height: 100,
            alignItems: "center",
            fontSize: 31,
            fontWeight: "bold",
            justifyContent: "center",
            display: "flex",
          }}
        >
          계정이 존재하지 않음
        </div>
      </>
    );
  if (!user) return null;
  const followed = !!user.Followers?.find((v) => v.id === session?.user?.email);
  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (followed) unFollow.mutate(user.id);
    else follow.mutate(user.id);
  };
  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userRow}>
          <div className={style.userImage}>
            <img src={user.image} alt={user.id} />
          </div>
          <div className={style.userName}>
            <div>{user.nickname}</div>
            <div>@{user.id}</div>
          </div>
          {user.id !== session?.user?.email && (
            <button
              onClick={onFollow}
              className={cx(style.followButton, followed && style.followed)}
            >
              {followed ? "팔로잉" : "팔로우"}
            </button>
          )}
        </div>
        &nbsp;
        <div className={style.userFollower}>
          <div>{user._count.Followers} 팔로워</div>
          <div>{user._count.Followings} 팔로우 중</div>
        </div>
      </div>
    </>
  );
}

"use client";

// import { useContext } from "react";
import { TabContext } from "./TabProvider";
import RecommendPosts from "./RecommendPosts";
import FollowingPosts from "./FollowingPosts";
import { use } from "react";

export default function TabDecider() {
  // const { tab } = useContext(TabContext);
  const { tab } = use(TabContext); // react 18 부터 생김, if문 안에 넣을 수도 있음

  if (tab === "rec") return <RecommendPosts />;
  return <FollowingPosts />;
}

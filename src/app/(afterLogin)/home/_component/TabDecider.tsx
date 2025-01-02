"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import RecommendPosts from "./RecommendPosts";
import FollowingPosts from "./FollowingPosts";

export default function TabDecider() {
  const { tab } = useContext(TabContext);

  if (tab === "rec") return <RecommendPosts />;
  return <FollowingPosts />;
}

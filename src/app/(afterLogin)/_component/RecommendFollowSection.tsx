"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecommendFollow } from "../_lib/getRecommendFollow";
import type { User } from "@/model/User";
import RecommendFollow from "./RecommendFollow";

export default function RecommendFollowSection() {
  const { data } = useQuery<User[]>({
    queryKey: ["users", "recommends"],
    queryFn: getRecommendFollow,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((user) => <RecommendFollow key={user.id} user={user} />);
}

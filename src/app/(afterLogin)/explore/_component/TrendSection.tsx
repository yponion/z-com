"use client";

import Trend from "@/app/(afterLogin)/_component/Trend";
import { getTrends } from "../../_lib/getTrends";
import type { Hashtag } from "@/model/Hashtag";
import { useQuery } from "@tanstack/react-query";

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300000,
  });
  return data?.map((trend) => <Trend key={trend.title} trend={trend} />);
}

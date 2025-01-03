"use client";

import style from "./trendSection.module.css";
import Trend from "./Trend";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import type { Hashtag } from "@/model/Hashtag";
import { getTrends } from "../_lib/getTrends";

export default function TrendSection() {
  const { data: session } = useSession();
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300000,
    enabled: !!session?.user,
  });

  const pathname = usePathname();
  if (pathname === "/explore") return null;
  if (session?.user)
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>무슨 일이 일어나고 있나요?</h3>
          {data?.map((trend) => (
            <Trend key={trend.tagId} trend={trend} />
          ))}
        </div>
      </div>
    );
  return (
    <div className={style.trendBg}>
      <div className={style.noTrend}>트렌드를 가져올 수 없습니다.</div>
    </div>
  );
}

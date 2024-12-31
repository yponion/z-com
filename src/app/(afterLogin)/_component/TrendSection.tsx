"use client";

import style from "./trendSection.module.css";
import Trend from "./Trend";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TrendSection() {
  const pathname = usePathname();
  const { data } = useSession();
  if (pathname === "/explore") return null;
  if (data?.user)
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>무슨 일이 일어나고 있나요?</h3>
          <Trend />
          <Trend />
          <Trend />
        </div>
      </div>
    );
  return (
    <div className={style.trendBg}>
      <div className={style.noTrend}>트렌드를 가져올 수 없습니다.</div>
    </div>
  );
}

import Link from "next/link";
import style from "./trend.module.css";
import { Hashtag } from "@/model/Hashtag";

type Props = {
  trend: Hashtag;
};

export default function Trend({ trend }: Props) {
  return (
    <Link href={`/search?q=${trend.title}`} className={style.container}>
      <div className={style.count}>대한민국에서 트렌드 중</div>
      <div className={style.title}>{trend.title}</div>
      <div className={style.count}>게시물 {trend.count.toLocaleString()}개</div>
    </Link>
  );
}

import Link from "next/link";
import style from "./trend.module.css";

export default function Trend() {
  return (
    <Link href={`/search?q=트렌드`} className={style.container}>
      <div className={style.count}>대한민국에서 트렌드 중</div>
      <div className={style.title}>삐용삐용</div>
      <div className={style.count}>게시물 1,234개</div>
    </Link>
  );
}

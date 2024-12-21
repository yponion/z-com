import style from "./trendSection.module.css";
import Trend from "./Trend";

export default function TrendSection() {
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
}

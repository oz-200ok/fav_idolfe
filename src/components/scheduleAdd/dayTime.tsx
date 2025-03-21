export default function DayTimeUI() {
  return (
    <div className="div_setDay">
      <DayTime type="시작" />
      <p>~</p>
      <DayTime type="종료" />
    </div>
  );
}

export function DayTime({ type }: { type: string }) {
  return (
    <div className="div_day">
      <p>{type}시간</p>
      <button>00:00</button>
      <button className="button_icon"></button>
    </div>
  );
}

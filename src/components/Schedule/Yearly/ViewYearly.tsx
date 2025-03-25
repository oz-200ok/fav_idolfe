import Calendar from 'react-calendar';

type T_ViewYearly = {
  value: any;
  onChange: any;
};
export default function ViewYearly(props: T_ViewYearly) {
  return (
    <Calendar
      view="month"
      locale="ko"
      nextLabel={null}
      prevLabel={null}
      next2Label={null}
      prev2Label={null}
      onChange={props.onChange}
      value={props.value}
      calendarType="gregory"
      formatMonthYear={(locale, date) => `${date.getMonth()+1}`} // Month는 0부터 시작
      formatDay={(locale, date) =>
        date.toLocaleString('en', { day: 'numeric' })
      }
    />
  );
}

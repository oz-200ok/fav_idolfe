import { Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/src/shared/types.js';

type T_ViewYearly = {
  value: Value | Date;
  onChange: Dispatch<SetStateAction<Value>>;
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
      formatMonthYear={(locale, date) => {
        console.log(locale);
        return `${date.getMonth() + 1}`;
      }} // Month는 0부터 시작
      formatDay={(locale, date) => {
        console.log(locale);
        return date.toLocaleString('en', { day: 'numeric' });
      }}
    />
  );
}

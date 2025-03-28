import Calendar from 'react-calendar';
import { T_YearlyProps } from '.';

export default function ViewYearly(props: T_YearlyProps) {
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
      formatMonthYear={(_, date) => {
        return `${date.getMonth() + 1}`;
      }} // Month는 0부터 시작
      formatDay={(_, date) => {
        return date.toLocaleString('en', { day: 'numeric' });
      }}
      onClickDay={(value) => {
        console.log('연간에서 해당 값으로 변경됨', value);
        props.onChange(value);
        console.log('현재 적용된 값=', props.value);
        props.setScheduleType('월');
      }}
    />
  );
}

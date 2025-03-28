import Calendar from 'react-calendar';
import { T_use_Date, T_use_ScheduleType } from '../type';

type T_ViewYearly_Props = T_use_Date & T_use_ScheduleType;

export default function ViewYearly(props: T_ViewYearly_Props) {
  return (
    <Calendar
      view="month"
      locale="ko"
      nextLabel={null}
      prevLabel={null}
      next2Label={null}
      prev2Label={null}
      onChange={props.setDate}
      value={props.date}
      calendarType="gregory"
      formatMonthYear={(_, date) => {
        return `${date.getMonth() + 1}`;
      }} // Month는 0부터 시작
      formatDay={(_, date) => {
        return date.toLocaleString('en', { day: 'numeric' });
      }}
      onClickDay={(value) => {
        if (!props.setScheduleType) return;
        props.setDate(value);
        props.setScheduleType('월');
      }}
    />
  );
}

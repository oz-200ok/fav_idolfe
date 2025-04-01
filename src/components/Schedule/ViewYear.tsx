import Calendar from 'react-calendar';
import { Action, Value } from 'react-calendar/src/shared/types.js';
import { T_use_Date, T_use_ScheduleType } from './type';

type T_YearChangeHandle = {
  action: Action;
  value: Date | Value | null;
};

type T_ViewYear_Props = T_use_Date & T_use_ScheduleType;

export default function ViewYear(props: T_ViewYear_Props) {
  function yearChangeHandle({ action, value }: T_YearChangeHandle) {
    if (!value || !props.setDate) return;
    if (value instanceof Date) {
      const numChangeYear = Number(value.getFullYear());
      const numChangeMonth = Number(value.getMonth());
      if (action === 'next')
        return props.setDate(new Date(numChangeYear, numChangeMonth + 1));
      else if (action === 'next2')
        return props.setDate(new Date(numChangeYear + 1, 1));
      else if (action === 'prev')
        return props.setDate(new Date(numChangeYear, numChangeMonth - 1));
      else if (action === 'prev2')
        return props.setDate(new Date(numChangeYear - 1, 1));
    }
  }

  return (
    <Calendar
      view="month"
      locale="ko"
      className="calendar_yearlyHearder"
      value={props.date}
      onChange={() => props.setDate}
      nextLabel={
        props.scheduleType === '연' || props.scheduleType === '일정'
          ? null
          : '>'
      }
      prevLabel={
        props.scheduleType === '연' || props.scheduleType === '일정'
          ? null
          : '<'
      }
      next2Label={props.scheduleType === '일정' ? null : '>>'}
      prev2Label={props.scheduleType === '일정' ? null : '<<'}
      formatMonthYear={(_, date) => {
        if (props.scheduleType === '연') return `${date.getFullYear()}년`;
        else if (props.scheduleType === '일정') {
          return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${props.date?.getDate()}일`;
        } else return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
      }}
      onActiveStartDateChange={({ action, value }) =>
        yearChangeHandle({ action, value })
      }
    />
  );
}

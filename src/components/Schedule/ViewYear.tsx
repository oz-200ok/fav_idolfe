import Calendar from 'react-calendar';
import { T_Schedule, T_Value } from '.';
import { Action, Value } from 'react-calendar/src/shared/types.js';

type T_YearChangeHandle = {
  action: Action;
  value: Date | Value | null;
};

interface I_ViewYear extends T_Value<Date> {
  scheduleType: T_Schedule;
}

export default function ViewYear(props: I_ViewYear) {
  function yearChangeHandle({ action, value }: T_YearChangeHandle) {
    if (!value) return;
    if (value instanceof Date) {
      const numChangeYear = Number(value.getFullYear());
      const numChangeMonth = Number(value.getMonth());
      if (action === 'next')
        return props.onChange(new Date(numChangeYear, numChangeMonth + 1));
      else if (action === 'next2')
        return props.onChange(new Date(numChangeYear + 1, 1));
      else if (action === 'prev')
        return props.onChange(new Date(numChangeYear, numChangeMonth - 1));
      else if (action === 'prev2')
        return props.onChange(new Date(numChangeYear - 1, 1));
    }
    window.scrollTo(0, 0);
  }

  return (
    <Calendar
      view="month"
      locale="ko"
      className="calendar_yearlyHearder"
      value={props.value}
      nextLabel={props.scheduleType === '연' ? null : '>'}
      prevLabel={props.scheduleType === '연' ? null : '<'}
      next2Label=">>"
      prev2Label="<<"
      formatMonthYear={(_, date) => {
        if (props.scheduleType === '연') return `${date.getFullYear()}년`;
        else return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
      }}
      onActiveStartDateChange={({ action, value }) =>
        yearChangeHandle({ action, value })
      }
    />
  );
}

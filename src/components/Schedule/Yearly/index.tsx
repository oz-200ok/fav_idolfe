import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './yearly.scss';
import ViewYearly from './ViewYearly';
import { Action, Value } from 'react-calendar/src/shared/types.js';

export default function Schedule() {
  const [valueData, onChange] = useState<Value | Date>(new Date());
  const emptyArray = new Array(12).fill('');

  type T_YearChangeHandle = {
    action: Action;
    value: Date | Value | null;
  };

  function yearChangeHandle({ action, value }: T_YearChangeHandle) {
    if (!value) return;
    if (value instanceof Date) {
      const numChangeYear = Number(value.getFullYear());
      if (action === 'next2') return onChange(new Date(numChangeYear + 1, 1));
      else if (action === 'prev2')
        return onChange(new Date(numChangeYear - 1, 1));
    }
  }

  return (
    <div className="div_yearly">
      <Calendar
        view="month"
        locale="ko"
        className="calendar_yearlyHearder"
        nextLabel={null}
        prevLabel={null}
        value={valueData}
        formatMonthYear={(locale, date) => {
          console.log(locale);
          return `${date.getFullYear()}년`;
        }}
        onActiveStartDateChange={({ action, value }) =>
          yearChangeHandle({ action, value })
        }
      />

      <div className="div_schedule">
        {emptyArray.map((item, index) => {
          console.log(item);
          if (!valueData) return;
          if (valueData instanceof Date) {
            const date = new Date(valueData.getFullYear(), index, 1);
            return <ViewYearly key={index} value={date} onChange={onChange} />;
          }
        })}
      </div>
    </div>
  );
}

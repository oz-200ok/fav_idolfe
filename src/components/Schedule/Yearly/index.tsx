import { useEffect, useState } from 'react';
import Calendar, { OnArgs } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './yearly.scss';
import ViewYearly from './ViewYearly';

export default function Schedule() {
  const [value, onChange] = useState(new Date());
  const emptyArray = new Array(12).fill('');

  function yearChangeHandle({ action, value }: OnArgs) {
    if (!value) return;
    switch (action) {
      case 'next2':
        onChange(new Date(Number(value.getFullYear() + 1), 1, 1));
        break;
      case 'prev2':
        onChange(new Date(Number(value.getFullYear() - 1), 1, 1));
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
        value={value}
        formatMonthYear={(locale, date) => `${date.getFullYear()}년`}
        onActiveStartDateChange={({ action, value }) =>
          yearChangeHandle({ action, value })
        }
      />

      <div className="div_schedule">
        {emptyArray.map((item, index) => {
          const date = new Date(value.getFullYear(), index, 1);
          return <ViewYearly key={index} value={date} onChange={onChange} />;
        })}
      </div>
    </div>
  );
}

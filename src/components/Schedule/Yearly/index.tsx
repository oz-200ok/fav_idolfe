import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './yearly.scss';
import ViewYearly from './ViewYearly';
import { formatDate } from 'react-calendar/dist/cjs/shared/dateFormatter';

export default function Schedule() {
  const [value, onChange] = useState(new Date());
  const emptyArray = new Array(12).fill("");

  useEffect(() => {
    console.log('value 변경됨', value);
  }, [value]);
  function yearChangeHandle() {
    onChange();
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
        onActiveStartDateChange={() => console.log('test')}
      />

      <div className="div_schedule">
        {emptyArray.map((item, index) => {
          return <ViewYearly key={index} value={value} onChange={onChange} />;
        })}
      </div>
    </div>
  );
}

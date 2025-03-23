import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import "./yearly.scss"
import * as moment from 'moment';

export default function Schedule() {
  const [value, onChange] = useState(new Date());
  const emptyArray = new Array(12).fill('123');

  return (
    <>
      {console.log(emptyArray)}
      {emptyArray.map((item, index) => {
        return (
          <Calendar
            locale="ko"
            className={'dtr'}
            onChange={onChange}
            value={value}
            calendarType="gregory"
            onClickDay={() => {
              console.log(123);
            }}
            key={index}
            formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
          />
        );
      })}
    </>
  );
}

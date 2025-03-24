import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './yearly.scss';

export default function Schedule() {
  const [value, onChange] = useState(new Date());
  const emptyArray = new Array(12).fill('123');

  return (
    <div className='div_schedule'>
      {console.log(value)}
      {emptyArray.map((item, index) => {
        return (
          <Calendar
            view="month" // month, year, decade, century
            // showNavigation={false}
            // showNeighboringMonth={false}
            nextLabel={null}
            prevLabel={null}
            next2Label={null}
            prev2Label={null}
            locale="ko"
            onChange={onChange}
            value={value}
            calendarType="gregory"
            onClickDay={() => {
              console.log(123);
            }}
            key={index}
            formatDay={(locale, date) =>
              date.toLocaleString('en', { day: 'numeric' })
            }
          />
        );
      })}
    </div>
  );
}

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import { Value } from 'react-calendar/src/shared/types.js';

export default function Schedule() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar
        next2Label={null}
        prev2Label={null}
        locale="ko"
        onChange={onChange}
        value={value}
        calendarType="gregory"
        onClickDay={() => {
          console.log(123);
        }}
      />
    </div>
  );
}

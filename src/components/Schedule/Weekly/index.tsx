import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './weekly.scss';

export default function Schedule() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        locale="ko"
        next2Label={null}
        prev2Label={null}
        onChange={onChange}
        className="calendar_pos"
        value={value}
        calendarType="gregory"
        onClickDay={() => {
          console.log(123);
        }}
      />
    </div>
  );
}

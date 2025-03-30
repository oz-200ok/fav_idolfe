import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './weekly.scss';

import { T_use_Date } from '../type';

export default function Weekly(props: T_use_Date) {
  if (!props.setDate) return;
  return (
    <div>
      <Calendar
        locale="ko"
        next2Label={null}
        prev2Label={null}
        onChange={() => props.setDate}
        className="calendar_weekly"
        value={props.date}
        showNeighboringMonth={false}
        calendarType="gregory"
        tileContent={({ date }) => {
          const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
          const dayOfWeek = date.getDay(); // 0 - 6 (일 - 토)
          return (
            <>
              <div>{daysOfWeek[dayOfWeek]}요일</div>
              <hr className="hr_hrBar" />
              <ul>
                <div> </div>
                <div> </div>
                <div> </div>
              </ul>
            </>
          );
        }}
      />
    </div>
  );
}

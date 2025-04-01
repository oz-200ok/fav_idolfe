import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './munsley.scss';
import { T_use_Date, T_use_Modal, T_use_ScheduleType } from '../type';

type T_Munsley_Props = T_use_Date & T_use_Modal & T_use_ScheduleType;

export default function Munsley(props: T_Munsley_Props) {
  return (
    <div>
      <Calendar
        locale="ko"
        className="calendar_munsley"
        next2Label={null}
        prev2Label={null}
        onChange={() => props.setDate}
        value={props.date}
        calendarType="gregory"
        onClickDay={() => {
          if (!props.setScheduleType) return;
          props.setScheduleType('일정');
        }}
        key={new Date().setMilliseconds(1)} // 리렌더링을 위한 임의의 key 입력 (값은 중복될 확률이 적은 값으로 지정한 것)
      />
    </div>
  );
}

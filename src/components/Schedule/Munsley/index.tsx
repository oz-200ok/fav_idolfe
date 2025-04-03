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
        onClickDay={(value) => {
          if (!props.setSaveType || !props.setScheduleType || !props.setDate)
            return;
          props.setSaveType('월');
          props.setScheduleType('일정');
          props.setDate(new Date(value));
        }}
        key={new Date().setMilliseconds(1)} // 리렌더링을 위한 임의의 key 입력 (값은 중복될 확률이 적은 값으로 지정한 것)
      />
    </div>
  );
}
// cenlendar content props 추가할 것
// setData가 null에서 변경될 경우
// 리랜더링되면서 해당 일정에 간단한 일정 표시 (타이틀과 컬러 표시 overflow 적용)
// 만약 리스트가 2~3개 이상이라면 하단 ... 표시로 할 것

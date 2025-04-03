import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './munsley.scss';
import {
  T_use_Date,
  T_use_Day,
  T_use_Modal,
  T_use_ScheduleType,
  T_useState_day_s,
} from '../type';
import { plus0 } from '..';

type T_Munsley_Props = T_use_Date &
  T_use_Modal &
  T_use_ScheduleType &
  T_use_Day;

export default function Munsley(props: T_Munsley_Props) {
  function day(date: Date, celendar?: T_useState_day_s) {
    return (
      <>
        {celendar?.map((item, index) => {
          const month = plus0(date.getMonth() + 1);
          const day = plus0(date.getDate());
          if (index >= 3) {
            // 리스트가 3개 이상일 때
          }

          if (!item.start_time.includes(`${month}-${day}`)) return;
          return (
            <div className="div_munsley-box">
              <p>{item.title}</p>
            </div>
          );
        })}
      </>
    );
  }
  console.log(props);
  return (
    <div>
      <Calendar
        locale="ko"
        className="calendar_munsley"
        next2Label={null}
        prev2Label={null}
        onChange={(value) =>
          props.setDate && props.setDate(new Date(value as Date))
        }
        value={props.date}
        calendarType="gregory"
        onClickDay={(value) => {
          if (!props.setSaveType || !props.setScheduleType || !props.setDate)
            return;
          props.setSaveType('월');
          props.setScheduleType('일정');
          props.setDate(new Date(value));
        }}
        tileContent={({ date }) => day(date, props.day)}
        key={new Date().setMilliseconds(1)} // 리렌더링을 위한 임의의 key 입력 (값은 중복될 확률이 적은 값으로 지정한 것)
      />
    </div>
  );
}
// cenlendar content props 추가할 것
// setData가 null에서 변경될 경우
// 리랜더링되면서 해당 일정에 간단한 일정 표시 (타이틀과 컬러 표시 overflow 적용)
// 만약 리스트가 2~3개 이상이라면 하단 ... 표시로 할 것

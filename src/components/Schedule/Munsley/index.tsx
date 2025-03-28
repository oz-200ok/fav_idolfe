import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './munsley.scss';
import { T_Schedule, T_Value } from '..';
import { Value } from 'react-calendar/src/shared/types.js';
import { Dispatch, SetStateAction } from 'react';

type T_schedule = T_Value<Value> & {
  setModal: Dispatch<SetStateAction<boolean>>;
  setScheduleType: Dispatch<SetStateAction<T_Schedule>>;
};

export default function Schedule(props: T_schedule) {
  return (
    <div>
      <Calendar
        locale="ko"
        className="calendar_munsley"
        next2Label={null}
        prev2Label={null}
        onChange={props.onChange}
        value={props.value}
        calendarType="gregory"
        onClickDay={() => {
          props.setScheduleType('일정');
        }}
        key={new Date().setMilliseconds(1)} // 리렌더링을 위한 임의의 key 입력 (값은 중복될 확률이 적은 값으로 지정한 것)
      />
    </div>
  );
}

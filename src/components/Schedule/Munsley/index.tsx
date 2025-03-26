import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './munsley.scss';
import { T_Value } from '..';
import { Value } from 'react-calendar/src/shared/types.js';

export default function Schedule(props: T_Value<Value>) {
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
      />
    </div>
  );
}
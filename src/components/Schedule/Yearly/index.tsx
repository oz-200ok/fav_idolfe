import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './yearly.scss';
import ViewYearly from './ViewYearly';
import { Value } from 'react-calendar/src/shared/types.js';
import { T_Value } from '..';

export default function Schedule(props: T_Value<Value>) {
  const emptyArray = new Array(12).fill('');

  return (
    <div className="div_schedule">
      {emptyArray.map((_, index) => {
        if (!props.value) return;
        if (props.value instanceof Date) {
          const date = new Date(props.value.getFullYear(), index, 1);
          return (
            <ViewYearly key={index} value={date} onChange={props.onChange} />
          );
        }
      })}
    </div>
  );
}

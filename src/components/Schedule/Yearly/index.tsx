import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './yearly.scss';
import ViewYearly from './ViewYearly';
import { Value } from 'react-calendar/src/shared/types.js';
import { T_Schedule, T_Value } from '..';
import { Dispatch, SetStateAction } from 'react';

export type T_YearlyProps = T_Value<Value> & {
  setScheduleType: Dispatch<SetStateAction<T_Schedule>>;
};

export default function Yearly(props: T_YearlyProps) {
  const emptyArray = new Array(12).fill('');

  return (
    <div className="div_schedule">
      {emptyArray.map((_, index) => {
        if (!props.value) return;
        if (props.value instanceof Date) {
          const date = new Date(props.value.getFullYear(), index, 1);
          return (
            <ViewYearly
              key={index}
              value={date}
              onChange={props.onChange}
              setScheduleType={props.setScheduleType}
            />
          );
        }
      })}
    </div>
  );
}

import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './yearly.scss';
import ViewYearly from './ViewYearly';
import { T_use_Date, T_use_Day, T_use_ScheduleType } from '../type';

type T_Yearly_Props = T_use_Date & T_use_ScheduleType & T_use_Day;

export default function Yearly(props: T_Yearly_Props) {
  const emptyArray = new Array(12).fill('');

  return (
    <div className="div_schedule">
      {emptyArray.map((_, index) => {
        if (!props.date) return;
        if (props.date instanceof Date) {
          const date = new Date(props.date.getFullYear(), index, 1);
          return (
            <ViewYearly
              key={index}
              date={date}
              setDate={props.setDate}
              setScheduleType={props.setScheduleType}
            />
          );
        }
      })}
    </div>
  );
}

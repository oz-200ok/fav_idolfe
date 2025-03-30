import './Day.scss';
import ViewDay from './ViewDay';
import Buttons from './Buttons';
import { T_use_Date, T_use_Modal, T_use_ScheduleType } from '../type';

type T_Day_Props = T_use_Date & T_use_Modal & T_use_ScheduleType;

export default function Day(props: T_Day_Props) {
  return (
    <div className="div_dayContainer">
      <ViewDay date={props.date} setDate={props.setDate} />
      <Buttons
        setScheduleType={props.setScheduleType}
        setModal={props.setModal}
      />
    </div>
  );
}

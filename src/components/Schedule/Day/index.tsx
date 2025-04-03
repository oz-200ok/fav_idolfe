import './Day.scss';
import ViewDay from './ViewDay';
import Buttons from './Buttons';
import {
  T_use_Date,
  T_use_Day,
  T_use_Modal,
  T_use_ScheduleType,
} from '../type';
import { useState } from 'react';

type T_Day_Props = T_use_Date & T_use_Modal & T_use_ScheduleType & T_use_Day;

export default function Day(props: T_Day_Props) {
  const [view, setView] = useState(false);

  return (
    <div className="div_dayContainer">
      <ViewDay
        day={props.day}
        date={props.date}
        setDate={props.setDate}
        view={view}
        setView={setView}
      />
      <Buttons
        setScheduleType={props.setScheduleType}
        setModal={props.setModal}
        view={view}
        day={props.day}
        saveType={props.saveType}
        setSaveType={props.setSaveType}
      />
    </div>
  );
}

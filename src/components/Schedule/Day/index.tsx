import './Day.scss';
import ViewDay from './ViewDay';
import Buttons from './Buttons';
import { T_use_Date, T_use_Modal, T_use_ScheduleType } from '../type';
import { useEffect, useState } from 'react';

type T_Day_Props = T_use_Date & T_use_Modal & T_use_ScheduleType;

export default function Day(props: T_Day_Props) {
  const [view, setView] = useState(false);

  useEffect(() => {
    console.log(props.date);
  }, [props.date]);
  return (
    <div className="div_dayContainer">
      <ViewDay
        date={props.date}
        setDate={props.setDate}
        view={view}
        setView={setView}
      />
      <Buttons
        setScheduleType={props.setScheduleType}
        setModal={props.setModal}
        view={view}
      />
    </div>
  );
}

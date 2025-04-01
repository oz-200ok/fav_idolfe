import './Day.scss';
import ViewDay from './ViewDay';
import Buttons from './Buttons';
import { T_use_Date, T_use_Modal, T_use_ScheduleType } from '../type';
import { useState } from 'react';

type T_Day_Props = T_use_Date & T_use_Modal & T_use_ScheduleType;

export default function Day(props: T_Day_Props) {
  // ViewDay 컴포넌트 props
  // 일정, 스케줄id, 그룹id

  // Buttons 컴포넌트 props
  //

  /**세부정보 온/오프 */
  const [view, setView] = useState(false);

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
        saveType={props.saveType}
        setSaveType={props.setSaveType}
      />
    </div>
  );
}

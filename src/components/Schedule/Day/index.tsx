import { Dispatch, SetStateAction, useState } from 'react';
import './Day.scss';
import ViewDay from './ViewDay';
import Buttons from './Buttons';
import { T_use_Date, T_use_Modal, T_use_ScheduleType } from '../type';

// API 받아온 이후 수정될 타입
// scheduleData 변수도 수정될 예정

export type T_Schedules = {
  schedules: string[] | undefined;
  setSchedules: Dispatch<SetStateAction<string[]>>;
};

type T_Day_Props = T_use_Date & T_use_Modal & T_use_ScheduleType;

export default function Day(props: T_Day_Props) {
  const [scheduleData, setScheduleData] = useState<string[]>([
    '안녕하세요',
    '하이',
  ]);

  return (
    <div className="div_dayContainer">
      <ViewDay schedules={scheduleData} setSchedules={setScheduleData} />
      <Buttons
        schedules={scheduleData}
        setSchedules={setScheduleData}
        setScheduleType={props.setScheduleType}
        setModal={props.setModal}
      />
    </div>
  );
}

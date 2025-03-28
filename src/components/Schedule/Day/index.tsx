import { Dispatch, SetStateAction, useState } from 'react';
import { T_Schedule, T_Value } from '..';
import { T_Modal } from '@/components/scheduleAdd';
import { Value } from 'react-calendar/src/shared/types.js';
import './Day.scss';
import ViewDay from './ViewDay';
import Buttons from './Buttons';

export type T_Schedules = {
  schedules: string[] | undefined;
  setSchedules: Dispatch<SetStateAction<string[]>>;
};

type T_DayProps = T_Value<Value> &
  T_Modal & {
    setScheduleType: Dispatch<SetStateAction<T_Schedule>>;
  };

export default function Day(props: T_DayProps) {
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

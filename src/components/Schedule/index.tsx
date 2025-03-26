import { Dispatch, SetStateAction, useState } from 'react';
import Weekly from './Weekly';
import Yearly from './Yearly';
import Munsley from './Munsley';
import DropDown from './DropDown';
import ViewYear from './ViewYear';
import { Value } from 'react-calendar/src/shared/types.js';

export type T_Schedule = '월' | '주' | '연';
export type T_Value<T> = {
  value: T;
  onChange: Dispatch<SetStateAction<T>>;
};

export default function Schedule() {
  const [value, onChange] = useState<Date>(new Date());
  const [scheduleType, setScheduleType] = useState<T_Schedule>('월');
  const [dropDownView, setDropDownView] = useState<boolean>(false);

  function randerSchedule(props: T_Value<Date | Value>) {
    if (scheduleType === '주') return <Weekly {...props} />;
    else if (scheduleType === '연') return <Yearly {...props} />;
    else return <Munsley {...props} />;
  }

  return (
    <div className="div_scheduleContainer">
      <button
        className="button_dropDown"
        onClick={() => {
          setDropDownView(!dropDownView);
        }}
      >
        {scheduleType} {dropDownView === true ? '^' : 'v'}
      </button>
      {dropDownView && (
        <DropDown
          scheduleType={scheduleType}
          setScheduleType={setScheduleType}
          setDropDownView={setDropDownView}
        />
      )}

      <ViewYear value={value} onChange={onChange} scheduleType={scheduleType} />
      <div>{randerSchedule({ value, onChange: Date })}</div>
    </div>
  );
}
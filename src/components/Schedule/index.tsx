import { useState } from 'react';
import Weekly from './Weekly';
import Yearly from './Yearly';
import Munsley from './Munsley';
import DropDown from './DropDown';

export type T_Schedule = '월' | '주' | '연';

export default function Schedule() {
  const [value, onChange] = useState<Date>(new Date());
  console.log(value, onChange);
  const [scheduleType, setScheduleType] = useState<T_Schedule>('연');
  const [dropDownView, setDropDownView] = useState<boolean>(false);

  function randerSchedule() {
    if (scheduleType === '주') return <Weekly />;
    else if (scheduleType === '연') return <Yearly />;
    else return <Munsley />;
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
      <div>{randerSchedule()}</div>
    </div>
  );
}

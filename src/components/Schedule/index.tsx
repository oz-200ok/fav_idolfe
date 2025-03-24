import { useState } from 'react';
import Weekly from './Weekly';
import Yearly from './Yearly';
import Munsley from './Munsley';
import DropDown from './DropDown';

export type T_Schedule = '월' | '주' | '연';

export default function Schedule() {
  const [scheduleType, setScheduleType] = useState<T_Schedule>('주');
  const [dropDownView, setDropDownView] = useState<boolean>(false);

  function randerSchedule() {
    if (scheduleType === '주') return <Weekly />;
    else if (scheduleType === '연') return <Yearly />;
    else return <Munsley />;
  }

  return (
    <div>
      <button
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

// 드롭다운 버튼은 css로 위치조정 필요

import { useState } from 'react';
import Weekly from './Weekly';
import Yearly from './Yearly';
import Munsley from './Munsley';
import DropDown from './DropDown';
import ViewYear from './ViewYear';
import Modal from '../scheduleAdd';
import Day from './Day';

import { T_ScheduleType, T_use_Date } from './type';

export default function Schedule() {
  const [scheduleType, setScheduleType] = useState<T_ScheduleType>('월');
  const [dropDownView, setDropDownView] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);

  function randerSchedule(props: T_use_Date) {
    if (scheduleType === '주') return <Weekly {...props} />;
    else if (scheduleType === '연')
      return <Yearly {...props} setScheduleType={setScheduleType} />;
    else if (scheduleType === '월')
      return (
        <Munsley
          {...props}
          setModal={setModal}
          setScheduleType={setScheduleType}
        />
      );
    else
      return (
        <Day {...props} setModal={setModal} setScheduleType={setScheduleType} />
      );
  }

  return (
    <div className="div_scheduleContainer">
      {modal && <Modal setModal={setModal} />}
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

      <ViewYear date={date} setDate={setDate} scheduleType={scheduleType} />
      <div>{randerSchedule({ date: date, setDate: Date })}</div>
    </div>
  );
}

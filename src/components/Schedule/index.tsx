import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Weekly from './Weekly';
import Yearly from './Yearly';
import Munsley from './Munsley';
import DropDown from './DropDown';
import ViewYear from './ViewYear';
import { Value } from 'react-calendar/src/shared/types.js';
import Modal from '../scheduleAdd';
import Day from './Day';

export type T_Schedule = '월' | '주' | '연' | '일정';
export type T_Value<T> = {
  value: T;
  onChange: Dispatch<SetStateAction<T>>;
};

export default function Schedule() {
  const [scheduleType, setScheduleType] = useState<T_Schedule>('월');
  const [dropDownView, setDropDownView] = useState(false);
  const [value, onChange] = useState(new Date());
  const [modal, setModal] = useState(false);

  function randerSchedule(props: T_Value<Date | Value>) {
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

      <ViewYear value={value} onChange={onChange} scheduleType={scheduleType} />
      <div>{randerSchedule({ value, onChange: Date })}</div>
    </div>
  );
}

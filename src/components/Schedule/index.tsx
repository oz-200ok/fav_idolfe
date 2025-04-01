import { useEffect, useState } from 'react';
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
  const [saveType, setSaveType] = useState<T_ScheduleType>('월');
  const [dropDownView, setDropDownView] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);

  // const [day, setDay] = useState<T_GroupScheduleAdd[] | null>(null);
  // const [scheduleID, setScheduleID] = useState<number | null>(null);
  // const [groupID, setGroupID] = useState<number | null>(1);

  // useEffect(() => {
  //   const APIrespone = async () => {
  //     // const data = axios구문 / 유틸
  //     // /ilog/service/schedules (사용자가 구독한 그룹의 일정목록 조회) 사용자일 때
  //     // /ilog/schedule (관리중인 그룹 일정 조회) 어드민일 때

  //     // 추후에 그룹선택 드롭다운 추가 (추가한다는 전재하에 짠 api 구조)
  //     setDay(data);
  //   };
  //   APIrespone();
  // }, []);

  useEffect(() => {
    console.log('date 변경됨:', date);
    console.log('getDate 테스트 변경됨:', date.getDate());
  }, [date]);
  useEffect(() => {
    console.log('saveType 변경됨:', saveType);
  }, [saveType]);

  // yearly 제외 모든 컴포넌트에 그룹 일정목록 props
  // 각 컴포넌트마다 각 일정날짜와 props.start_time이 동일할 때 적용 (중복될테니 유틸로 뺄 것)
  // 동일 시 해당 일정의 스케줄 ID를 useState로 저장
  // DAY에서 스케줄ID 상태를 호출하여 표시 (일정, 그룹 ID props)
  function randerSchedule(props: T_use_Date) {
    if (scheduleType === '주')
      return (
        <Weekly
          {...props}
          setScheduleType={setScheduleType}
          saveType={saveType}
          setSaveType={setSaveType}
        />
      );
    else if (scheduleType === '연')
      return <Yearly {...props} setScheduleType={setScheduleType} />;
    else if (scheduleType === '월')
      return (
        <Munsley
          {...props}
          setModal={setModal}
          setScheduleType={setScheduleType}
          saveType={saveType}
          setSaveType={setSaveType}
        />
      );
    else
      return (
        <Day
          {...props}
          setModal={setModal}
          setScheduleType={setScheduleType}
          saveType={saveType}
          setSaveType={setSaveType}
        />
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
      <div>{randerSchedule({ date, setDate })}</div>
    </div>
  );
}

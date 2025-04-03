import { useEffect, useState } from 'react';
import Weekly from './Weekly';
import Yearly from './Yearly';
import Munsley from './Munsley';
import DropDown from './DropDown';
import ViewYear from './ViewYear';
import Modal from '../scheduleAdd';
import Day from './Day';

import { T_ScheduleType, T_use_Date } from './type';
import UserInstance from '@/utils/UserInstance';
import { T_GroupScheduleAdd } from '@/types/typeAPI';

export function plus0(timeSet: number) {
  const day = timeSet >= 10 ? timeSet : `0${timeSet}`;
  return day;
}

export default function Schedule() {
  const [scheduleType, setScheduleType] = useState<T_ScheduleType>('월');
  const [saveType, setSaveType] = useState<T_ScheduleType>('월');
  const [dropDownView, setDropDownView] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);

  const [day, setDay] = useState<T_GroupScheduleAdd[]>([]);
  // const [scheduleID, setScheduleID] = useState<number | null>(null);
  // const [groupID, setGroupID] = useState<number | null>(1);

  // useEffect(() => {
  //   const dataa = {
  //     group: 1,
  //     title: '잠자기',
  //     description: '드르렁',
  //     location: '집',
  //     start_time: '2025-03-26T07:10:16.951Z',
  //     end_time: '2025-03-26T08:10:16.951Z',
  //     participating_member_ids: [1, 2],
  //   };
  //   const api = async () => {
  //     const respones = await UserInstance.post('/idol/groups/1', dataa);
  //     const respone = respones.data;
  //     console.log(respone);
  //   };
    // api();
  // }, []);

  useEffect(() => {
    console.log('date값 변경되어 일정 재로드');
    const APIrespones = async () => {
      // const data = axios구문 / 유틸
      // /ilog/service/schedules (사용자가 구독한 그룹의 일정목록 조회) 사용자일 때
      // /ilog/schedule (관리중인 그룹 일정 조회) 어드민일 때 -> 당장은 모든 일정 조회로 대체

      // 현재 달에 맞는 값 필터임다 네!
      const respones = (await UserInstance.get('/schedule/')).data;
      const nowMonth = respones.filter((item: T_GroupScheduleAdd) => {
        const Month = date.getMonth() + 1 >= 10 || `0${date.getMonth() + 1}`;
        if (item.start_time.includes(`-${Month}-`)) return item;
      });
      setDay(nowMonth);
    };
    APIrespones();
  }, [date]);

  useEffect(() => {
    console.log('day 변경됨 ===== ', day);
  }, [day]);

  // yearly 제외 모든 컴포넌트에 그룹 일정목록 props
  // 각 컴포넌트마다 각 일정날짜와 props.start_time이 동일할 때 적용 (중복될테니 유틸로 뺄 것)
  // 동일 시 해당 일정의 스케줄 ID를 useState로 저장
  // DAY에서 스케줄ID 상태를 호출하여 표시 (일정, 그룹 ID props)
  function randerSchedule(props: T_use_Date) {
    if (scheduleType === '주')
      return (
        <Weekly
          {...props}
          day={day}
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
          day={day}
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
          day={day}
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

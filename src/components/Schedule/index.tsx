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

// 월간,주간 -> 일정
// 연간 -> 월간 (에러 수정 필요) !fix

// API
// 구독 그룹 데이터 호출 (로그인 상태 확인 / 사용자 구독 그룹)
// 해당 그룹 일정 호출 (모든 구독 그룹을 한 일정에?)
// 월간, 주간 (그룹 / 일정타이틀 / 일정갯수)
// 연간 (일정갯수?)
// 클릭 시 해당 일정의 세부일정 확인 (해당 일정 호출) -> Day > *
// 일정 조회 T_UserGroupScheduleSearch -> 여기 index에서 추가
// 특정 일정 조회 T_UserGroupSchedule -> 일정조회 id를 토대로 day에서 추가
// (type.ts 중복 타입 수정 필요) !fix
// 일정 추가 -> T_GroupScheduleAdd / T_GroupMember
// 일정 수정 -> T_GroupScheduleModify / T_GroupMember
// 일정 삭제 -> T_GroupScheduleDelete
// 따로 유틸로 빼서 추가
// day -> viewDay,buttons 이하 컴포넌트에 다 전달 (일정조회/그룹 등)
// api 연결 후 전체적 체크

import { T_use_Date, T_use_Day, T_use_View } from '../type';
import ViewSchedule from './ViewSchedule';
import ViewDetail from './ViewDetail';
import './Day.scss';
import { plus0 } from '..';
import { useState } from 'react';
import { T_GroupScheduleAdd } from '@/types/typeAPI';

type T_ViewDay_Props = T_use_Date & T_use_View & T_use_Day;

export default function ViewDay(props: T_ViewDay_Props) {
  const [clickSchedule, setClickSchedule] = useState<T_GroupScheduleAdd | null>(null)
  // props로 받아온 일정에서 스케줄 ID가 동일한 일정을 표시
  // ViewSchedule에선 시간과 타이틀만
  // ViewDetail에선 모든 세부 일정을 표시
  // └ 멤버도 그려야하니 그룹ID를 통해 멤버 정보 조회 API 할 것
  const data = props?.day?.filter((item) => {
    if (!props?.date?.getMonth()) return;
    // 유틸로 따로 빼주기 15~17
    const month = plus0(props?.date?.getMonth() + 1);
    const day = plus0(props.date.getDate());
    if (item.start_time.includes(`${month}-${day}`)) return item;
  });

  return (
    <div className="div_viewDay">
      {data?.length !== 0 ? (
        <>
          <ViewSchedule
            data={data}
            view={props.view}
            setView={props.setView}
            setDate={props.setDate}
            setClickSchedule={setClickSchedule}
          />
          {props.view && <ViewDetail data={clickSchedule} />}
        </>
      ) : (
        <p className="p_undefind_Schedule">등록된 일정이 없습니다</p>
      )}
    </div>
  );
}

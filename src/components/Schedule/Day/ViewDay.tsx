import { T_use_Date, T_use_View } from '../type';
import ViewSchedule from './ViewSchedule';
import ViewDetail from './ViewDetail';
import './Day.scss';
import { data } from '../data';

type T_ViewDay_Props = T_use_Date & T_use_View;

export default function ViewDay(props: T_ViewDay_Props) {
  // props로 받아온 일정에서 스케줄 ID가 동일한 일정을 표시
  // ViewSchedule에선 시간과 타이틀만
  // ViewDetail에선 모든 세부 일정을 표시
  // └ 멤버도 그려야하니 그룹ID를 통해 멤버 정보 조회 API 할 것
  return (
    <div className="div_viewDay">
      {data?.length !== 0 ? (
        <>
          <ViewSchedule
            value={data}
            view={props.view}
            setView={props.setView}
            setDate={props.setDate}
          />
          {props.view && <ViewDetail value={data[0]} />}
        </>
      ) : (
        <p className="p_undefind_Schedule">등록된 일정이 없습니다</p>
      )}
    </div>
  );
}

import { T_use_Date, T_use_View } from '../type';
import ViewSchedule from './ViewSchedule';
import ViewDetail from './ViewDetail';
import './Day.scss';
import { data } from '../data';

type T_ViewDay_Props = T_use_Date & T_use_View;

export default function ViewDay(props: T_ViewDay_Props) {
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

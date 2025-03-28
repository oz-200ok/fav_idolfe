import { T_Schedules } from '.';
import './Day.scss';

export default function ViewDay(props: T_Schedules) {
  return (
    <div className="div_viewDay">
      {props.schedules?.length !== 0 ? (
        props.schedules
      ) : (
        <p className="p_undefind_Schedule">등록된 일정이 없습니다</p>
      )}
    </div>
  );
}

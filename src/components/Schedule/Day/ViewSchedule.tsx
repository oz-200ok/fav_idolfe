import { T_GroupScheduleAdd } from '@/types/typeAPI';

export default function ViewSchedule(props: T_GroupScheduleAdd[]) {
  return (
    <div>
      {props.map((item) => {
        return (
          <div className="div_DAYschedule">
            <p className="p_DAYschedule-time">{item.start_time}</p>
            <p className="p_DAYschedule-title">{item.title}</p>
          </div>
        );
      })}
    </div>
  );
}

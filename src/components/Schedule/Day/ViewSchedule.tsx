import { T_GroupScheduleAdd } from '@/types/typeAPI';
import { viewTime } from '@/utils/viewTime';
import { T_use_Date, T_use_View } from '../type';

type T_ViewSchedule_Props = T_use_Date & T_use_View & {
  value: T_GroupScheduleAdd[];
};

export default function ViewSchedule(props: T_ViewSchedule_Props) {
  if (!props.setDate) return;
  return (
    <div className='div_ViewSchedule-centainer'>
      {props.value.map((item, index) => {
        return (
          <button
            className="button_DAYschedule"
            onClick={() => {
              if (!props.setView) return;
              // props.setDate(new Date(2025, 1, 1));
              props.setView(!props.view);
            }}
            key={index}
          >
            <p className="p_DAYschedule-time">{viewTime(item.start_time)}</p>
            <p className="p_DAYschedule-title">{item.title}</p>
          </button>
        );
      })}
    </div>
  );
}

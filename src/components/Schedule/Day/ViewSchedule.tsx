import { viewTime } from '@/utils/viewTime';
import { T_use_clickSchedule, T_use_Date, T_use_View } from '../type';
import { T_GroupScheduleAdd } from '@/types/typeAPI';

type T_ViewSchedule_Props = T_use_Date &
  T_use_View &
  T_use_clickSchedule & {
    data?: T_GroupScheduleAdd[];
  };

export default function ViewSchedule(props: T_ViewSchedule_Props) {
  if (!props.setDate) return;
  console.log('여어어어기이이이', props.date);
  return (
    <div className="div_ViewSchedule-centainer">
      {props?.data?.map((item, index) => {
        console.log('item~~~~~', item);
        return (
          <button
            className="button_DAYschedule"
            onClick={() => {
              if (!props.setView || !props.setClickSchedule) return;
              // props.setDate(new Date(2025, 1, 1));
              props.setView(true);
              props.setClickSchedule(item);
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

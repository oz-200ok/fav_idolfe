import { T_GroupScheduleAdd } from '@/types/typeAPI';
import { viewTime } from '@/utils/viewTime';

type T_ViewDetail_Props = { data: T_GroupScheduleAdd | null };

export default function ViewDetail(props: T_ViewDetail_Props) {
  console.log(props.data);
  return (
    <div className="div_ViewDetail-centainer">
      <div className="div_memberList-box">
        <h1>관련 멤버</h1>
        <hr />
        <ul className="ul_members_img">
          {props?.data?.participating_members.map((item) => {
            console.log(item);
            return (
              <>
                <img
                  src="아이템"
                  className="img_member"
                  alt={item}
                  key={item}
                />
                <p>{item}</p>
              </>
            );
          })}
        </ul>
      </div>

      <div className="div_detailContent-box">
        <div>
          <h1>세부 일정</h1>
          <p>
            {props.data?.start_time && viewTime(props.data.start_time)} ~{' '}
            {props.data?.end_time && viewTime(props.data.end_time)}
          </p>
        </div>
        <hr />
        <p>{props?.data?.description}</p>
      </div>
    </div>
  );
}

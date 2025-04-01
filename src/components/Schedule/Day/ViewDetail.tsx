import { T_GroupScheduleAdd } from '@/types/typeAPI';
import { viewTime } from '@/utils/viewTime';

type T_ViewDetail_Props = {
  value: T_GroupScheduleAdd;
};

export default function ViewDetail(props: T_ViewDetail_Props) {
  return (
    <div className="div_ViewDetail-centainer">
      <div className="div_memberList-box">
        <h1>관련 멤버</h1>
        <hr />
        <ul className="ul_members_img">
          {props.value.participating_members.map((item) => {
            return (
              <img
                src="아이템"
                className="img_member"
                alt={item.name}
                key={item.member_id}
              />
            );
          })}
        </ul>
      </div>

      <div className="div_detailContent-box">
        <div>
          <h1>세부 일정</h1>
          <p>
            {viewTime(props.value.start_time)} ~{' '}
            {viewTime(props.value.end_time)}
          </p>
        </div>
        <hr />
        <p>{props.value.description}</p>
      </div>
    </div>
  );
}

import { T_group } from '../../pages/SearchPage/type';
import { subList } from './data';

// 그룹 박스 생성
export function BoxList({ group }: { group: T_group }) {
  return (
    <div className="div_box">
      <img alt={group.group_image} />
      <GroupInfo {...group} />
      <Sub id={group.group_id} />
    </div>
  );
}

// 그룹 세부정보 (이름, 멤버, 소속사, 링크)
function GroupInfo(list: T_group) {
  let member = '';
  list.members.forEach((item) => (member = member + ' ' + item));
  return (
    <div className="div_groupInfo">
      <h1>{list.group_name}</h1>
      <span className="span_member">{member}</span>
      <p className="p_agency">소속사: {list.agency_name}</p>
      <p className="p_instagram">{list.sns_links.instagram}</p>
    </div>
  );
}

// 각 그룹 구독 유무 체크
function Sub({ id }: { id: number }) {
  const filterSub = subList.filter((item) => item.group_id === id);
  return (
    <>
      {filterSub.map((item, index) => {
        const trueORfalse = item.notification;
        return (
          <button key={index} className={`common_btn button_${!trueORfalse}`}>
            {trueORfalse ? '구독 중' : '구독하기'}
          </button>
        );
      })}
    </>
  );
}

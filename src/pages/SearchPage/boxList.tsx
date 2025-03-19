// 필요정보 -> 그룹이미지, 그룹이름, 멤버들, 소속사, 인스타링크 / 구독유무
type groupType = {
  // api 명세서에 아직 없어서 임의로 만든 타입정의
  group_id: number;
  agency_name: string;
  group_name: string;
  sns_links: {
    instagram: string;
  };
  group_color: string;
  group_image: string;
  member_count: number;
  members: string[];
};

export function BoxList({ group }: { group: groupType[] }) {
  console.log(group);
  return (
    <div className="div_boxlist">
      {group.map((list, index) => {
        return (
          <div className="div_box" key={index}>
            <img alt={list.group_image} />
            <GroupInfo {...list} />
            <Sub id={list.group_id} />
          </div>
        );
      })}
    </div>
  );
}

function GroupInfo(list: groupType) {
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

type SubProps = { id: number };

function Sub({ id }: SubProps) {
  const subList = [
    {
      group_id: 1,
      notification: false,
    },
    {
      group_id: 2,
      notification: true,
    },
    {
      group_id: 3,
      notification: true,
    },
    {
      group_id: 4,
      notification: false,
    },
    {
      group_id: 5,
      notification: false,
    },
    {
      group_id: 6,
      notification: false,
    },
  ];

  const filterSub = subList.filter((item) => item.group_id === id);
  console.log(filterSub);
  return (
    <>
      {filterSub.map((item, index) => {
        const trueORfalse = item.notification;
        return (
          <button key={index} className={`button_${!trueORfalse}`}>
            {trueORfalse ? '구독 중' : '구독하기'}
          </button>
        );
      })}
    </>
  );
}

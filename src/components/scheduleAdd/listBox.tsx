import { Dispatch, SetStateAction, useState } from 'react';
import { memberData } from './data';
import { T_MemberImg } from './type';

// type값을 받아 멤버 목록을 그릴 것인지, 추가된 멤버를 그릴 것인지 체크
// add -> 그룹 멤버 목록
// list -> 추가된 멤버 목록

type props = {
  type: 'add' | 'list';
};

export default function ListBox({ type }: props) {
  const [memberAdded, setMemberAdded] = useState<Set<string>>(new Set('윈터'));

  switch (type) {
    case 'add':
      var list = (
        <ADD memberAdded={memberAdded} setMemberAdded={setMemberAdded} />
      );
      break;
    case 'list':
      var list = <LIST memberAdded={memberAdded} />;
      break;
  }

  return (
    <div className="div_listBox">
      <p>{type === 'add' ? '멤버 목록' : '추가된 멤버'}</p>
      <hr />
      <ul className="ul_memberBox">{list}</ul>
    </div>
  );
}

/**
 * 그룹 멤버들을 그리는 멤버박스
 */
export function ADD({ memberAdded, setMemberAdded }: T_MemberImg) {
  return (
    <ul className="ul_memberBox">
      {memberData.map((member, index) => {
        return (
          <button
            onClick={() => {
              const type = 'add';
              memberClickHandle({ member, type, memberAdded, setMemberAdded });
            }}
            key={index}
          >
            <img src="" alt={member} />
          </button>
        );
      })}
    </ul>
  );
}

/**
 * 일정에 추가된 멤버를 그리는 멤버박스
 * @memberAdded 일정에 추가된 멤버 목록
 */
export function LIST({ memberAdded }: { memberAdded: Set<string> }) {
  return (
    <ul className="ul_memberBox">
      {[...memberAdded].map((member, index) => {
        return (
          <button onClick={() => {}} key={index}>
            <img src="" alt={member} />
          </button>
        );
      })}

      {memberAdded.size === 0 && (
        <p className="p_memberAdded">
          멤버 목록에서 프로필을 클릭 시 <br /> 일정에 참여할 멤버가 추가 됩니다
        </p>
      )}
    </ul>
  );
}

type T_memberClickHandle = {
  member: string;
  type: string;
  memberAdded: Set<string>;
  setMemberAdded: Dispatch<SetStateAction<Set<string>>>;
};

export function memberClickHandle({
  member,
  type,
  memberAdded,
  setMemberAdded,
}: T_memberClickHandle) {
  switch (type) {
    case 'add':
      setMemberAdded(new Set(memberAdded).add(member));
      console.log('add');
      console.log(memberAdded);
      break;
    case 'list':
      console.log('list');
  }
}

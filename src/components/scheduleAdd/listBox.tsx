import { member } from './data';

type props = {
  type: string;
};

export default function ListBox({ type }: props) {
  const title = type === 'add' ? '멤버 목록' : '추가된 멤버';
  console.log(member);
  return (
    <div className="div_listBox">
      <p>{title}</p>
      <hr />
      <ul className='ul_memberBox'>
        {member.map((item, index) => {
          return <MemberImg member={item} key={index} />;
        })}
      </ul>
    </div>
  );
}

export function MemberImg({ member }: { member: string }) {
  return <img src="" alt={member} />;
}

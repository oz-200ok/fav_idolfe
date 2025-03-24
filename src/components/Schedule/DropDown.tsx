import { T_Schedule } from '.';

type T_Dropdown = {
  scheduleType: string;
  setScheduleType: React.Dispatch<React.SetStateAction<T_Schedule>>;
  setDropDownView: React.Dispatch<React.SetStateAction<boolean>>;
};

// 드롭다운 내 선택 함수
export default function DropDown(props: T_Dropdown) {
  function typeChange(type: T_Schedule) {
    props.setScheduleType(type);
    props.setDropDownView(false);
  }

  // 정렬하니까 더 보기 어려워지는 거 같은데 이거 맞아요?
  return (
    <ul className='div_randerDropDown'>
      <li
        onClick={() => {
          typeChange('월');
        }}
      >
        월
      </li>
      <li
        onClick={() => {
          typeChange('주');
        }}
      >
        주
      </li>
      <li
        onClick={() => {
          typeChange('연');
        }}
      >
        연
      </li>
    </ul>
  );
}

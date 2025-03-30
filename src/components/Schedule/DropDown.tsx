import { T_ScheduleType, T_use_DropDown, T_use_ScheduleType } from './type';

type T_Dropdown_Props = T_use_ScheduleType & T_use_DropDown;

// 드롭다운 내 선택 함수
export default function DropDown(props: T_Dropdown_Props) {
  function typeChange(type: T_ScheduleType) {
    if (!props.setDropDownView || !props.setScheduleType) return;
    props.setScheduleType(type);
    props.setDropDownView(false);
  }

  return (
    <ul className="div_randerDropDown">
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

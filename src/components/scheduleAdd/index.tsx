import TextInput from './textInput';
import './scheduleAdd.scss';
import ListBox from './listBox';
import DayTimeUI from './dayTime';
import PushButton from './pushButton';
import { T_use_Modal } from '../Schedule/type';

export default function Modal(props: T_use_Modal) {
  // 제목, 세부일정 미입력 시 에러띄울 것
  // 시간은 기본값으로 현재 시간을 표시할 것
  // 시간은 input으로 변경
  return (
    <div className="dev_overlay">
      <div className="dev_centainer">
        <div className="div_left">
          <TextInput text="제목" />
          <DayTimeUI />
          <TextInput text="세부 일정" />
        </div>
        <div className="right">
          <ListBox type="add" />
          <ListBox type="list" />
          <PushButton setModal={props.setModal} />
        </div>
      </div>
    </div>
  );
}

import TextInput from './textInput';
import './scheduleAdd.scss';
import ListBox from './listBox';
import DayTimeUI from './dayTime';
import PushButton from './pushButton';
import { T_use_Modal } from '../Schedule/type';

export default function Modal(props: T_use_Modal) {
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

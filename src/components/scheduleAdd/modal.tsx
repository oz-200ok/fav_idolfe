import TextInput from './textInput';
import './style.scss';
import ListBox from './listBox';
import DayTimeUI from './dayTime';
import PushButton from './pushButton';

export default function Modal() {
  return (
    <div className="dev_centainer">
      <div className="div_left">
        <TextInput text="제목" />
        <DayTimeUI />
        <TextInput text="세부 일정" />
      </div>
      <div className="right">
        <ListBox type="add" />
        <ListBox type="list" />
        <PushButton />
      </div>
    </div>
  );
}

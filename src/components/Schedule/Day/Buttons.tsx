import {
  T_use_Date,
  T_use_Day,
  T_use_Modal,
  T_use_ScheduleType,
  T_use_View,
} from '../type';
import './Day.scss';

type T_ViewDay_Props = T_use_Date &
  T_use_Modal &
  T_use_ScheduleType &
  T_use_View & T_use_Day;

export default function Buttons(props: T_ViewDay_Props) {
  return (
    <div className={`div_buttons ${props.view ? 'test' : ''}`}>
      <button
        className="button_back"
        onClick={() => {
          if (!props.setScheduleType || !props.setSaveType || !props.saveType)
            return;
          props.setScheduleType(props.saveType);
        }}
      >{`<`}</button>
      {props.day?.length !== 0 ? (
        <>
          <button
            className="button_defult button_add"
            onClick={() => {
              if (!props.setModal) return;
              props.setModal(true);
              document.body.classList.add('body_modalOverlay');
            }}
          >
            일정 추가
          </button>
          <button className="button_defult button_edit">일정 수정</button>
        </>
      ) : (
        <button
          className="button_defult button_add_undefind"
          onClick={() => {
            if (!props.setModal) return;
            props.setModal(true);
            document.body.classList.add('body_modalOverlay');
          }}
        >
          일정 추가
        </button>
      )}
    </div>
  );
}

import { T_Modal } from '@/components/scheduleAdd';
import { T_Schedules } from '.';
import { T_Schedule } from '..';
import './Day.scss';
import { Dispatch, SetStateAction } from 'react';

type T_ViewDay = T_Schedules &
  T_Modal & {
    setScheduleType: Dispatch<SetStateAction<T_Schedule>>;
  };

export default function Buttons(props: T_ViewDay) {
  return (
    <div className="div_buttons">
      <button
        className="button_back"
        onClick={() => {
          props.setScheduleType('월');
        }}
      >{`<`}</button>
      {props.schedules?.length !== 0 ? (
        <>
          <button
            className="button_defult button_add"
            onClick={() => {
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

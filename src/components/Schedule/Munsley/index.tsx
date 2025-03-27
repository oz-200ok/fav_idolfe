import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './munsley.scss';
import { T_Value } from '..';
import { Value } from 'react-calendar/src/shared/types.js';
import { useState } from 'react';
import Modal from '@/components/scheduleAdd';

export default function Schedule(props: T_Value<Value>) {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <div>
      {modal && <Modal setModal={setModal} />}
      {props.value && (
        <Calendar
          locale="ko"
          className="calendar_munsley"
          next2Label={null}
          prev2Label={null}
          onChange={props.onChange}
          value={props.value}
          calendarType="gregory"
          onClickDay={() => {
            setModal(true);
            document.body.classList.add('body_modalOverlay');
          }}
          key={new Date().setMilliseconds(1)} // 리렌더링을 위한 임의의 key 입력 (값은 중복될 확률이 적은 값으로 지정한 것)
        />
      )}
    </div>
  );
}

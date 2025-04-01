import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../schedule.scss';
import './munsley.scss';
import { T_use_Date, T_use_Modal, T_use_ScheduleType } from '../type';
import { useState } from 'react';

type T_Munsley_Props = T_use_Date & T_use_Modal & T_use_ScheduleType;

export default function Munsley(props: T_Munsley_Props) {
  // 일정 스케줄 ID 가 변경됨과 동시에 data를 일정값으로 변경
  const [data, setData] = useState<null>(null);

  function asdqwe(celendar: string, startTime: string) {
    const adfa = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
    const DATA_celendar = celendar.split(' ').slice(1, 4);
    const DATA_time = startTime.slice(0, 10);
    console.log(DATA_celendar);
    console.log(DATA_time);
    return;
  } // 나중에 유틸로 뺄 것!
  return (
    <div>
      <Calendar
        locale="ko"
        className="calendar_munsley"
        next2Label={null}
        prev2Label={null}
        onChange={() => props.setDate}
        value={props.date}
        calendarType="gregory"
        onClickDay={(value) => {
          if (!props.setSaveType || !props.setScheduleType || !props.setDate)
            return;
          props.setSaveType('월');
          props.setScheduleType('일정');
          props.setDate(new Date(value));
          // const timeText = '2025-03-15T 14:00:00+09:00'.slice(0, 10);
          // const text = `${value}`;
          // const number = text.split(' ').slice(1, 4);
          // const draaqae = 'Mar';
          // const month = { Mar: '03' };
          // const drae = `${number[2]}-${month[draaqae]}-${number[1]}`;
          // console.log(timeText, drae);
          // console.log(value);
          // asdqwe(`${value}`, '2025-03-15T 14:00:00+09:00')

          // props로 받아온 일정을 돌려 동일한 날짜인지 대조
          // 성공: setScheduleID(일정스케줄id) + setData({일정})
          // 실패: setScheduleID(null)
        }}
        key={new Date().setMilliseconds(1)} // 리렌더링을 위한 임의의 key 입력 (값은 중복될 확률이 적은 값으로 지정한 것)
      />
    </div>
  );
}
// cenlendar content props 추가할 것
// setData가 null에서 변경될 경우
// 리랜더링되면서 해당 일정에 간단한 일정 표시 (타이틀과 컬러 표시 overflow 적용)
// 만약 리스트가 2~3개 이상이라면 하단 ... 표시로 할 것

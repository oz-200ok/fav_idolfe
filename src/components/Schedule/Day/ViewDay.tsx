import { T_use_Date } from '../type';
import ViewSchedule from './ViewSchedule';
import ViewDetail from './ViewDetail';
import './Day.scss';
import { useState } from 'react';
import { data } from './data';

export default function ViewDay(props: T_use_Date) {
  const [view, setView] = useState(false);
  return (
    <div className="div_viewDay">
      {data?.length !== 0 ? (
        <>
          <ViewSchedule value={data} />
          {view && <ViewDetail value={data[0]} />}
        </>
      ) : (
        <p className="p_undefind_Schedule">등록된 일정이 없습니다</p>
      )}
    </div>
  );
}

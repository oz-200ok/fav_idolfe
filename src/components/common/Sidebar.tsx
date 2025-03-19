import { useState } from 'react';
import './common.scss'; // 변경된 부분
import down from '../../assets/chevron-down.png';
import up from '../../assets/chevron-up.png';

const Sidebar = () => {
  // 🔥 타입 없이 상태 관리 (초기값: 'guest' 그 외 user / admin)
  const [userType, setUserType] = useState('admin');

  const isAdmin = userType === 'admin';
  const [isListOpen, setIsListOpen] = useState(true);

  return (
    <aside className="sidebar">
      <div className="sidebar_header">
        <span>{isAdmin ? '그룹 관리' : '최애 캘린더'}</span>
        <button
          className="sidebar_toggle"
          onClick={() => setIsListOpen(!isListOpen)}
        >
          {isListOpen ? (
            <img src={down} alt="down" />
          ) : (
            <img src={up} alt="up" />
          )}
        </button>
      </div>

      {isListOpen && (
        <ul className="sidebar_list">
          {isAdmin ? (
            <>
              <li className="sidebar_item">
                그룹 1 <button className="sidebar_edit">그룹 정보 수정</button>
              </li>
              <li className="sidebar_item">
                그룹 2 <button className="sidebar_edit">그룹 정보 수정</button>
              </li>
            </>
          ) : (
            <>
              <li className="sidebar_item">구독한 아이돌 1</li>
              <li className="sidebar_item">구독한 아이돌 2</li>
              <li className="sidebar_item">구독한 아이돌 3</li>
            </>
          )}
        </ul>
      )}

      {isAdmin && <button className="sidebar_view">관리 그룹 보기</button>}
    </aside>
  );
};

export default Sidebar;

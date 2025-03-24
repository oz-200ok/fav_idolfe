import { useState } from 'react';
import './common.scss'; // 변경된 부분
import down from '../../assets/chevron-down.png';
import up from '../../assets/chevron-up.png';
import { useNavigate } from 'react-router-dom';

function SideBar() {
  // 🔥 타입 없이 상태 관리 (초기값: 'guest' 그 외 user / admin)
  // 상태값에 _(언더스코어) 를 붙이면 아직 사용 안 하지만 나중에 사용할거야! 라고 알려주는 느낌임
  const navigate = useNavigate();
  const [userType, _setUserType] = useState('admin');

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

      {isAdmin && (
        <button
          className="sidebar_view"
          onClick={() => {
            navigate('/groupaddpage');
          }}
        >
          관리 그룹 보기
        </button>
      )}
    </aside>
  );
}
export default SideBar;

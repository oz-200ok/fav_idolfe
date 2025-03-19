import React, { useState } from 'react';
import './Sidebar.scss';

interface SidebarProps {
  userType?: 'guest' | 'user' | 'admin'; // 일반 사용자 or 관리자
}

const SideBar: React.FC<SidebarProps> = ({ userType }) => {
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
          {isListOpen ? 'ˆ' : 'ˇ'}
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

export default SideBar;

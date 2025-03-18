
import React, { useState } from "react";
import "./Sidebar.scss";

interface SidebarProps {
  userType: "user" | "admin"; // 일반 사용자 or 관리자
}

const Sidebar: React.FC<SidebarProps> = ({ userType }) => {
  const isAdmin = userType === "admin";

  // 구독 목록 & 그룹 목록 접기 기능 상태
  const [isListOpen, setIsListOpen] = useState(true);

  return (
    <aside className="sidebar">
      {/* 상단 헤더 */}
      <div className="sidebar_header">
        <span>{isAdmin ? "그룹 관리" : "최애 캘린더"}</span>
        <button className="sidebar_toggle" onClick={() => setIsListOpen(!isListOpen)}>
          {isListOpen ? "ˆ" : "ˇ"}
        </button>
      </div>

      {/* 구독한 아이돌 / 관리 그룹 목록 (접기 기능 적용) */}
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
            </>
          )}
        </ul>
      )}

      {/* 관리 그룹 보기 버튼 (위아래 여백 수정) */}
      {isAdmin && <button className="sidebar_view">관리 그룹 보기</button>}
    </aside>
  );
};

export default Sidebar;

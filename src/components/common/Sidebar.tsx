
import "./Sidebar.scss";

interface SidebarProps {
  userType: "user" | "admin"; // "user" = 일반 사용자, "admin" = 관리자
}

const Sidebar: React.FC<SidebarProps> = ({ userType }) => {
  const isAdmin = userType === "admin";

  return (
    
    <aside className="sidebar">
      {/* 상단 헤더 */}
      <p>슬픔이</p>
      <div className="sidebar__header">
        <span>{isAdmin ? "그룹 관리" : "최애 캘린더"}</span>
        <button className="sidebar__add">+</button>
      </div>

      {/* 구독한 아이돌 / 관리 그룹 목록 */}
      <ul className="sidebar__list">
        {isAdmin ? (
          <>
            <li className="sidebar__item">
              그룹 1 <button className="sidebar__edit">그룹 정보 수정</button>
            </li>
            <li className="sidebar__item">
              그룹 2 <button className="sidebar__edit">그룹 정보 수정</button>
            </li>
          </>
        ) : (
          <>
            <li className="sidebar__item">구독한 아이돌 1</li>
            <li className="sidebar__item">구독한 아이돌 2</li>
          </>
        )}
      </ul>

      {/* 관리 그룹 보기 버튼 */}
      {isAdmin && <button className="sidebar__view">관리 그룹 보기</button>}
    </aside>
  );
};

export default Sidebar;

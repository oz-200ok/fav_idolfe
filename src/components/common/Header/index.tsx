import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/9.png';
import searchIcon from '../../assets/search.png';
import logoutIcon from '../../assets/logout.png';

//헤더 컴포넌트 정의
function Header() {
  //현재 로그인 상태를 저장할 state
  //유저상태 전역으로 관리
  const [userRole, setUserRole] = useState('user');
  // 기본값: "guest" = 로그인 전
  // "user" = 일반 사용자 로그인 후
  // "admin" = 관리자 로그인 후
  // 검색 입력 값 상태
  const [searchQuery, setSearchQuery] = useState('');

  // 검색어 업데이트 함수
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    setUserRole('guest');
  };

  return (
    <header className="header">
      {/* 로고 */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="I log" />
        </Link>
      </div>
      {/* 네비게이션 메뉴 */}
      <nav className="nav">
        {userRole === 'guest' && (
          //로그인 전
          <div className="nav_Links">
            <Link to="/login">
              <button className="login_Button">로그인</button>
            </Link>
            <Link to="/signup">
              <button className="signup_Button">회원가입</button>
            </Link>
          </div>
        )}
        {/* 일반 사용자 */}
        {userRole === 'user' && (
          <div className="nav_Links">
            {/* 검색창 */}
            <div className="search">
              <img src={searchIcon} alt="search" className="search_Icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="아티스트 검색"
              ></input>
            </div>

            {/* 버튼들 */}
            <Link to="/mypage">
              <button className="page_Button">마이페이지</button>
            </Link>
            <button onClick={handleLogout} className="logout_Button">
              <img src={logoutIcon} alt="로그아웃" className="logout_Icon" />
            </button>
          </div>
        )}
        {/* 관리자 */}
        {userRole === 'admin' && (
          <div className="nav_Links">
            {/* 검색창 */}
            <div className="search">
              <img src={searchIcon} alt="search" className="search_Icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="아티스트 검색"
              ></input>
            </div>

            {/* 버튼들 */}
            <Link to="/add">
              <button className="add_Button">일정추가</button>
            </Link>
            <Link to="/admin">
              <button className="page_Button">관리자페이지</button>
            </Link>
            <button onClick={handleLogout} className="logout_Button">
              <img src={logoutIcon} alt="로그아웃" className="logout_Icon" />
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
export default Header;

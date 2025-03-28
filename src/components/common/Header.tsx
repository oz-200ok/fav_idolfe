import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './common.scss';

import logo from '../../assets/9.png';
import searchIcon from '../../assets/search.png';
import logoutIcon from '../../assets/logout.png';
import { useAuth } from '@/context/AuthContext';

//헤더 컴포넌트 정의
function Header() {
  //현재 로그인 상태를 저장할 state  [유저상태 전역으로 관리]
  const [userRole, setUserRole] = useState('admin');
  // 기본값: "guest" = 로그인 전  "user" = 일반 사용자 로그인 후 "admin" = 관리자 로그인 후
  // 검색 입력 값 상태
  const [searchQuery, setSearchQuery] = useState('');

  const { markLoggedOut } = useAuth();
  const navigate = useNavigate();

  // 검색어 업데이트 함수
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    markLoggedOut();
    setUserRole('guest');
    navigate('/guest');
  };

  return (
    <header className="header">
      {/* 로고 */}
      <div className="logo">
        <img
          src={logo}
          alt="I log"
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
      {/* 네비게이션 메뉴 */}
      <nav className="nav">
        {userRole === 'guest' && (
          //로그인 전
          <div className="nav_Links">
            <button
              className="login_Button"
              onClick={() => {
                navigate('/login_page');
              }}
            >
              로그인
            </button>
            <button
              className="signup_Button"
              onClick={() => {
                navigate('/joinIntro');
              }}
            >
              회원가입
            </button>
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

            <button
              className="page_Button"
              onClick={() => {
                navigate('/my_page');
              }}
            >
              관리자페이지
            </button>

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

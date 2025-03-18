import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.scss';
// import logo from '../assets/9.png';

//헤더 컴포넌트 정의
function Header() {
  type UserType = 'guest' | 'user' | 'admin';
  // 기본값: "guest" = 로그인 전
  // "user" = 일반 사용자 로그인 후
  // "admin" = 관리자 로그인 후
  // 검색 입력 값 상태

  //현재 로그인 상태를 저장할 state
  const [userRole, setUserRole] = useState<UserType>('admin');
  const [searchQuery, setSearchQuery] = useState('');

  // 검색어 업데이트 함수
  const handleSearchChange = (event) => {
    // any 타입 체크
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    setUserRole('guest');
  };

  return (
    <header className={style.header}>
      {/* 로고 */}
      <div className={style.logo}>
        <Link to="/">{/* <img src={logo} alt="I log" /> */}</Link>
      </div>
      {/* 네비게이션 메뉴 */}
      <nav className={style.nav}>
        {userRole === 'guest' && (
          //로그인 전
          <div className={style.navLinks}>
            <Link to="/login">
              <button>로그인</button>
            </Link>
            <Link to="/signup">
              <button>회원가입</button>
            </Link>
          </div>
        )}
        {/* 일반 사용자 */}
        {userRole === 'user' && (
          <div className={style.navLinks}>
            {/* 검색창 */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="아티스트 검색"
            ></input>
            {/* 버튼들 */}
            <Link to="/mypage">
              <button>마이페이지</button>
            </Link>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
        {/* 관리자 */}
        {userRole === 'admin' && (
          <div className={style.navLinks}>
            {/* 검색창 */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="아티스트 검색"
            ></input>
            {/* 버튼들 */}
            <Link to="/add">일정추가</Link>
            <Link to="/admin">
              <button>관리자페이지</button>
            </Link>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
      </nav>
    </header>
  );
}
export default Header;

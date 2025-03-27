import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './common.scss';
import axios from 'axios';

import logo from '../../assets/9.png';
import searchIcon from '../../assets/search.png';
import logoutIcon from '../../assets/logout.png';

//헤더 컴포넌트 정의
function Header() {
  // userRole 상태: 로그인 상태라면 'user' 또는 'admin' 값이 들어옴, 로그인 전에는 null
  const [userRole, setUserRole] = useState<string>('guest');
  // 기본값: "guest" = 로그인 전  "user" = 일반 사용자 로그인 후 "admin" = 관리자 로그인 후
  // 검색 입력 값 상태
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); //현재 경로 확인

  //컴포넌트가 마운트되면 토큰이 있는지 확인 후 사용자 정보 api호출로 받아옴
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        // 토큰이 없으면 게스트
        setUserRole('guest');
        return;
      }
      try {
        // 실제 API 엔드포인트로 수정
        const response = await axios.get(
          'http://100.26.111.172/swagger/account/me',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        //{ isAdmin: true } 또는 { isAdmin: false } 반환
        const is_Admin = response.data.is_Admin; // 백엔드가 { is_Admin: true } 또는 { is_Admin: false } 반환

        // true면 admin, false면 user
        setUserRole(is_Admin ? 'admin' : 'user');
      } catch (error) {
        console.error('사용자 정보를 가져오지 못했습니다.', error);
        setUserRole('guest'); // 에러 발생 시 guest
      }
    };

    fetchUserInfo();
  }, []);

  //userRole 'guest'이면 해당페이지로 이동
  useEffect(() => {
    //현재 페이지가 로그인이나 회원가입이라면 게스트페이지로 옮겨지는 것을 막음
    if (
      userRole === 'guest' &&
      location.pathname !== '/login_page' &&
      location.pathname !== '/joinpage' &&
      location.pathname !== '/guest' // 무한 이동 방지
    ) {
      navigate('/guest');
    }
  }, [userRole, navigate, location.pathname]); //userRole변경될때만 실행

  // 검색어 업데이트 함수
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  //로그아웃: 토큰 삭제 후 로그인 페이지로 이동
  const handleLogout = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUserRole('guest');
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

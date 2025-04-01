import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './common.scss';
import axios from 'axios';

import logo from '../../assets/9.png';
import searchIcon from '../../assets/search.png';
import logoutIcon from '../../assets/logout.png';
import { useAuth } from '@/context/AuthContext';
import UserInstance from '@/utils/UserInstance';
import { apiConfig } from '@/utils/apiConfig';
import { getRegExp } from 'korean-regexp';

// 게스트 접근 허용 경로
const GUEST_ALLOWED_PATHS = [
  '/login_page',
  '/join_page',
  '/guest',
  '/email_redirect',
];

// 검색 드롭다운 컴포넌트
const SearchDropdown = ({ searchResults, onSearch }: any) => (
  <div className="search_dropdown">
    {searchResults.length > 0 ? (
      searchResults.slice(0, 5).map((result: any) => (
        <div key={result.id} className="dropdown_item" onClick={onSearch}>
          <div className="dropdown_text">{result.name}</div>
        </div>
      ))
    ) : (
      <div className="dropdown_no_result">검색 결과가 없습니다.</div>
    )}
    {searchResults.length > 5 && (
      <div className="dropdown_more" onClick={onSearch}>
        더보기...
      </div>
    )}
  </div>
);

// 헤더 컴포넌트
function Header() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { markLoggedOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return setUserRole('guest');

      try {
        const { data } = await UserInstance.get('/account/me/');
        setUserRole(data.is_Admin ? 'admin' : 'user');
      } catch (error) {
        console.error('사용자 정보를 가져오지 못했습니다.', error);
        setUserRole('guest');
      }
    };

    fetchUserInfo();
  }, []);

  // userRole이 "guest"면 특정 페이지로 이동
  useEffect(() => {
    if (userRole === null) return;
    const isAllowed = GUEST_ALLOWED_PATHS.some((path) =>
      location.pathname.startsWith(path),
    );
    if (userRole === 'guest' && !isAllowed) navigate('/guest');
  }, [userRole, navigate, location.pathname]);

  // 검색창 입력 이벤트
  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query.trim()) return setShowDropdown(false);

    try {
      const { data } = await axios.get(
        `/idol/groups/?name=${query}`,
        apiConfig,
      );
      setSearchResults(filterDataByKoreanQuery(data, query));
      setShowDropdown(true);
    } catch (error) {
      console.error('검색 제안 API 실패:', error);
      setSearchResults([]);
      setShowDropdown(true);
    }
  };

  // 검색 결과 필터링 (한글 입력 지원)
  const filterDataByKoreanQuery = (data: any[], query: string) =>
    query.trim()
      ? data.filter((item) => getRegExp(query).test(item.name))
      : data;

  // 검색 제출
  const handleSearchSubmit = (
    event?: React.FormEvent<HTMLFormElement> | React.KeyboardEvent,
  ) => {
    event?.preventDefault();
    if (!searchQuery.trim()) return;
    navigate('/search_page', { state: { query: searchQuery } });
    setShowDropdown(false);
  };

  // 로그아웃
  const handleLogout = async () => {
    try {
      await markLoggedOut();
      setUserRole('guest');
      navigate('/');
    } catch (error) {
      alert('로그아웃이 실패했습니다.');
    }
  };

  // 네비게이션 버튼 렌더링
  const renderNavLinks = () => {
    if (userRole === 'guest') {
      return (
        <>
          <button
            className="login_Button"
            onClick={() => navigate('/login_page')}
          >
            로그인
          </button>
          <button
            className="signup_Button"
            onClick={() => navigate('/join_page')}
          >
            회원가입
          </button>
        </>
      );
    }

    return (
      <>
        {/* 검색창 */}
        <div className="search">
          <img src={searchIcon} alt="search" className="search_Icon" />
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="아티스트 검색"
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
            />
          </form>
          {showDropdown && (
            <SearchDropdown
              searchResults={searchResults}
              onSearch={handleSearchSubmit}
            />
          )}
        </div>

        {/* 일반 사용자 버튼 */}
        {userRole === 'user' && (
          <>
            <button
              className="page_Button"
              onClick={() => navigate('/my_page')}
            >
              마이페이지
            </button>
          </>
        )}

        {/* 관리자 버튼 */}
        {userRole === 'admin' && (
          <>
            <button className="add_Button" onClick={() => navigate('/add')}>
              일정추가
            </button>
            <button
              className="page_Button"
              onClick={() => navigate('/my_page')}
            >
              관리자페이지
            </button>
          </>
        )}

        {/* 로그아웃 버튼 */}
        <button onClick={handleLogout} className="logout_Button">
          <img src={logoutIcon} alt="로그아웃" className="logout_Icon" />
        </button>
      </>
    );
  };

  return (
    <header className="header">
      {/* 로고 */}
      <div className="logo" onClick={() => navigate('/')}>
        <img src={logo} alt="I log" />
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="nav">
        <div className="nav_Links">{renderNavLinks()}</div>
      </nav>
    </header>
  );
}

export default Header;

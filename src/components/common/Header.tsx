import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './common.scss';
import axios from 'axios';

import logo from '../../assets/9.png';
import searchIcon from '../../assets/search.png';
import logoutIcon from '../../assets/logout.png';
//더미데이터
import image_file from '@assets/aespa-logo.png';

//헤더 컴포넌트 정의
function Header() {
  // userRole 상태: 로그인 상태라면 'user' 또는 'admin' 값이 들어옴, 로그인 전에는 null
  const [userRole, setUserRole] = useState<string>('guest');
  // 기본값: "guest" = 로그인 전  "user" = 일반 사용자 로그인 후 "admin" = 관리자 로그인 후
  // 검색 입력 값 상태
  const [searchQuery, setSearchQuery] = useState('');
  // 상태: 드롭다운에 표시할 검색 제안 결과 배열 any[] 타입으로 지정하여 'name' 속성 사용 가능
  const [searchResults, setSearchResults] = useState<any[]>([]);

  //더미데이터 데이터들어오면 삭제
  const dummyData = [
    { id: 1, name: '에스파', image_file: image_file },
    { id: 2, name: '에이프릴', image_file: image_file },
    { id: 3, name: '에이핑크', image_file: image_file },
    { id: 4, name: '에취', image_file: image_file },
    { id: 5, name: '에큥', image_file: image_file },
    { id: 6, name: '에헤이', image_file: image_file },
    { id: 7, name: '에이치', image_file: image_file },
    { id: 8, name: '에헤라디아', image_file: image_file },
    { id: 9, name: '에이요', image_file: image_file },
    { id: 10, name: '에베베베', image_file: image_file },
  ];

  // 드롭다운 표시 여부
  const [showDropdown, setShowDropdown] = useState(false);

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
        // 사용자의 정보를 가져오는 api호출
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
      location.pathname !== '/guest' && //무한이동방지
      //테스트 끝나면 지우기
      location.pathname !== '/my_page' &&
      location.pathname !== '/quit_page' &&
      location.pathname !== '/quit_modal' &&
      location.pathname !== '/search_page'
    ) {
      navigate('/guest');
    }
  }, [userRole, navigate, location.pathname]); //userRole변경될때만 실행

  // 검색
  //-----------------

  //검색창 입력할때마다 호출되는 함수
  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const query = event.target.value;
    setSearchQuery(query);

    //입력값이 공백이면 제안 숨김
    if (query.trim() === '') {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    // 🔽 더미 데이터 사용 (API 연결 시 제거)
    const filteredResults = dummyData.filter((item) =>
      item.name.includes(query),
    );
    setSearchResults(filteredResults);
    setShowDropdown(filteredResults.length > 0);

    //실제 api 요청
    // try {
    //   //검색어와 일치하는 제안을 가져옴
    //   const response = await axios.get(
    //     `http://100.26.111.172/idol/groups/?name=${query}`,
    //   );

    //   //검색결과 데이터를 상태에 저장
    //   setSearchResults(response.data);
    //   //결과가 있으면 드롭다운표시
    //   setShowDropdown(true);
    // } catch (error) {
    //   //api 호출실패시 에러 출력, 드롭다운에 검색결과가 없습니다. 표시
    //   console.error('검색 제안 API 실패:', error);
    //   setSearchResults([]);
    //   setShowDropdown(false);
    // }
  };

  //엔터키입력 검색결과 클릭시 검색결과페이지이동
  //이벤트 있으면 기본동작을 막음
  const handleSearchSubmit = (
    event?: React.FormEvent<HTMLFormElement> | React.KeyboardEvent,
  ) => {
    if (event) event.preventDefault();
    if (searchQuery.trim() === '') return; //검색어가 없으면 작업x
    //검색결과 페이지로 이동
    navigate(`/search_page/${searchQuery}`);
    //드롭다운 닫기
    setShowDropdown(false);
  };

  //로그아웃: 토큰 삭제 후 로그인 페이지로 이동
  const handleLogout = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUserRole('guest');
  };

  // 테스트용 버튼 클릭 시 userRole을 변경하는 함수
  const changeUserRole = (role: string) => {
    setUserRole(role);
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
          <div className="nav_Links">
            {/* 버튼들 */}
            <Link to="/login_page">
              <button className="login_Button">로그인</button>
            </Link>
            <Link to="/join_page">
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
              {/* 폼을 사용하여 엔터키 입력 시 handleSearchSubmit 호출 */}
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="아티스트 검색"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearchSubmit(e);
                  }}
                ></input>
              </form>
              {/* 검색 드롭다운 영역: 입력값 기반 실시간 검색 결과 미리보기 */}
              {showDropdown && (
                <div className="search_dropdown">
                  {/* 검색 결과가 있으면 최대 5개까지 표시 */}
                  {searchResults.length > 0 ? (
                    searchResults.slice(0, 5).map((result) => (
                      <div
                        key={result.id}
                        className="dropdown_item"
                        // 드롭다운 항목 클릭 시 검색 결과 페이지로 이동
                        onClick={() => handleSearchSubmit()}
                      >
                        <img
                          // src={result.image_file}
                          src={image_file}
                          alt={result.name}
                          className="dropdown_img"
                        />
                        <div className="dropdown_text">{result.name}</div>
                      </div>
                    ))
                  ) : (
                    // 검색 결과가 없으면 메시지 표시
                    <div className="dropdown_no_result">
                      검색 결과가 없습니다.
                    </div>
                  )}
                  {/* 검색 결과가 6건 이상이면 '더보기' 항목 표시 */}
                  {searchResults.length > 5 && (
                    <div
                      className="dropdown_more"
                      onClick={() => handleSearchSubmit()}
                    >
                      더보기...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 버튼들 */}
            <Link to="/my_page">
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
              {/* 폼을 사용하여 엔터키 입력 시 handleSearchSubmit 호출 */}
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="아티스트 검색"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearchSubmit(e);
                  }}
                ></input>
              </form>
              {/* 검색 드롭다운 영역: 입력값 기반 실시간 검색 결과 미리보기 */}
              {showDropdown && (
                <div className="search_dropdown">
                  {/* 검색 결과가 있으면 최대 5개까지 표시 */}
                  {searchResults.length > 0 ? (
                    searchResults.slice(0, 5).map((result) => (
                      <div
                        key={result.id}
                        className="dropdown_item"
                        // 드롭다운 항목 클릭 시 검색 결과 페이지로 이동
                        onClick={() => handleSearchSubmit()}
                      >
                        <img
                          // src={result.image_file}
                          src={image_file}
                          alt={result.name}
                          className="dropdown_img"
                        />
                        <div className="dropdown_text">{result.name}</div>
                      </div>
                    ))
                  ) : (
                    // 검색 결과가 없으면 메시지 표시
                    <div className="dropdown_no_result">
                      검색 결과가 없습니다.
                    </div>
                  )}
                  {/* 검색 결과가 6건 이상이면 '더보기' 항목 표시 */}
                  {searchResults.length > 5 && (
                    <div
                      className="dropdown_more"
                      onClick={() => handleSearchSubmit()}
                    >
                      더보기...
                    </div>
                  )}
                </div>
              )}
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
        {/* 테스트용 userRole 변경 버튼 */}
        <div className="role-test-buttons">
          <button onClick={() => changeUserRole('guest')}>Set to Guest</button>
          <button onClick={() => changeUserRole('user')}>Set to User</button>
          <button onClick={() => changeUserRole('admin')}>Set to Admin</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;

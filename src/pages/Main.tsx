import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <p> Main </p>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/join">회원가입 페이지</Link>
        <Link to="/loginpage">로그인 페이지</Link>
        <Link to="/mypage">마이페이지</Link>
        <Link to="/test1">
          <button>일정추가 모달 테스트 확인</button>
        </Link>
      </nav>
    </>
  );
}

export default Main;

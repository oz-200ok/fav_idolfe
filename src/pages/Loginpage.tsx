import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <>
      <p> 로그인페이지 </p>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/joinintro">회원가입 페이지</Link>
        <Link to="/loginpage">로그인 페이지</Link>
        <Link to="/mypage">마이페이지</Link>
      </nav>
    </>
  );
}

export default LoginPage;

import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <p> Main </p>
      <nav>
        <Link to="/">홈</Link>
<<<<<<< HEAD
        <Link to="/joinintro">회원가입 페이지</Link>
        <Link to="/loginpage">로그인 페이지</Link>
        <Link to="/mypage">마이페이지</Link>
=======
        <Link to="/join">회원가입 페이지</Link>
>>>>>>> develop
      </nav>
    </>
  );
}

export default Main;

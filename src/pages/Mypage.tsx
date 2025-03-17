import { Link } from 'react-router-dom';

function Mypage() {
  return (
    <>
      <p> 마이페이지 </p>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/join">회원가입 페이지</Link>
        <Link to="/loginpage">로그인 페이지</Link>
        <Link to="/mypage">마이페이지</Link>
      </nav>
    </>
  );
}

export default Mypage;

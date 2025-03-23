import { Link } from 'react-router-dom';
import Weekly from '../components/Schedule/Weekly';
import Munsley from '../components/Schedule/Munsley';
import Yearly from '../components/Schedule/Yearly';

function Main() {
  return (
    <>
      <Munsley />
      <Weekly />
      <Yearly />
      {/* <p> Main </p>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/join">회원가입 페이지</Link>
        <Link to="/loginpage">로그인 페이지</Link>
        <Link to="/mypage">마이페이지</Link>
      </nav> */}
    </>
  );
}

export default Main;

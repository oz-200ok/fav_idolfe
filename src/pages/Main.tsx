import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <p> Main </p>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/join">회원가입 페이지</Link>
      </nav>
    </>
  );
}

export default Main;

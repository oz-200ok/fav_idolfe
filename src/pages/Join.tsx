import { Link } from 'react-router-dom';

function Join() {
  return (
    <>
      <p> 회원가입 페이지 </p>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/join">회원가입 페이지</Link>
      </nav>
    </>
  );
}

export default Join;

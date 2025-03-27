import Schedule from '@/components/Schedule';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <Schedule />
      <p> Main </p>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/test1">
          <button>일정추가 모달 테스트 확인</button>
        </Link>
      </nav>
    </>
  );
}

export default Main;

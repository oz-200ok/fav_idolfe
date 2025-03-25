import { Link } from 'react-router-dom';
import Schedule from '../../components/Schedule';

function Main() {
  return (
    <>
      <Schedule />
      <Link to="/test1">
        <button>일정추가 모달 테스트 확인</button>
      </Link>
    </>
  );
}

export default Main;

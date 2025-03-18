import { useNavigate, Link } from 'react-router-dom';
import './joinIntro.scss';

function JoinIntro() {
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <Link to="/">홈</Link>
      </nav>
      <section>
        <h1> 회원가입 </h1>
        <p> 원하시는 방식을 선택해주세요!</p>
        <div className="btn_container">
          <button
            onClick={() => {
              navigate('/joinpage');
            }}
            className="join_button defaultBtn"
          >
            회원가입 하기
          </button>
          <button className="join_button googleBtn">
            google로 회원가입 하기
          </button>
          <button className="join_button navertBtn">
            Naver로 회원가입 하기
          </button>
        </div>
      </section>
    </>
  );
}

export default JoinIntro;

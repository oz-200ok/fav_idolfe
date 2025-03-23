import { useNavigate } from 'react-router-dom';
import './joinIntro.scss';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

function JoinIntro() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <form>
        <h1> 회원가입 </h1>
        <p> 원하시는 방식을 선택해주세요</p>
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
      </form>
      <Footer />
    </>
  );
}

export default JoinIntro;

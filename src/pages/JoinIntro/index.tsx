import { useNavigate } from 'react-router-dom';
import './joinIntro.scss';
import naver_logo from '../../assets/naver-logo.png';
import kakao_logo from '../../assets/kakao-logo.png';

import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

function JoinIntro() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="join_container">
        <div className="join_intro_form">
          <h1> 회원가입 </h1>
          <p> 원하시는 방식을 선택해주세요</p>
          <div className="btn_container">
            <button
              onClick={() => {
                navigate('/join_page');
              }}
              className="join_button defaultBtn"
            >
              회원가입 하기
            </button>
            <button className="join_button navertBtn">
              <img src={naver_logo} alt="네이버 로고" />
              네이버로 시작하기
            </button>
            <button className="join_button kakaoBtn">
              <img src={kakao_logo} alt="카카오로고" />
              카카오로 시작하기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default JoinIntro;

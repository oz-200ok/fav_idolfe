import './Kakaologin.scss';
import kakao_logo from '../../assets/kakao-logo.png';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const handleKakaoLogin = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;

  window.location.href = KAKAO_AUTH_URL; // ✅ 카카오 로그인 페이지로 이동
};

const KakaoLogin = () => {
  return (
    <button onClick={handleKakaoLogin} className="kakao-login-btn">
      <img src={kakao_logo} alt="카카오로고" />
      카카오 로그인
    </button>
  );
};

export default KakaoLogin;

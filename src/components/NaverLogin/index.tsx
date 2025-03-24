import './Naverlogin.scss';
import naver_logo from '../../assets/naver-logo.png';
const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;
const STATE = ((length = 8) => {
  const randomstring = Math.random().toString(16).substring(2, length);
  return randomstring;
})();

const NaverLogin = () => {
  const handleLogin = () => {
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${STATE}`;

    window.location.href = NAVER_AUTH_URL; // ✅ 네이버 로그인 페이지로 이동
  };

  return (
    <button className="naver-login-btn" onClick={handleLogin}>
      <img src={naver_logo} alt="네이버 로고" />
      네이버 로그인
    </button>
  );
};

export default NaverLogin;

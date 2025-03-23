import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoCallBack() {
  const navigate = useNavigate();

  /**
   * const url = new URL(window.location.href);
    url.searchParams.get("code"); // 👉 "abc123"
    url.pathname; // 👉 "/oauth/kakao"
    url.origin; // 👉 "https://myapp.com"
   * 
   */
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      getKakaoToken(code);
    }
  }, []);

  const getKakaoToken = async (code: string) => {
    try {
      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          client_secret: import.meta.env.VITE_KAKAO_CLIENT_SECRET,

          code: code,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );

      const kakaoAccessToken = response.data.access_token;

      sendTokenToBackend(kakaoAccessToken);

      localStorage.setItem('token', kakaoAccessToken);

      navigate('/');
    } catch (error) {
      console.log('토큰 요청 실패 ❌', error);
    }
    return <div> 로그인 처리 중입니다...</div>;
  };

  const sendTokenToBackend = async (accessToken: string) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/auth/social/kakao',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const myJwtToken = response.data.token;
      localStorage.setItem('token', myJwtToken);
    } catch (error) {
      console.log('백엔드 로그인 실패!');
    }
  };

  return <></>;
}

export default KakaoCallBack;

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
      console.log('🚀 전송하는 파라미터:');
      console.log(
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          code: code,
        }).toString(),
      );
      console.log('client_id:', import.meta.env.VITE_KAKAO_CLIENT_ID);
      console.log('redirect_uri:', import.meta.env.VITE_KAKAO_REDIRECT_URI);
      console.log('code:', code);

      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          code: code,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );

      const accessToken = response.data.access_token;

      localStorage.setItem('token', accessToken);

      navigate('/');
    } catch (error) {
      console.log('토큰 요청 실패 ❌', error);
    }
    return <div> 로그인 처리 중입니다...</div>;
  };

  return <></>;
}

export default KakaoCallBack;

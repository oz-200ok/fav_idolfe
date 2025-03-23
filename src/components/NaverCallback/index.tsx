import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NaverCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    const stateToken = new URL(window.location.href).searchParams.get('state');
    const code = new URL(window.location.href).searchParams.get('code');

    if (code && stateToken) {
      getNaverToken(code, stateToken);
    }
  }, []);

  const getNaverToken = async (code: string, stateToken: string) => {
    try {
      const response = await axios.post(
        'http://100.26.111.172/ilog/account/social-login/',
        {
          code: code,
          state: stateToken,
        },
      );

      /** CORS 정책으로 인해 프론트에서 네이버 서버에 직접 코드 발급은 불가능 함 
       // const response = await axios.post(
       //   'https://nid.naver.com/oauth2.0/token',
       //   new URLSearchParams({
       //     grant_type: 'authorization_code',
       //     client_id: import.meta.env.VITE_NAVER_CLIENT_ID,
       //     client_secret: import.meta.env.VITE_NAVER_CLIENT_SECRET,
       //     redirect_uri: import.meta.env.VITE_NAVER_REDIRECT_URI,
       //     state: stateToken,
       //     code: code,
       //   }),
       // );
       * 
       */

      /** 백엔드에서 토큰을 어떤 이름으로 주는지 확인이 필요
       *  아래 처럼 줄 수 있기 때문에...
       * {
          "access": "eyJ0eXAiOiJKV1QiLCJhbGci...",
          "refresh": "eyJ0eXAiOiJKV1QiLCJhbGci..."
        }
          
       */
      // 백엔드가 어떻게 데이터를 주는지 확인 필수!!!!!!!
      console.log(response.data);

      const myJwtToken = response.data.token;

      localStorage.setItem('token', myJwtToken);

      navigate('/');
    } catch (error) {
      console.log('토큰 요청 실패 ❌', error);
    }
    return <div> 로그인 처리 중입니다...</div>;
  };

  return <></>;
}

export default NaverCallback;

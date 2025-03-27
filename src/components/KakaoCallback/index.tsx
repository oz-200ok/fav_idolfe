import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import socialAxiosInstance from '@/utils/socialAxiosInstance';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoCallBack() {
  const navigate = useNavigate();
  const { markLoggedIn } = useAuth();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const fetchkakao = async (code: string | null) => {
      if (code) {
        await getKakaoToken(code);
      }
    };

    fetchkakao(code);
  }, []);

  const getKakaoToken = async (code: string | null) => {
    try {
      const response = await axios.post(
        'http://100.26.111.172/ilog/account/social-login/',
        {
          social_type: 'kakao',
          code: code,
        },
      );

      const { access_token, refresh_token } = response.data.data;

      markLoggedIn(access_token, refresh_token);

      const res = await socialAxiosInstance.get('/account/me/');

      console.log('잘 되나?', res);
      navigate('/');
    } catch (error) {
      console.log('토큰 요청 실패 ❌', error);
    }
  };

  return <></>;
}

export default KakaoCallBack;

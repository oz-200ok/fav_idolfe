import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@utils/axiosInstance';
import { useAuth } from '@/context/AuthContext';

function NaverCallback() {
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const fetchNaver = async (code: string | null) => {
      if (code) {
        await getNaverToken(code);
      }
    };
    fetchNaver(code);
  }, []);

  const getNaverToken = async (code: string) => {
    try {
      const response = await axios.post(
        'http://100.26.111.172/ilog/account/social-login/',
        {
          social_type: 'naver',
          code: code,
        },
      );

      const { access_token, refresh_token } = response.data.data;

      saveToken({ accessToken: access_token, refreshToken: refresh_token });

      const res = await axiosInstance.get('/account/me/');
      console.log('잘 되남', res.data);

      navigate('/');
    } catch (error) {
      console.log('토큰 요청 실패 ❌', error);
      alert('네이버 로그인 실패 😢 다시 시도해주세요!');
    }
  };

  return <></>;
}

export default NaverCallback;

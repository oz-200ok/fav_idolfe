import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@utils/axiosInstance';

function NaverCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      getNaverToken(code);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      console.log('그냥 죽여')
      const res = await axiosInstance.get('/account/me');
      console.log('잘뜨남', res.data);
    };

    fetchUser();
  }, []);

  const getNaverToken = async (code: string) => {
    try {
      const response = await axiosInstance.post('/account/social-login/', {
        social_type: 'naver',
        code: code,
      });

      const { access_token, refresh_token } = response.data.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      //navigate('/');
    } catch (error) {
      console.log('토큰 요청 실패 ❌', error);
    }
    return <div> 로그인 처리 중입니다...</div>;
  };

  return <></>;
}

export default NaverCallback;

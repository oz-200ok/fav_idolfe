import { useAuth } from '@/context/AuthContext';
import { I_SocialLoginResponse } from '@/types/login';
import UserInstance from '@/utils/UserInstance';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NaverCallback() {
  const navigate = useNavigate();
  const { markLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      const response = await UserInstance.post<I_SocialLoginResponse>(
        '/account/social-login/',
        {
          social_type: 'naver',
          code: code,
        },
      );

      const { access_token, refresh_token } = response.data.data;

      markLoggedIn(access_token, refresh_token);

      //const res = await UserInstance.get('/account/me/');

      //console.log(res);

      navigate('/');
    } catch (error) {
      alert('네이버 로그인 실패 😢 다시 시도해주세요!');
      setError('로그인 실패! 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <div>🔐 네이버 로그인 처리 중입니다...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </>
  );
}

export default NaverCallback;

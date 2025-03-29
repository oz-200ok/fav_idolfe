import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInstance from '@/utils/UserInstance';
import { I_SocialLoginResponse } from '@/types/login';

function KakaoCallBack() {
  const navigate = useNavigate();
  const { markLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      const response = await UserInstance.post<I_SocialLoginResponse>(
        '/account/social-login/',
        {
          social_type: 'kakao',
          code: code,
        },
      );

      const { access_token, refresh_token } = response.data.data;

      markLoggedIn(access_token, refresh_token);

      const res = await UserInstance.get('/account/me/');

      console.log('잘 되나?', res);
      navigate('/');
    } catch (error) {
      alert('카카오 로그인 실패 😢 다시 시도해주세요!');
      setError('로그인 실패! 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <div>🔐 카카오 로그인 처리 중입니다...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </>
  );
}

export default KakaoCallBack;

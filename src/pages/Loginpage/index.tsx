import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { I_LoginError } from './Loginpage';
import './Loginpage.scss';
import NaverLogin from '../../components/NaverLogin';
import KakaoLogin from '../../components/KakaoLogin';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { login } from '@/utils/GuestInstance';
import { useAuth } from '@/context/AuthContext';

function Loginpage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<I_LoginError | null>(null);
  const { markLoggedIn } = useAuth();

  const handlerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  type T_LoginData = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user: {
      id: number;
      email: string;
    };
  };

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 제출 동작(새로고침) 방지 회원가입 페이지에도 추가

    if (!email || !password) {
      setError({ message: '이메일과 비밀번호를 입력하세요' });
      return;
    }

    if (!validateEmail(email)) {
      setError({ message: '올바른 이메일 형식을 입력하세요' });
      return;
    }

    try {
      const res = await login({ email, password });

      const data: T_LoginData = res.data;

      markLoggedIn(data.access_token, data.refresh_token);

      setError(null); // 에러 초기화 (성공 시)
      navigate('/');
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError({ message: '이메일 또는 비밀번호가 틀렸습니다.' });
      } else {
        setError({ message: '서버 오류가 발생했습니다.' });
      }
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      <Header />
      <div className="container">
        <section>
          <div className="login_title">
            <h1>로그인</h1>
            <p>Please log in to continue</p>
          </div>
          <form onSubmit={handlerSubmit}>
            <div className="login_form">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                name="email"
                placeholder="이메일"
                autoComplete="email"
                value={email}
                onChange={handlerEmail}
              />
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="비밀번호"
                autoComplete="current-password"
                value={password}
                onChange={handlerPassword}
              />
              {error && <p>{error.message}</p>}
              <div className="login_side">
                <div className="rememberMe">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    name="rememberMe"
                    className="check_input"
                  />
                  <label htmlFor="rememberMe">아이디 저장</label>
                  <p
                    onClick={() => {
                      navigate('/idpasswordsearch');
                    }}
                  >
                    아이디 / 비밀번호 찾기
                  </p>
                </div>
              </div>
              <button type="submit">로그인</button>
            </div>
          </form>
          <div className="social_login">
            <p>다른 로그인</p>
            <NaverLogin />
            <KakaoLogin />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Loginpage;

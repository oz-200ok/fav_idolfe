import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { I_LoginForm, I_LoginError } from './Loginpage';
import './Loginpage.scss';
import NaverLogin from '../../components/NaverLogin';
import KakaoLogin from '../../components/KakaoLogin';

function Loginpage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<I_LoginForm>({
    email: '',
    password: '',
  });
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<I_LoginError | null>(null);

  const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.email || !password) {
      setError({ message: '이메일과 비밀번호를 입력하세요' });
      return;
    }

    if (!validateEmail(email.email)) {
      setError({ message: '올바른 이메일 형식을 입력하세요' });
      return;
    }

    setError(null);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
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
              value={email.email}
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
            {error && <p>{email.email}</p>}
            <div className="login_side">
              <div className="rememberMe">
                <input id="rememberMe" type="checkbox" name="rememberMe" />
                <label htmlFor="rememberMe">아이디 저장</label>
              </div>
              <p
                onClick={() => {
                  navigate('/idpasswordsearch');
                }}
              >
                아이디 / 비밀번호 찾기
              </p>
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
  );
}

export default Loginpage;

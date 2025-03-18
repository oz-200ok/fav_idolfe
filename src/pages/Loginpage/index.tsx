import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.scss';

function Loginpage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlerEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlerPassword = (e) => {
    setPassword(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault(); // 기본 제출 동작(새로고침) 방지 회원가입 페이지에도 추가

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력하세요');
      return;
    }

    if (!validateEmail(email)) {
      setError('올바른 이메일 형식을 입력하세요');
      return;
    }

    setError(''); // 에러 초기화 (성공 시)
  };

  const validateEmail = (email) => {
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
            {error && <p>{error}</p>}
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
          <button className="kakao_login">카카오톡</button>
          <button className="naver_login">네이버</button>
        </div>
      </section>
    </div>
  );
}

export default Loginpage;

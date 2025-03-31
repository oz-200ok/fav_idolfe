import axios from 'axios';
import './joinpage.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

import { DuplicateCheck } from '@/api/accountApi';
import { signup } from '@/api/accountApi';
import { useNavigate } from 'react-router-dom';

import {
  passwordStrength,
  strengthClass,
} from '@/validations/passwordValidation';

// 유효성 검사
import {
  emailValidation,
  passwordValidation,
  phoneValidation,
  nameValidation,
  usernameValidation,
} from '@/validations/validationRule';

export interface JoinFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  username: string;
  phone: string;
}

function JoinPage() {
  const [isChecked, setIsChecked] = useState({
    email: false,
    username: false,
    phone: false,
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JoinFormValues>({ mode: 'onChange' });

  const password = watch('password', '');
  const email = watch('email', '');
  const username = watch('username', '');
  const phone = watch('phone', '');

  const strengthText = passwordStrength(password);
  const strengthLevel = strengthClass(strengthText);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDuplicateCheck = async (
    type: 'email' | 'username' | 'phone',
    value: string,
  ) => {
    let label = '';

    if (type === 'email') {
      label = '이메일';
    } else if (type === 'username') {
      label = '닉네임';
    } else if (type === 'phone') {
      label = '전화번호';
    }

    if (!value) {
      alert(`${label}을 입력해주세요!`);
      return;
    }

    try {
      await DuplicateCheck(type, value);
      alert('사용 가능한 값 입니다!');

      setIsChecked((prev) => ({ ...prev, [type]: true }));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.[type]?.[0] || `이미 사용중인 ${label}입니다.`;
        alert(`❌${message}`);
      } else {
        ('알 수 없는 에러가 발생 했습니다.');
      }
      setIsChecked((prev) => ({ ...prev, [type]: false }));
    }
  };
  const onSubmit = async (data: JoinFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!isChecked.email || !isChecked.username || !isChecked.phone) {
      alert('모든 중복 확인을 완료해주세요!');
      setIsSubmitting(false);
      return;
    }

    const { passwordConfirm, ...rest } = data;

    try {
      await signup(rest);
      alert(
        '회원가입이 완료 되었습니다! 로그인을 위해 이메일 인증을 해주세요!',
      );
      navigate('/login_page');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="joinpage_container">
        <form className="join_form" onSubmit={handleSubmit(onSubmit)}>
          <h1> 회원가입 </h1>
          <div className="input-group">
            <label htmlFor="email">
              아이디
              {errors.email && (
                <p className="warning"> {errors.email.message}</p>
              )}
            </label>
            <div className="inline-group">
              <input
                className="join_input"
                id="email"
                placeholder="이메일을 입력해주세요"
                autoComplete="email"
                {...register('email', emailValidation)}
              />
              <button
                type="button"
                onClick={() => handleDuplicateCheck('email', email)}
              >
                {isChecked.email ? '확인 완료' : '중복확인'}
              </button>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">
              비밀번호
              {strengthText && (
                <p className={`password-strength ${strengthLevel}`}>
                  {strengthText}
                </p>
              )}
            </label>
            <input
              className="join_input"
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              autoComplete="new-password"
              {...register('password', passwordValidation)}
            />
            {errors.password && (
              <p className="password_warning">{errors.password.message}</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              className="join_input"
              id="passwordConfirm"
              type="password"
              placeholder="확인을 위해 비밀번호를 다시 입력해주세요"
              autoComplete="new-password"
              {...register('passwordConfirm', {
                required: '비밀번호를 다시 입력해주세요',
                validate: (value) =>
                  value === password || '비밀번호가 일치하지 않습니다',
              })}
            />
            {errors.passwordConfirm && (
              <p className="password_warning">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="name">
              이름
              {errors.name && <p className="warning">{errors.name.message}</p>}
            </label>
            <input
              className="join_input"
              id="name"
              placeholder="이름을 입력해주세요"
              {...register('name', nameValidation)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">
              닉네임
              {errors.username && (
                <p className="warning">{errors.username.message}</p>
              )}
            </label>
            <div className="inline-group">
              <input
                className="join_input"
                id="username"
                placeholder="닉네임을 입력해주세요"
                {...register('username', usernameValidation)}
              />
              <button
                type="button"
                onClick={() => handleDuplicateCheck('username', username)}
              >
                {isChecked.username ? '확인 완료' : '중복확인'}
              </button>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="phone">
              전화번호
              {errors.phone && (
                <p className="warning">{errors.phone.message}</p>
              )}
            </label>
            <div className="inline-group">
              <input
                className="join_input"
                id="phone"
                placeholder="전화번호를 입력해주세요"
                {...register('phone', phoneValidation)}
              />
              <button
                type="button"
                onClick={() => handleDuplicateCheck('phone', phone)}
              >
                {isChecked.phone ? '확인 완료' : '중복확인'}
              </button>
            </div>
          </div>

          <button className="submit-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? '처리 중...' : '회원가입 하기'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default JoinPage;

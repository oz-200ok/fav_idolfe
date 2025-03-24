import './joinpage.scss';
//import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { useDuplicateCheck } from '../../hooks/useDuplicateCheck';

function JoinPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password', '');
  const email = watch('email', '');
  const username = watch('username', '');
  const phone = watch('phone', '');

  const { DuplicateCheck } = useDuplicateCheck();

  const handleEmailCheck = () => {
    console.log('📨 이메일 값:', email);

    if (!email) {
      alert('이메일을 입력해주세요!');
      return;
    }

    DuplicateCheck('email', email); // 👉 예시: 이메일을 하드코딩해서라도 테스트!
  };

  const passwordStrength = (() => {
    if (!password) {
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[@$!%*#?&]/.test(password);
    const isLong = password.length >= 12;
    const isMedium = password.length >= 8;
    const hasThreeSpecials = (password.match(/[@$!%*#?&]/g) || []).length >= 3;
    const isSequential = /(.)\1{2,}/.test(password);

    if (isSequential) {
      return '약함(반복 문자 포함 - 강도를 더 높여주세요)';
    } else if (
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      return '약함(필수 조건 부족 - 대문자, 소문자, 숫자, 특수문자를 포함해주세요)';
    } else if (hasThreeSpecials && isLong) {
      return '강함 - 사용하기에 안전한 비밀번호 입니다';
    } else if (isMedium && hasSpecialChar && hasUpperCase) {
      return '보통 - 사용한 특수문자 외에 다른 특수 문자를 두 개 더 사용하세요';
    }

    return '';
  })();

  const strengthClass = (() => {
    if (passwordStrength?.includes('강함')) return 'strong';
    if (passwordStrength?.includes('보통')) return 'medium';
    if (passwordStrength?.includes('약함')) return 'weak';
    return '';
  })();

  const onSubmit = (data) => {
    // 로직 추가 예정
    console.log(data);
  };

  return (
    <>
      <Header />
      <div className="joinpage_container">
        <button type="button" onClick={handleEmailCheck}>
          이메일 중복 테스트
        </button>
        <form className="join_form" onSubmit={handleSubmit(onSubmit)}>
          <h1> 회원가입 </h1>
          <div className="input-group">
            <label htmlFor="email">아이디</label>
            <div className="inline-group">
              <input
                className="join_input"
                id="email"
                placeholder="이메일을 입력해주세요"
                autoComplete="email"
                {...register('email', {
                  required: true,
                  minLength: {
                    value: 10,
                    message: '이메일은 최소 10자 이상이어야 합니다',
                  },
                  maxLength: {
                    value: 30,
                    message: '이메일은 최대 30자 이하여야 합니다',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: '올바른 이메일 형식이 아닙니다',
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
              <button>중복확인</button>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">
              비밀번호
              {passwordStrength && (
                <p className={`password-strength ${strengthClass}`}>
                  {passwordStrength}
                </p>
              )}
            </label>
            <input
              className="join_input"
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              autoComplete="new-password"
              {...register('password', {
                required: '비밀번호를 입력하세요',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다',
                },
                validate: (value) => {
                  const conditions = [
                    {
                      condition: /(.)\1{2,}/.test(value),
                      message: '반복되는 문자는 사용할 수 없습니다',
                    },
                    {
                      condition: !/[A-Z]/.test(value),
                      message: '대문자를 최소 1개 포함해야 합니다',
                    },
                    {
                      condition: !/[a-z]/.test(value),
                      message: '소문자를 최소 1개 포함해야 합니다',
                    },
                    {
                      condition: !/[0-9]/.test(value),
                      message: '숫자를 최소 1개 포함해야 합니다',
                    },
                    {
                      condition: !/[@$!%*#?&]/.test(value),
                      message: '특수문자를 최소 1개 포함해야 합니다',
                    },
                  ];

                  for (const { condition, message } of conditions) {
                    if (condition) return message;
                  }
                  return true;
                },
              })}
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
            <label htmlFor="name">이름</label>
            <input
              className="join_input"
              id="name"
              placeholder="이름을 입력해주세요"
              {...register('name', {
                required: true,
                minLength: 2,
                maxLength: 10,
              })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">닉네임</label>
            <div className="inline-group">
              <input
                className="join_input"
                id="username"
                placeholder="닉네임을 입력해주세요"
                {...register('username', {
                  required: true,
                  minLength: 2,
                  maxLength: 10,
                })}
              />
              <button>중복확인</button>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="phone">
              전화번호
              {errors.phone && (
                <p className="phone_warning">{errors.phone.message}</p>
              )}
            </label>
            <div className="inline-group">
              <input
                className="join_input"
                id="phone"
                placeholder="전화번호를 입력해주세요"
                {...register('phone', {
                  required: '전화번호를 입력해주세요',
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: '전화번호는 10~11자리 숫자만 가능합니다',
                  },
                })}
              />
              <button type="button">중복확인</button>
            </div>
          </div>

          <button className="submit-btn" type="submit">
            회원가입 하기
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default JoinPage;

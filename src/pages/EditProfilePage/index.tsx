import axios from 'axios';
import './editprofilpage.scss';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { T_EditProfile } from './EditProfilePage';
import { DuplicateCheck } from '@/api/accountApi';
import { updateProfile } from '@/api/accountApi';
import { useNavigate } from 'react-router-dom';

import {
  passwordStrength,
  strengthClass,
} from '@/validations/passwordValidation';

// 유효성 검사
import {
  passwordValidation,
  phoneValidation,
  usernameValidation,
} from '@/validations/validationRule';
import UserInstance from '@/utils/UserInstance';

export interface JoinFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  username: string;
  phone: string;
}

function EditProfilePage() {
  const [isChecked, setIsChecked] = useState({
    username: false,
    phone: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JoinFormValues>({ mode: 'onChange' });

  const password = watch('password', '');
  const username = watch('username', '');
  const phone = watch('phone', '');

  const strengthText = passwordStrength(password);
  const strengthLevel = strengthClass(strengthText);

  //const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<T_EditProfile | null>(null);

  useEffect(() => {
    const GetUserInfo = async () => {
      try {
        const response = await UserInstance.get('/account/me/');
        const userState = response.data.data;

        setUserInfo(userState);
      } catch (error) {
        console.log(error);
      }
    };
    GetUserInfo();
  }, []);

  const handleDuplicateCheck = async (
    type: 'username' | 'phone',
    value: string,
  ) => {
    let label = '';
    if (type === 'username') {
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
    if (!isChecked.username || !isChecked.phone) {
      alert('모든 중복 확인을 완료해주세요!');
      return;
    }

    const { passwordConfirm, ...rest } = data;

    try {
      await updateProfile(rest);
      alert('회원 정보가 수정 되었습니다.');
    } catch (err) {
      console.error(err);
    }
  };

  if (!userInfo) return null;

  return (
    <>
      <div className="joinpage_container">
        <form className="join_form" onSubmit={handleSubmit(onSubmit)}>
          <h1> 회원 정보 수정 </h1>
          <div className="input-group">
            <label htmlFor="email">아이디</label>
            <div className="inline-group">
              <input
                className="join_input"
                id="email"
                autoComplete="off"
                disabled
              />
              <p className="user_info_view">{userInfo.email}</p>
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
            <label htmlFor="name">이름</label>
            <div className="inline-group">
              <input className="join_input" id="name" disabled />
              <p className="user_info_view">{userInfo.name}</p>
            </div>
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

          <button className="submit-btn" type="submit">
            정보 수정하기
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProfilePage;

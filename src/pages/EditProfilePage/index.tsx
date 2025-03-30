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
} from '@/validations/editUserInfoValidation';
import UserInstance from '@/utils/UserInstance';

export interface EditInfoValues {
  password: string;
  currentPassword: string;
  username: string;
  phone: string;
}

function EditProfilePage() {
  const [isChecked, setIsChecked] = useState({
    username: false,
    phone: false,
  });

  interface UpdateProfileRequest {
    password?: string;
    current_password?: string;
    username?: string;
    phone?: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditInfoValues>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      phone: '',
      password: '',
      currentPassword: '',
    },
  });

  const password = watch('password', '');
  const username = watch('username', '');
  const phone = watch('phone', '');
  const currentPassword = watch('currentPassword');

  const strengthText = passwordStrength(password);
  const strengthLevel = strengthClass(strengthText);

  const navigate = useNavigate();

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

  console.log('🤨이게 계속 실행 되나?', userInfo);
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

  const onSubmit = async (data: EditInfoValues) => {
    console.log('❌', data);
    // 값이 입력된 경우에만 중복 확인이 필요함
    if ((username && !isChecked.username) || (phone && !isChecked.phone)) {
      alert('입력한 항목에 대한 중복 확인을 완료해주세요!');
      return;
    }

    // 비밀 번호 변경을 시도할 경우
    if (data.password && !data.currentPassword) {
      alert('비밀번호를 변경하려면 이전 비밀번호를 입력해주세요!');
      return;
    }

    const updateData: UpdateProfileRequest = {};

    if (username.trim()) updateData.username = username.trim();
    if (phone.trim()) updateData.phone = phone.trim();
    if (data.password) {
      updateData.password = data.password;
      updateData.current_password = currentPassword;
    }

    try {
      console.log('❌');
      await updateProfile(updateData);
      alert('회원 정보가 수정 되었습니다.');

      navigate('/my_page');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.detail ||
          '이전 비밀번호를 잘못 입력하셨습니다! 다시 입력해주세요!';
        alert(`❌ ${message}`);
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
      }
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
            <label htmlFor="currentPassword">이전 비밀번호</label>
            <input
              className="join_input"
              id="currentPassword"
              type="password"
              placeholder="이전 비밀번호를 입력해주세요"
              autoComplete="currentPassword"
              {...register('currentPassword')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">
              새로운 비밀번호
              {password && strengthText && (
                <p className={`password-strength ${strengthLevel}`}>
                  {strengthText}
                </p>
              )}
            </label>
            <input
              className="join_input"
              id="password"
              type="password"
              placeholder="새로운 비밀번호를 입력해주세요"
              autoComplete="password"
              {...register('password', passwordValidation)}
            />
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
            <label htmlFor="phone">전화번호</label>
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

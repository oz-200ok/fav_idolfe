import axios from 'axios';
import { apiConfig } from '../utils/apiConfig';

const GuestInstance = axios.create(apiConfig);

export const DuplicateCheck = async (
  type: 'email' | 'username' | 'phone',
  value: string,
) => {
  console.log('🔍 중복 확인 요청:', type, value);
  //파라미터로 변경 필요
  // 토큰 없는 부분은 인스턴스 쓸 필요 없음
  const response = await GuestInstance.get('/account/check-duplicate/', {
    params: { type, value },
  });

  console.log('📩 응답 받음:', response.data);

  return response;
};

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  username: string;
  phone: string;
}

export const signup = (data: SignupRequest) => {
  console.log('백엔드로 넘어가는', data);
  return GuestInstance.post('/account/register/', data);
};

export const updateProfile = (data: SignupRequest) => {
  console.log('백엔드로 넘어가는', data);
  return GuestInstance.post('/account/register/', data);
};

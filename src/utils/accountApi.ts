import axios from 'axios';
import instance from './axiosInstance';

export const DuplicateCheck = async (
  type: 'email' | 'username' | 'phone',
  value: string,
) => {
  console.log('🔍 중복 확인 요청:', type, value);
  const response = await axiosInstance.get('/account/check-duplicate/', {
    params: { [type]: value },
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
  return instance.post('/account/register/', data);
};

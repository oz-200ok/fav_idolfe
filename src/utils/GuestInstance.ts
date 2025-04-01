import axios from 'axios';
import { apiConfig } from './apiConfig';

// 로그인 안 된 사용자들을 위한 인스턴스
// 로그인 하기 전 - access_token이 없는 상태에서 서버에 요청을 보낼 때 사용하는 전용 인스턴스

const GuestInstance = axios.create(apiConfig);

export interface I_LoginRequest {
  email: string;
  password: string;
}

// 로그인 할 때 함수 로직
export const login = async ({ email, password }: I_LoginRequest) => {
  const response = await GuestInstance.post('/account/login/', {
    email,
    password,
  });
  return response.data;
};

export default GuestInstance;

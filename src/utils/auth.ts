import api from './axios';

export interface I_LoginRequest {
  email: string;
  password: string;
}

export const login = async ({ email, password }: I_LoginRequest) => {
  const response = await api.post('/account/login/', {
    email,
    password,
  });
  return response.data;
};

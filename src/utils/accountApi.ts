import axios from 'axios';
import instance from './axiosInstance';

export const DuplicateCheck = async (
  type: 'email' | 'username' | 'phone',
  value: string,
) => {
  return await axios.get('/account/check-duplicate/', {
    params: { [type]: value },
  });
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

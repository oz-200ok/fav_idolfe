import axios from 'axios';

export const checkEmailDuplicate = async (email: string) => {
  return axios.get('/account/check-duplicate/', { params: { email } });
};

export const checkNicknameDuplicate = async (username: string) => {
  return axios.get('/account/check-duplicate/', { params: { username } });
};

export const checkPhoneDuplicate = async (phone: string) => {
  return axios.get('/account/check-duplicate/', { params: { phone } });
};

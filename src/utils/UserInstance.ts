import axios from 'axios';
import { apiConfig } from './apiConfig';

//access_token이 이미 존재할 때 → 외부 API에 인증 요청을 보낼 때 사용하는 인스턴스
//access_token을 꺼내와서, 요청 보낼 때 Authorization 헤더에 붙여주는 역할

const UserInstance = axios.create(apiConfig);

UserInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🛰️ 요청에 토큰 붙임:', config.headers.Authorization); // ✅ 요거!
  }
  return config;
});


// 응답 인터셉터 (401 에러 시 재시도 등 으로 나눔)
UserInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      //originalRequest 에 retry를 붙이는 이유는 이 요청은 한 번 했으니 더는 하지 말라는 의미로 붙여놓음
      originalRequest._retry = true;
      // 여기에 refresh_token 재발급 로직 넣어야함
    }
    return Promise.reject(error);
  },
);

export default UserInstance;

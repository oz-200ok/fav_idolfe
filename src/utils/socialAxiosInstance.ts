import axios from 'axios';

const socialAxiosInstance = axios.create({
  //SocialAxiosInstance.get('/users') 를 쓰면 자동으로 아래 URL 로 넘어감
  baseURL: 'http://100.26.111.172/ilog',
  headers: {
    'Content-Type': 'application/json',
  },
});

//config - axios 내부에서 만들어서 인터셉터 함수로 넘겨주는 것.
//request - 요청 인터셉터
socialAxiosInstance.interceptors.request.use((config) => {
  console.log('🛰️ 요청 인터셉터 작동!');
  console.log('요청 URL:', config.url);

  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🛰️ 요청에 토큰 붙임:', config.headers.Authorization); // ✅ 요거!
  }
  return config;
});

//response - 응답 인터셉터
// axios.interceptors.response.use(success, error) 형식으로 나뉨
// success()

socialAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      //originalRequest 에 retry를 붙이는 이유는 이 요청은 한 번 했으니 더는 하지 말라는 의미로 붙여놓음
      originalRequest._retry = true;
    }
  },
);

export default socialAxiosInstance;

import axios from 'axios';

const instance = axios.create({
  //axiosInstance.get('/users') 를 쓰면 자동으로 아래 URL 로 넘어감
  baseURL: 'https://ilog.giize.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

//config - axios 내부에서 만들어서 인터셉터 함수로 넘겨주는 것.
//request - 요청 인터셉터
instance.interceptors.request.use((config) => {
  console.log('💡 인터셉터 config:', config);
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//response - 응답 인터셉터
// axios.interceptors.response.use(success, error) 형식으로 나뉨
// success()

instance.interceptors.response.use(
  (respones) => respones,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      //originalRequest 에 retry를 붙이는 이유는 이 요청은 한 번 했으니 더는 하지 말라는 의미로 붙여놓음
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        console.warn('⚠️ access_token 만료됨. refresh_token 재발급 로직 필요');

        return Promise.reject(error);
      }
    }
  },
);

export default instance;

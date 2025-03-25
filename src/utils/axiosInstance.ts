import axios from 'axios';

const instance = axios.create({
  //axiosInstance.get('/users') 를 쓰면 자동으로 아래 URL 로 넘어감
  baseURL: 'http://100.26.111.172/ilog',
  headers: {
    'Content-Type': 'application/json',
  },
});

//config - axios 내부에서 만들어서 인터셉터 함수로 넘겨주는 것.

instance.interceptors.request.use((config) => {
  console.log('💡 인터셉터 config:', config); 
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;

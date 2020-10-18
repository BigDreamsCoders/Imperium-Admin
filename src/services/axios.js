import axios from 'axios';
import constants from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 3000,
});

const authentication = () => {
  const token = localStorage.getItem(constants.TOKEN);
  return `Bearer ${token}`;
};

const requestInterceptor = () => {
  return axiosInstance.interceptors.request.use((request) => {
    request.headers.Authorization = authentication();
    return request;
  });
};

const responseInterceptor = (history, location) => {
  return axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { code } = error;
      if (!navigator.onLine) {
        history.push('/error', { conn: true, prevLocation: location.pathname });
        return Promise.reject(error);
      }
      switch (code) {
        case 'ECONNABORTED':
          history.push('/error', {
            timeout: true,
            prevLocation: location.pathname,
          });
          return Promise.reject(error);
        default:
          return Promise.reject(error);
      }
    }
  );
};

export const setUpAxiosInterceptors = (history, location) => {
  requestInterceptor();
  responseInterceptor(history, location);
};

export const releaseAxiosInterceptors = () => {
  axiosInstance.interceptors.request.eject(requestInterceptor());
  axiosInstance.interceptors.response.eject(responseInterceptor());
};

export default axiosInstance;

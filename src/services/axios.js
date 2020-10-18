import axios from 'axios';
import constants from '../utils/constants';

export const authentication = () => {
  const token = localStorage.getItem(constants.TOKEN);
  return `Bearer ${token}`;
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 3000,
  headers: {
    Authorization: authentication(),
  },
});

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
  responseInterceptor(history, location);
};

export const releaseAxiosInterceptors = () => {
  axiosInstance.interceptors.response.eject(responseInterceptor());
};

export default axiosInstance;

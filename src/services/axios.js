import axios from 'axios';
import constants from '../utils/constants';

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const authentication = () => {
  const token = localStorage.getItem(constants.TOKEN);
  return { Authorization: `Bearer ${token}` };
};

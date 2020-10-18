import constants from '../utils/constants';

export const logoutStorage = () => {
  localStorage.removeItem(constants.TOKEN);
  localStorage.removeItem(constants.EMAIL);
};

export const loginStorage = ({ token, email }) => {
  localStorage.setItem(constants.TOKEN, token);
  localStorage.setItem(constants.EMAIL, email);
};

import constants from '../utils/constants';

export const logout = () => {
  localStorage.removeItem(constants.TOKEN);
  localStorage.removeItem(constants.EMAIL);
};

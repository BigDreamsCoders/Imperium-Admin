import constants from './../utils/constants';
import axios, { authentication } from './axios';

export const login = async ({ email, password }) => {
  const { data } = await axios.post('auth/admin/login', { email, password });
  localStorage.setItem(constants.TOKEN, data.token);
  localStorage.setItem(constants.EMAIL, data.email);
};

export const getUsers = async (page, limit) => {
  const conf =
    page !== undefined && limit ? `?page=${page}&limit=${limit}` : '';
  const { data } = await axios.get(`users${conf}`, {
    headers: authentication(),
  });
  return {
    count: data.count,
    data: data.data.map((e) => ({
      ...e,
      key: e.id,
      fullName: `${e.firstName} ${e.lastName}`,
    })),
  };
};

export const me = async () => {
  await axios.get('users', { headers: authentication() });
};

export const roles = async () => {
  const { data } = await axios.get('role', { headers: authentication() });
  return data.map((role) => ({
    id: role.id,
    name: role.name,
  }));
};

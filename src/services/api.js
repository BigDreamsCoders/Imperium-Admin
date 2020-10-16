import constants from './../utils/constants';
import axios from './axios';

export const login = async ({ email, password }) => {
  const { data } = await axios.post('auth/admin/login', { email, password });
  localStorage.setItem(constants.TOKEN, data.token);
  localStorage.setItem(constants.EMAIL, data.email);
};

export const getUsers = async (page, limit) => {
  const conf =
    page !== undefined && limit ? `?page=${page}&limit=${limit}` : '';
  const { data } = await axios.get(`users${conf}`);
  return {
    count: data.count,
    data: data.data.map((e) => ({
      ...e,
      key: e.id,
      fullName: `${e.firstName} ${e.lastName}`,
    })),
  };
};

export const getOneUser = async (id) => {
  const { data } = await axios.get(`users/${id}`);
  return data;
};

export const me = async () => {
  await axios.get('users');
};

export const updatePassword = async (data) => {
  await axios.patch('users/password', data);
};

export const deleteUser = async (id) => {
  await axios.delete(`users/${id}`);
};

export const createUser = async (data) => {
  await axios.post('users', data);
};

export const roles = async () => {
  const { data } = await axios.get('role');
  return data.map((role) => ({
    id: role.id,
    name: role.name,
  }));
};

export const gender = async () => {
  const { data } = await axios.get('users/gender');
  return data.map((gender) => ({
    id: gender.id,
    name: gender.name,
  }));
};

export const membershipsType = async () => {
  const { data } = await axios.get('membership/type');
  return data.map((membershipType) => ({
    id: membershipType.id,
    name: membershipType.name,
  }));
};

export const membershipsState = async () => {
  const { data } = await axios.get('membership/state');
  return data.map((membershipState) => ({
    id: membershipState.id,
    name: membershipState.name,
  }));
};

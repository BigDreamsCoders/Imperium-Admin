import constants from './../utils/constants';
import axiosInstance, { authentication } from './axios';
import { loginStorage } from './localstorage';

export const login = async ({ email, password }) => {
  const { data } = await axiosInstance.post('auth/admin/login', {
    email,
    password,
  });
  loginStorage(data);
};

export const getUsers = async (page, limit, source) => {
  const conf =
    page !== undefined && limit ? `?page=${page}&limit=${limit}` : '';
  const { data } = await axiosInstance.get(`users${conf}`);
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
  const { data } = await axiosInstance.get(`users/${id}`);
  return data;
};

export const me = async () => {
  await axiosInstance.get('users');
};

export const updatePassword = async (data) => {
  await axiosInstance.patch('users/password', data);
};

export const deleteUser = async (id) => {
  await axiosInstance.delete(`users/${id}`);
};

export const createUser = async (data) => {
  await axiosInstance.post('users', data);
};

export const roles = async () => {
  const { data } = await axiosInstance.get('role');
  return data.map((role) => ({
    id: role.id,
    name: role.name,
  }));
};

export const gender = async () => {
  const { data } = await axiosInstance.get('users/gender');
  return data.map((gender) => ({
    id: gender.id,
    name: gender.name,
  }));
};

export const membershipsType = async () => {
  const { data } = await axiosInstance.get('membership/type');
  return data.map((membershipType) => ({
    id: membershipType.id,
    name: membershipType.name,
  }));
};

export const membershipsState = async () => {
  const { data } = await axiosInstance.get('membership/state');
  return data.map((membershipState) => ({
    id: membershipState.id,
    name: membershipState.name,
  }));
};

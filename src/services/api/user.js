import axiosInstance from '../axios';
import { loginStorage } from '../localstorage';

export const login = async ({ email, password }) => {
  const { data } = await axiosInstance.post('auth/admin/login', {
    email,
    password,
  });
  loginStorage(data);
};

export const getUsers = async (page, limit) => {
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

export const updateUserBasicInfor = async (id, data) => {
  await axiosInstance.patch(`users/${id}`, data);
};

export const updateFile = async (id, data) => {
  await axiosInstance.put(`users/file/${id}`, data);
};

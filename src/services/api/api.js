import axiosInstance from '../axios';
//import { loginStorage } from '../localstorage';

export const privileges = async () => {
  const { data } = await axiosInstance.get('role/privileges');
  return data;
};

export const roles = async (page, limit, id) => {
  const conf =
    page !== undefined && limit ? `?page=${page}&limit=${limit}` : '';
  const confId = id !== undefined ? `/${id}` : '';
  const { data } = await axiosInstance.get(`role${confId}${conf}`);
  if (data.length)
    return data.map((role) => ({
      id: role.id,
      name: role.name,
      privilege: role.privilege,
    }));
  return {
    name: data.name,
    privilege: data.privilege,
  };
};

export const createRole = async (data) => {
  return await axiosInstance.post('role', data);
};

export const updateRole = async (id, data) => {
  return await axiosInstance.put(`role/${id}`, data);
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

export const updateMemebershipType = async (id, type) => {
  await axiosInstance.put(`membership/type/${id}`, { type });
};

export const updateMemebershipState = async (id, state) => {
  await axiosInstance.put(`membership/state/${id}`, { state });
};

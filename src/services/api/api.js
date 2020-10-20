import axiosInstance from '../axios';
//import { loginStorage } from '../localstorage';

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

export const updateMemebershipType = async (id, type) => {
  await axiosInstance.put(`membership/type/${id}`, { type });
};

export const updateMemebershipState = async (id, state) => {
  await axiosInstance.put(`membership/state/${id}`, { state });
};

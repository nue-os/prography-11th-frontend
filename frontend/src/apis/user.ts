import admin from '.';
import { GetUsersParams, UserForm, UserModifyForm } from '../types/admin';

export const getUsers = async (params: GetUsersParams) => {
  const response = await admin.get('/members', {
    params,
  });
  return response.data;
};

export const postUser = async (data: UserForm) => {
  const response = await admin.post('/members', data);
  return response.data;
};

export const putUser = async (id: number, data: UserModifyForm) => {
  const response = await admin.put(`/members/${id}`, data);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await admin.get(`/members/${id}`);
  return response.data;
};

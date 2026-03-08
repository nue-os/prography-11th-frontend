import admin from '.';
import { GetUsersParams, UserForm } from '../types/admin';

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

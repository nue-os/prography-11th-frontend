import admin from '.';
import { GetUsersParams } from '../types/admin';

export const getUsers = async (params: GetUsersParams) => {
  const response = await admin.get('/members', {
    params,
  });
  return response.data;
};

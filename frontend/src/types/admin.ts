import z from 'zod';
import { userFormSchema } from '../utils/validation';

export interface User {
  userId: number;
  name: string;
  position: string;
  team: string;
  attendanceCount: number;
  status: '정상' | '탈퇴';
}

export type UserForm = z.infer<typeof userFormSchema>;

export interface Attendance {
  userName: string;
  team: string;
  date: string;
  status: '출석' | '결석';
}

import z from 'zod';
import { userFormSchema, userModifySchema } from '../utils/validation';

export interface GetUsersParams {
  page?: number;
  size?: number;
  searchType?: 'name' | 'loginId' | 'phone';
  searchValue?: string;
  generation?: number;
  partName?: string;
  teamName?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'WITHDRAWN';
}

export interface User {
  id: number;
  loginId: number;
  name: string;
  role: string;
  partName: string;
  teamName: string;
  status: 'ACTIVE' | 'INACTIVE' | 'WITHDRAWN';
}

export type UserForm = z.infer<typeof userFormSchema>;
export type UserModifyForm = z.infer<typeof userModifySchema>;

export interface Attendance {
  userName: string;
  team: string;
  date: string;
  status: '출석' | '결석';
}

export type AttendanceStatus = 'PRESENT' | 'LATE' | 'ABSENT' | 'EXCUSED';

export interface AttendanceDetail {
  id: number;
  sessionId: number;
  memberId: number;
  status: AttendanceStatus;
  lateMinutes: number | null;
  penaltyAmount: number;
  reason: string | null;
  checkedInAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserAttendance {
  memberId: number;
  memberName: string;
  generation: number;
  partName: string;
  teamName: string;
  deposit: number;
  excuseCount: number;
  attendances: AttendanceDetail[];
}

export interface UserAttendanceResponse {
  data: UserAttendance;
}

export interface AttendacneForm {
  sessionId: number;
  memberId: number;
  status: AttendanceStatus;
  lateMinutes: number | null;
  reason: string | null;
}

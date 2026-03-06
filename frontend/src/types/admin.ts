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

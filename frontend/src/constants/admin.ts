import { Attendance, User } from '../types/admin';

export const adminSidebarMenu = [
  { label: '회원 관리', path: '/admin/users' },
  { label: '출결 관리', path: '/admin/attendance' },
  { label: '세션 관리', path: '/admin/sessions' },
];

export const userColumns: { key: keyof User; label: string }[] = [
  { key: 'userId', label: '회원 ID' },
  { key: 'name', label: '이름' },
  { key: 'position', label: '포지션' },
  { key: 'team', label: '소속 팀' },
  { key: 'attendanceCount', label: '누적 출석 횟수' },
  { key: 'status', label: '상태' },
];

export const attendanceColumns: { key: keyof Attendance; label: string }[] = [
  { key: 'userName', label: '사용자 명' },
  { key: 'team', label: '팀 명' },
  { key: 'status', label: '출석 여부' },
  { key: 'date', label: '날짜' },
];

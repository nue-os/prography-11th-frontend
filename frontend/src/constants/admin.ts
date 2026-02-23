import { User } from '../types/admin';

export const userColumns: { key: keyof User; label: string }[] = [
  { key: 'userId', label: '회원 ID' },
  { key: 'name', label: '이름' },
  { key: 'position', label: '포지션' },
  { key: 'team', label: '소속 팀' },
  { key: 'attendanceCount', label: '누적 출석 횟수' },
  { key: 'status', label: '상태' },
];

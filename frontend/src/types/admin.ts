export interface User {
  userId: number;
  name: string;
  position: string;
  team: string;
  attendanceCount: number;
  status: '정상' | '탈퇴';
}

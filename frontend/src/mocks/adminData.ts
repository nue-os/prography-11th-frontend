export const userHistoryData = Array.from({ length: 150 }, (_, index) => ({
  userId: index + 1,
  name: `이름${index + 1}`,
  status: ['정상', '탈퇴'][index % 2],
  attendanceCount: Math.floor(Math.random() * 100), // 누적 출석 횟수
  team: ['프론트엔드', '백엔드', '디자인'][index % 3],
  position: ['팀원', '팀장'][index % 2],
}));

export const attendanceMock = Array.from({ length: 150 }, (_, index) => {
  const userId = (index % 30) + 1;
  const day = (index % 28) + 1;

  return {
    userId,
    userName: `유저${userId}`,
    team: ['프론트엔드', '백엔드', '디자인'][userId % 3],
    date: `2026-02-${String(day).padStart(2, '0')}`,
    status: ['출석', '결석'][index % 2],
  };
});

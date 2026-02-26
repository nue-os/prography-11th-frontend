import InfoTable from '../components/InfoTable';
import { mockUserAttendance } from '../mocks/attendanceData';
import { AttendanceDetail as AttendanceDetailType } from '../types/admin';

const AttendanceDetail = () => {
  const userInfoRows = [
    {
      items: [
        { label: '이름', value: mockUserAttendance.data.memberName },
        { label: '기수', value: `${mockUserAttendance.data.generation}기` },
      ],
    },
    {
      items: [
        { label: 'ID', value: mockUserAttendance.data.memberId },
        { label: '파트', value: mockUserAttendance.data.partName },
      ],
    },
    {
      items: [{ label: '참여팀', value: mockUserAttendance.data.teamName }],
    },
  ];

  const penaltyRows = [
    {
      items: [
        {
          label: '이번주 지각비',
          value: `${mockUserAttendance.data.deposit.toLocaleString()}원`,
        },
      ],
    },
    {
      items: [
        {
          label: '누적 지각비',
          value: `${mockUserAttendance.data.deposit.toLocaleString()}원`,
        },
      ],
    },
    {
      items: [
        {
          label: '잔여 보증금',
          value: `${mockUserAttendance.data.deposit.toLocaleString()}원`,
        },
      ],
    },
  ];

  const attendanceRows = (a: AttendanceDetailType) => [
    {
      items: [
        { label: '세션', value: `${a.sessionId}회차` },
        {
          label: '날짜',
          value: new Date(a.createdAt).toLocaleDateString(),
        },
      ],
    },
    {
      items: [
        {
          label: '출결 현황',
          value:
            a.status === 'LATE'
              ? `지각 (${a.lateMinutes}분)`
              : a.status === 'EXCUSED'
                ? '결석(사유 인정)'
                : '출석',
        },
        {
          label: '사유',
          value: a.reason ?? '-',
        },
      ],
    },
  ];

  return (
    <main className="space-y-2 m-4">
      {/* 제목 */}
      <h1 className="text-2xl font-medium">{`출결 관리 > 출결 내역 상세`}</h1>
      <hr />

      {/* 회원 정보 */}
      <section className="flex flex-col gap-2 mt-5">
        <h2>회원 정보</h2>
        <InfoTable rows={userInfoRows} />
      </section>

      {/* 발급 현황 */}
      <section className="flex flex-col gap-2 mt-5">
        <h2>발급 현황</h2>
        <InfoTable rows={penaltyRows} />
      </section>

      {/* 출결 정보 */}
      <section className="flex flex-col gap-2 mt-5">
        <h2>출결 정보</h2>
        {mockUserAttendance.data.attendances.map((a) => (
          <InfoTable key={a.id} rows={attendanceRows(a)} />
        ))}
      </section>
    </main>
  );
};

export default AttendanceDetail;

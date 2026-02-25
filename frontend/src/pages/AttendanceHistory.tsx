import { useNavigate, useSearchParams } from 'react-router-dom';
import Table from '../components/Table';
import { attendanceColumns } from '../constants/admin';
import Pagination from '../components/Pagination';
import { attendanceMock } from '../mocks/adminData';

const AttendanceHistory = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
  const itemsPerPage = 10;

  const totalElements = attendanceMock.length;
  const totalPages = Math.ceil(totalElements / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const attendanceData = attendanceMock.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return (
    <main className="space-y-2 m-4">
      {/* 제목 */}
      <h1 className="text-2xl font-medium">출결 관리</h1>
      <hr />

      {/* 검색 */}

      {/* 테이블 */}
      <section className="space-y-7">
        <div className="absolute -top-5 right-0 -translate-y-full font-medium">
          전체 <span className="text-pri-400">{123}</span>
        </div>
        <Table
          columns={attendanceColumns}
          data={attendanceData}
          renderCell={(key, row) => {
            if (key === 'status') {
              const status = row[key] as string | undefined;
              return status ? (
                <span
                  className={
                    status === '출석' ? 'text-green-600' : 'text-red-500'
                  }
                >
                  {status}
                </span>
              ) : (
                '-'
              );
            }
            return String(row[key]);
          }}
          onRowClick={() => navigate(`/admin/attendance/${1}`)}
        />
      </section>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default AttendanceHistory;

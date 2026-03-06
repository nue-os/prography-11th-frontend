import { useNavigate, useSearchParams } from 'react-router-dom';
import Table from '../components/Table';
import { attendanceColumns } from '../constants/admin';
import Pagination from '../components/Pagination';
import { attendanceMock } from '../mocks/adminData';
import { useState } from 'react';
import Modal from '../components/Modal';
import AttendanceRegister from './AttendanceRegister';

const AttendanceHistory = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

      <div className="flex justify-end my-5">
        <button
          className="bg-gray-500 rounded-sm text-white p-2 border-none hover:bg-gray-400"
          onClick={() => setIsModalOpen(true)}
        >
          추가
        </button>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AttendanceRegister onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}

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

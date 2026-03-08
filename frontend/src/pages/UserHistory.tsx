import { useState } from 'react';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import { userColumns } from '../constants/admin';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../components/Modal';
import UserRegister from './UserRegister';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../apis/user';

const UserHistory = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', currentPage],
    queryFn: () => getUsers({ page: currentPage - 1 }),
  });

  if (isLoading) return <div>데이터를 불러오는 중입니다...</div>;
  if (isError || !data?.data) return <div>데이터를 불러오지 못했습니다.</div>;

  const { totalPages, content: usersData } = data.data;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return (
    <main className="space-y-2 m-4">
      {/* 제목 */}
      <h1 className="text-2xl font-medium">회원관리</h1>
      <hr />

      {/* 검색 */}

      {/* 테이블 */}
      <section className="space-y-7 my-5">
        <div className="absolute -top-5 right-0 -translate-y-full font-medium">
          전체 <span className="text-pri-400">{123}</span>
        </div>
        <Table
          columns={userColumns}
          data={usersData}
          renderCell={(key, row) => {
            if (key === 'status') {
              const status = row[key] as string | undefined;
              return status ? (
                <span
                  className={
                    status === 'ACTIVE' ? 'text-green-600' : 'text-red-500'
                  }
                >
                  {status === 'ACTIVE'
                    ? '활동'
                    : status === 'INACTIVE'
                      ? '미활동'
                      : '탈퇴'}
                </span>
              ) : (
                '-'
              );
            }
            return String(row[key]);
          }}
          onRowClick={(row) => navigate(`/admin/users/${row.id}`)}
        />
      </section>

      <div className="flex justify-end">
        <button
          className="bg-gray-500 rounded-sm text-white p-2 border-none hover:bg-gray-400"
          onClick={() => setIsModalOpen(true)}
        >
          추가
        </button>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <UserRegister onClose={() => setIsModalOpen(false)} />
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

export default UserHistory;

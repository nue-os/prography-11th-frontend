import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import { UserModifyForm } from '../types/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { userModifySchema } from '../utils/validation';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserById, putUser } from '../apis/user';
import { useEffect } from 'react';

const UserModify = () => {
  const { id } = useParams();

  const { control, handleSubmit, reset } = useForm<UserModifyForm>({
    resolver: zodResolver(userModifySchema),
    mode: 'onSubmit',
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    const fetchedData = {
      loginId: data?.data.loginId ?? '',
      name: data?.data.name ?? '',
      phone: data?.data.phone ?? '',
      partId: 1,
      teamId: data?.data.teamName
        ? Number(data.data.teamName.replace(/\D/g, ''))
        : undefined,
      cohortId: data?.data.generation ?? undefined,
      createdAt: data?.data.createdAt ?? '',
    };

    reset(fetchedData);
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserModifyForm }) =>
      putUser(id, data),
    onSuccess: () => {
      alert('회원 정보가 수정되었습니다.');
    },
    onError: () => {
      alert('회원 수정에 실패했습니다.');
    },
  });

  if (isLoading) return <div>데이터 불러오는 중 중...</div>;
  if (isError) return <div>데이터를 불러오는 중 문제가 발생했습니다.</div>;

  const onSubmit = (data: UserModifyForm) => {
    mutation.mutate({ id: Number(id), data });
  };

  return (
    <main className="space-y-2 m-4">
      {/* 제목 */}
      <h1 className="text-2xl font-medium">{`회원관리 > 회원상세`}</h1>
      <hr />

      {/* 수정 폼 */}

      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log('errors', errors);
        })}
        className="space-y-3 my-5"
      >
        <Input
          name="name"
          id="name"
          label="이름"
          control={control}
          readonly={true}
        />
        <Input
          name="cohortId"
          id="cohortId"
          label="기수"
          type="number"
          control={control}
        />
        <Input
          name="partId"
          id="partId"
          label="파트"
          type="number"
          control={control}
        />
        <Input name="phone" id="phone" label="전화번호" control={control} />
        <Input
          name="teamId"
          id="teamId"
          label="참여팀"
          type="number"
          control={control}
        />
        <div className="space-y-1">
          <label className="">등록일</label>
          <div className="p-3 border rounded-md border-gray-400 w-full bg-gray-100">
            {data?.data.createdAt}
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            className="bg-gray-500 rounded-sm text-white p-2 border-none hover:bg-gray-400"
          >
            제출
          </button>
        </div>
      </form>
    </main>
  );
};

export default UserModify;

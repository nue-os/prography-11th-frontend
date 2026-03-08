import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import { UserForm } from '../types/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema } from '../utils/validation';
import { useMutation } from '@tanstack/react-query';
import { postUser } from '../apis/user';
import { useNavigate } from 'react-router-dom';

interface UserRegisterProps {
  onClose: () => void;
}
const UserRegister = ({ onClose }: UserRegisterProps) => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      loginId: '',
      password: '',
      cohortId: undefined,
      phone: '',
    },
  });

  const mutation = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      onClose();
      navigate(`/admin/users`);
    },
    onError: () => {
      alert('회원 등록에 실패했습니다.');
    },
  });

  const onSubmit = (data: UserForm) => {
    const payload = { ...data };
    if (!payload.partId) delete payload.partId;
    if (!payload.teamId) delete payload.teamId;

    mutation.mutate(payload);
  };

  return (
    <main className="space-y-2 m-4">
      {/* 제목 */}
      <h1 className="text-2xl font-medium">회원 등록</h1>
      <hr />

      {/* 등록 폼 */}
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log('validation errors:', errors);
        })}
        className="space-y-3 my-5"
      >
        <Input name="name" id="name" label="이름" control={control} />
        <Input name="loginId" id="loginId" label="아이디" control={control} />
        <Input
          name="password"
          id="password"
          label="비밀번호"
          type="password"
          control={control}
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

        <div className="flex justify-end mt-5 gap-4">
          <button
            type="submit"
            className="bg-gray-500 rounded-sm text-white p-2 border-none hover:bg-gray-400"
          >
            등록
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border rounded-sm p-2 border-gray-500 hover:bg-gray-300"
          >
            취소
          </button>
        </div>
      </form>
    </main>
  );
};

export default UserRegister;

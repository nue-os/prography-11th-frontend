import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import { UserForm } from '../types/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema } from '../utils/validation';

interface UserRegisterProps {
  onClose: () => void;
}
const UserRegister = ({ onClose }: UserRegisterProps) => {
  const { control, handleSubmit } = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      userId: '',
      generation: undefined,
      part: '',
      phoneNumber: '',
      participationTeam: '',
    },
  });

  const onSubmit = (data: UserForm) => {
    console.log(data);
  };
  return (
    <main className="space-y-2 m-4">
      {/* 제목 */}
      <h1 className="text-2xl font-medium">회원 등록</h1>
      <hr />

      {/* 등록 폼 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" id="name" label="이름" control={control} />
        <Input name="userId" id="userId" label="아이디" control={control} />
        <Input
          name="generation"
          id="generation"
          label="기수"
          type="number"
          control={control}
        />
        <Input name="part" id="part" label="파트" control={control} />
        <Input
          name="phoneNumber"
          id="phoneMumber"
          label="전화번호"
          control={control}
        />
        <Input
          name="participationTeam"
          id="participationTeam"
          label="참여팀"
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

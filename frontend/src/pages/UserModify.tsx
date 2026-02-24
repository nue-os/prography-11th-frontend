import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import { UserForm } from '../types/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema } from '../utils/validation';

const UserModify = () => {
  const { control, handleSubmit } = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: 'kse',
      userId: 'se123',
      generation: 1,
      part: '',
      phoneNumber: '',
      participationTeam: '',
      createdAt: '',
    },
  });

  const onSubmit = (data: UserForm) => {
    console.log(data);
  };

  return (
    <main className="space-y-2 m-4">
      {/* 제목 */}
      <h1 className="text-2xl font-medium">{`회원관리 > 회원상세`}</h1>
      <hr />

      {/* 수정 폼 */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          id="name"
          label="이름"
          control={control}
          readonly={true}
        />
        <Input
          name="userId"
          id="userId"
          label="아이디"
          control={control}
          readonly={true}
        />
        <Input
          name="generation"
          id="generation"
          label="기수"
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
        <Input
          name="createdAt"
          id="createdAt"
          label="등록일"
          control={control}
          readonly={true}
        />

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

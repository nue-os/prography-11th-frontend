import { useForm } from 'react-hook-form';
import { AttendacneForm } from '../types/admin';
import Select from '../components/Select';
import Input from '../components/Input';

interface AttendanceRegisterProps {
  onClose: () => void;
}
const AttendanceRegister = ({ onClose }: AttendanceRegisterProps) => {
  const { control, watch, handleSubmit } = useForm<AttendacneForm>({
    defaultValues: {
      sessionId: 1,
      memberId: 1,
      status: 'PRESENT',
      lateMinutes: null,
      reason: null,
    },
  });

  const status = watch('status');

  const onSubmit = (data: AttendacneForm) => {
    const payload = {
      ...data,
      lateMinutes: data.status === 'LATE' ? data.lateMinutes : null,
      reason:
        data.status === 'ABSENT'
          ? '무단 결석'
          : data.status === 'EXCUSED'
            ? data.reason
            : null,
    };

    console.log(payload);
  };

  return (
    <main className="space-y-2 m-4">
      {/* 제목 */}
      <h1 className="text-2xl font-medium">출결 등록</h1>
      <hr />

      {/* 등록 폼 */}
      <form onSubmit={handleSubmit(onSubmit)} className="my-5">
        <Select
          name="status"
          id="status"
          label="출결 상태"
          control={control}
          options={[
            { label: '출석', value: 'PRESENT' },
            { label: '지각', value: 'LATE' },
            { label: '무단 결석', value: 'ABSENT' },
            { label: '사유 결석', value: 'EXCUSED' },
          ]}
        />
        {status === 'LATE' && (
          <Input
            name="lateMinutes"
            id="lateMinutes"
            label="지각 시간(분)"
            type="number"
            control={control}
          />
        )}
        {status === 'EXCUSED' && (
          <Select
            name="reason"
            id="reason"
            label="사유"
            control={control}
            options={[
              { label: '사고 및 질병', value: '사고 및 질병' },
              { label: '경조사', value: '경조사' },
              { label: '병무 관계', value: '병무 관계' },
              { label: '조기 취업', value: '조기 취업' },
              { label: '생리 결석', value: '생리 결석' },
              {
                label: '체육특기자 훈련 및 대회 출전',
                value: '체육특기자 훈련 및 대회 출전',
              },
              { label: '현장 교육', value: '현장 교육' },
              { label: '행사 참여', value: '행사 참여' },
              { label: '기타(학교 허가)', value: '기타(학교 허가)' },
            ]}
          />
        )}

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

export default AttendanceRegister;

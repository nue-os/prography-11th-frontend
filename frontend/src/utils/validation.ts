import { z } from 'zod';

export const userFormSchema = z.object({
  name: z.string().trim().min(1, '이름을 입력해주세요.'),
  userId: z
    .string()
    .trim()
    .min(1, '아이디를 입력해주세요')
    .regex(/^[a-zA-Z0-9]+$/, '아이디는 영문, 숫자만 가능합니다.'),
  generation: z
    .number()
    .min(1, '기수는 1 이상이어야 합니다.')
    .optional()
    .refine((val) => val !== undefined, {
      message: '기수를 입력해주세요.',
    }),
  part: z.string().trim().min(1, '파트를 입력해주세요.'),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^010-?\d{4}-?\d{4}$/, '전화번호 형식이 올바르지 않습니다.'),
  participationTeam: z.string().trim().min(1, '참여팀을 입력해주세요.'),
  createdAt: z.string(),
});

import { z } from 'zod';

export const userFormSchema = z.object({
  name: z.string().trim().min(1, '이름을 입력해 주세요.'),
  password: z
    .string()
    .nonempty('비밀번호를 입력해 주세요.')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,16}$/,
      '비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자여야 합니다.',
    ),
  loginId: z
    .string()
    .trim()
    .min(1, '아이디를 입력해 주세요')
    .regex(/^[a-zA-Z0-9]+$/, '아이디는 영문, 숫자만 가능합니다.'),
  cohortId: z
    .number()
    .min(1, '기수는 1 이상이어야 합니다.')
    .optional()
    .refine((val) => val !== undefined, {
      message: '기수를 입력해주세요.',
    }),
  partId: z.number().min(1, '파트를 입력해 주세요.').optional(),
  phone: z
    .string()
    .nonempty('휴대폰 번호를 입력해 주세요.')
    .regex(
      /^01[016789]-?\d{3,4}-?\d{4}$/,
      '올바른 휴대폰 번호 형식을 입력해 주세요.',
    ),
  teamId: z.number().min(1, '참여팀을 입력해 주세요.').optional(),
});

export const userModifySchema = userFormSchema.omit({
  loginId: true,
  password: true,
});

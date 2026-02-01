import { z } from 'zod';

export const teacherSignupSchema = z
  .object({
    fullName: z.string().min(3, 'Name must be at least 3 characters').trim(),

    email: z
      .string()
      .trim()
      .email('Invalid email address')
      .refine((email) => email.endsWith('.ac.uk') || email.endsWith('.edu'), {
        message: 'Use your official school email',
      }),

    school: z.string().min(1, 'School is required').trim(),

    subject: z.string().trim().optional(),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must include an uppercase letter')
      .regex(/\d/, 'Password must include a number')
      .regex(/[!@#$%^&*]/, 'Password must include a special character'),

    confirmPassword: z.string(),

    termsAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type TeacherSignupData = z.infer<typeof teacherSignupSchema>;

export const teacherLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Enter a valid email address')
    .refine(
      (email) =>
        email.toLowerCase().endsWith('.ac.uk') ||
        email.toLowerCase().endsWith('.edu') ||
        email.toLowerCase().includes('school'),
      {
        message: 'Use your official school email',
      },
    ),

  password: z.string().min(1, 'Password is required'),
});

export type TeacherLoginData = z.infer<typeof teacherLoginSchema>;

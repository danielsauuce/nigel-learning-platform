import { z } from 'zod';

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
        message: 'Use your official school email (.ac.uk or .edu)',
      },
    ),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type TeacherLoginData = z.infer<typeof teacherLoginSchema>;

export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Full name must be at least 3 characters')
    .max(100, 'Full name is too long')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Full name contains invalid characters'),

  email: z
    .string()
    .trim()
    .email('Enter a valid email address')
    .refine(
      (email) => email.toLowerCase().endsWith('.ac.uk') || email.toLowerCase().endsWith('.edu'),
      {
        message: 'Use a school email (.ac.uk or .edu)',
      },
    ),

  school: z
    .string()
    .trim()
    .min(1, 'School name is required')
    .min(3, 'School name must be at least 3 characters')
    .max(200, 'School name is too long'),

  subject: z.string().trim().max(100, 'Subject is too long').optional().or(z.literal('')),
});

export type SignupFormData = z.infer<typeof signupSchema>;

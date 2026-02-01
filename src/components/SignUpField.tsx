import React, { ReactNode } from 'react';
import { KeyboardTypeOptions } from 'react-native';
import { User, Mail, Building, Book } from 'lucide-react-native';

export interface SignupFormData {
  fullName: string;
  email: string;
  school: string;
  subject?: string;
}

export interface SignupFieldConfig {
  key: keyof SignupFormData;
  label: string;
  placeholder: string;
  icon: ReactNode;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export const SIGNUP_FIELDS: SignupFieldConfig[] = [
  {
    key: 'fullName',
    label: 'Full Name',
    placeholder: 'Ms. Sarah Johnson',
    icon: <User size={16} />,
    required: true,
  },
  {
    key: 'email',
    label: 'School Email',
    placeholder: 'teacher@school.ac.uk',
    icon: <Mail size={16} />,
    keyboardType: 'email-address',
    required: true,
  },
  {
    key: 'school',
    label: 'School / Institution',
    placeholder: 'Riverside Academy',
    icon: <Building size={16} />,
    required: true,
  },
  {
    key: 'subject',
    label: 'Subject / Department',
    placeholder: 'Optional',
    icon: <Book size={16} />,
  },
];

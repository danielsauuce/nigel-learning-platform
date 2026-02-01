import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SIGNUP_FIELDS, SignupFormData } from '@/src/components/SignUpField';

type SignupErrors = Partial<Record<keyof SignupFormData, string>>;

interface SignupFormProps {
  submitLabel?: string;
  onSubmit?: (data: SignupFormData) => Promise<void>;
}

export function SignupForm({ submitLabel = 'Create account', onSubmit }: SignupFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<SignupFormData>({
    fullName: '',
    email: '',
    school: '',
    subject: '',
  });

  const [errors, setErrors] = useState<SignupErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const update = (key: keyof SignupFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: SignupErrors = {};

    const fullName = form.fullName.trim();
    const email = form.email.trim().toLowerCase();
    const school = form.school.trim();

    if (!fullName) {
      nextErrors.fullName = 'Full name is required';
    }

    if (!email) {
      nextErrors.email = 'Email is required';
    } else if (!email.includes('@') || (!email.endsWith('.ac.uk') && !email.endsWith('.edu'))) {
      nextErrors.email = 'Use a valid school email';
    }

    if (!school) {
      nextErrors.school = 'School is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      // Clean payload: optional subject is undefined if empty
      const payload: SignupFormData = {
        ...form,
        subject: form.subject?.trim() || undefined,
      };

      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await new Promise((r) => setTimeout(r, 700));
        router.push('/(teacher)/dashboard');
      }
    } catch (err) {
      Alert.alert('Signup failed', err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled =
    isLoading || !form.fullName.trim() || !form.email.trim() || !form.school.trim();

  return (
    <View className="w-full max-w-sm">
      <View className="gap-6">
        {SIGNUP_FIELDS.map((field) => (
          <Field
            key={field.key}
            label={`${field.label}${field.required ? ' *' : ''}`}
            icon={field.icon}
            value={form[field.key] ?? ''}
            onChange={(v) => update(field.key, v)}
            error={errors[field.key]}
            placeholder={field.placeholder}
            keyboardType={field.keyboardType}
            editable={!isLoading}
            autoCapitalize={field.keyboardType === 'email-address' ? 'none' : 'sentences'}
            autoCorrect={false}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isDisabled}
        activeOpacity={0.85}
        className={`
          mt-8 h-14 rounded-xl flex-row items-center justify-center gap-2
          ${isDisabled ? 'bg-primary/60' : 'bg-primary'}
        `}
      >
        <Text className="text-lg font-semibold text-primary-foreground">
          {isLoading ? 'Creating account…' : submitLabel}
        </Text>
        {!isLoading && <ArrowRight size={20} color="#fff" />}
      </TouchableOpacity>

      <Text className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{' '}
        <Text className="text-primary font-medium" onPress={() => router.push('/(teacher)/login')}>
          Sign in
        </Text>
      </Text>
    </View>
  );
}

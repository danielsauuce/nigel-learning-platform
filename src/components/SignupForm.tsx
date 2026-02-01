import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { User, Mail, Building, Book, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { signupSchema, SignupFormData } from '@/src/schema/teacherSchema';
import { InputField } from '@/src/components/InputField';
import { PrimaryButton } from '@/src/components/PrimaryButton';

interface SignupFormProps {
  onSuccess?: (data: SignupFormData) => void;
  submitLabel?: string;
  showLoginLink?: boolean;
}

// Dummy validation - accept any valid school email
const MOCK_SIGNUP = true; // Set to false when you have real backend

export function SignupForm({
  onSuccess,
  submitLabel = 'Create Account',
  showLoginLink = true,
}: SignupFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<SignupFormData>({
    fullName: '',
    email: '',
    school: '',
    subject: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [loading, setLoading] = useState(false);

  const updateField = <K extends keyof SignupFormData>(key: K, value: SignupFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  // Validate form with Zod
  const validateForm = (): boolean => {
    const result = signupSchema.safeParse(form);

    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: Partial<Record<keyof SignupFormData, string>> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof SignupFormData;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });

    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors before continuing');
      return;
    }

    setLoading(true);

    try {
      if (onSuccess) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        onSuccess(form);
      } else if (MOCK_SIGNUP) {
        await new Promise((resolve) => setTimeout(resolve, 800));

        Alert.alert('Success!', `Account created for ${form.fullName}. You can now log in.`, [
          {
            text: 'Go to Login',
            onPress: () => router.replace('/(teacher)/login'),
          },
        ]);
      } else {
        throw new Error('Backend not implemented yet');
      }
    } catch (error) {
      Alert.alert(
        'Signup Failed',
        error instanceof Error ? error.message : 'Something went wrong',
        [{ text: 'OK' }],
      );
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    router.push('/(teacher)/login');
  };

  const hasAnyData = Object.values(form).some((value) => value && value.trim().length > 0);
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <View className="w-full max-w-sm">
      <View className="mb-6">
        <InputField
          label="Full Name *"
          placeholder="Ms. Sarah Johnson"
          value={form.fullName}
          onChangeText={(value) => updateField('fullName', value)}
          icon={<User size={20} color="#71717A" />}
          autoCapitalize="words"
          editable={!loading}
          helperText={errors.fullName}
        />
      </View>

      <View className="mb-6">
        <InputField
          label="School Email *"
          placeholder="teacher@school.ac.uk"
          value={form.email}
          onChangeText={(value) => updateField('email', value)}
          icon={<Mail size={20} color="#71717A" />}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
          helperText={errors.email}
        />
      </View>

      <View className="mb-6">
        <InputField
          label="School / Institution *"
          placeholder="Riverside Academy"
          value={form.school}
          onChangeText={(value) => updateField('school', value)}
          icon={<Building size={20} color="#71717A" />}
          autoCapitalize="words"
          editable={!loading}
          helperText={errors.school}
        />
      </View>

      <View className="mb-6">
        <InputField
          label="Subject / Department (Optional)"
          placeholder="e.g., Business Studies"
          value={form.subject ?? ''}
          onChangeText={(value) => updateField('subject', value)}
          icon={<Book size={20} color="#71717A" />}
          autoCapitalize="words"
          editable={!loading}
        />
      </View>

      <PrimaryButton
        title={loading ? 'Creating account...' : submitLabel}
        icon={!loading ? <ArrowRight size={20} color="#FFFFFF" /> : null}
        onPress={handleSubmit}
        disabled={loading || hasErrors || !hasAnyData}
        accessibilityLabel="Create teacher account"
      />

      {showLoginLink && (
        <View className="mt-6">
          <Text className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Text onPress={goToLogin} className="text-primary font-medium underline">
              Log in
            </Text>
          </Text>
        </View>
      )}

      <View className="mt-4 p-3 bg-muted/50 rounded-lg">
        <Text className="text-xs text-muted-foreground text-center">
          💡 Your school email must end with .ac.uk or .edu
        </Text>
      </View>
    </View>
  );
}

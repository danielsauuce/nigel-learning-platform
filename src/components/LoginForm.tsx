import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { InputField } from '@/src/components/InputField';
import { IconButton } from '@/src/components/IconButton';
import { PrimaryButton } from '@/src/components/PrimaryButton';
import { teacherLoginSchema } from '../schema/teacherSchema';

interface LoginFormProps {
  emailPlaceholder?: string;
  submitLabel?: string;
  showSignupLink?: boolean;
  onSubmit?: (email: string, password: string) => Promise<void>;
}

type FormErrors = Partial<Record<'email' | 'password', string>>;

// dummy data to login
const DUMMY_CREDENTIALS = {
  email: 'teacher@school.ac.uk',
  password: 'teacher123',
};

export function LoginForm({
  emailPlaceholder = 'teacher@school.ac.uk',
  submitLabel = 'Continue',
  showSignupLink = true,
  onSubmit,
}: LoginFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const result = teacherLoginSchema.safeParse({ email, password });

    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: FormErrors = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as 'email' | 'password';
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });

    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(email, password);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 700));

        if (
          email.toLowerCase() === DUMMY_CREDENTIALS.email.toLowerCase() &&
          password === DUMMY_CREDENTIALS.password
        ) {
          router.replace('/(teacher)/dashboard');
        } else {
          throw new Error('Invalid email or password');
        }
      }
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'Something went wrong', [
        { text: 'OK' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const goToSignUp = () => {
    router.push('/(teacher)/register');
  };

  return (
    <View className="w-full max-w-sm">
      <View className="mb-6">
        <InputField
          label="Email"
          placeholder={emailPlaceholder}
          value={email}
          onChangeText={setEmail}
          icon={<Mail size={20} color="#71717A" />}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
          trailing={
            email.length > 0 && !errors.email ? <CheckCircle2 size={20} color="#10B981" /> : null
          }
          helperText={errors.email}
        />
      </View>

      <View className="mb-6">
        <InputField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          icon={<Lock size={20} color="#71717A" />}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          editable={!isLoading}
          trailing={
            <IconButton
              icon={
                showPassword ? (
                  <EyeOff size={20} color="#71717A" />
                ) : (
                  <Eye size={20} color="#71717A" />
                )
              }
              onPress={() => setShowPassword((v) => !v)}
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
              disabled={isLoading}
            />
          }
          helperText={errors.password}
        />
      </View>

      <PrimaryButton
        title={isLoading ? 'Signing in...' : submitLabel}
        icon={!isLoading ? <ArrowRight size={20} color="#FFFFFF" /> : null}
        onPress={handleSubmit}
        disabled={isLoading || !!Object.keys(errors).length}
        accessibilityLabel="Log in"
      />

      {showSignupLink && (
        <View className="mt-6">
          <Text className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Text onPress={goToSignUp} className="text-primary font-medium underline">
              Sign up
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
}

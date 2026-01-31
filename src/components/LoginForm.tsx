import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface LoginFormProps {
  emailPlaceholder: string;
  submitLabel?: string;
  showSignupLink?: boolean;
  onSubmit?: (email: string, password: string) => Promise<void>;
}

// dummy data to login
const DUMMY_CREDENTIALS = {
  // login details taken out for privacy
};

export function LoginForm({
  emailPlaceholder,
  submitLabel = 'Continue',
  showSignupLink = true,
  onSubmit,
}: LoginFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail =
    email.includes('@') &&
    (email.endsWith('.ac.uk') || email.endsWith('.edu') || email.includes('school'));

  // Disable button if fields are empty
  const isButtonDisabled = () => {
    return email.trim() === '' || password.trim() === '' || isLoading;
  };

  const onSubmitForm = async () => {
    setIsLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(email, password);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (
          email.toLowerCase() === DUMMY_CREDENTIALS.email.toLowerCase() &&
          password === DUMMY_CREDENTIALS.password
        ) {
          router.replace('/(teacher)/dashboard');
        } else {
          throw new Error('Invalid credentials');
        }
      }
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'Invalid credentials', [
        { text: 'OK' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupPress = () => {
    router.push('/(teacher)/register');
  };

  return (
    <View className="w-full max-w-sm">
      <View className="mb-6">
        <Text className="text-sm font-medium text-foreground mb-2">Email</Text>

        <View className="relative">
          <View className="absolute left-4 top-4 z-10">
            <Mail size={20} color="#71717A" />
          </View>

          <TextInput
            placeholder={emailPlaceholder}
            placeholderTextColor="#71717A"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
            className="bg-card border border-border rounded-xl py-4 pl-12 pr-12 text-foreground"
          />

          {isValidEmail && (
            <View className="absolute right-4 top-4 z-10">
              <CheckCircle2 size={20} color="#10B981" />
            </View>
          )}
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-sm font-medium text-foreground mb-2">Password</Text>

        <View className="relative">
          <View className="absolute left-4 top-4 z-10">
            <Lock size={20} color="#71717A" />
          </View>

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#71717A"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            editable={!isLoading}
            className="bg-card border border-border rounded-xl py-4 pl-12 pr-12 text-foreground"
          />

          <TouchableOpacity
            onPress={() => setShowPassword((v) => !v)}
            className="absolute right-4 top-4 z-10"
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff size={20} color="#71717A" />
            ) : (
              <Eye size={20} color="#71717A" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={onSubmitForm}
        disabled={isButtonDisabled()}
        className={`
          w-full h-14 rounded-xl items-center justify-center flex-row gap-2
          ${isButtonDisabled() ? 'bg-primary/60' : 'bg-primary active:bg-primary/90'}
        `}
        activeOpacity={0.8}
      >
        <Text className="text-lg font-semibold text-primary-foreground">
          {isLoading ? 'Signing in...' : submitLabel}
        </Text>
        {!isLoading && <ArrowRight size={20} color="#FFFFFF" />}
      </TouchableOpacity>

      {showSignupLink && (
        <View className="mt-6">
          <Text className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Text onPress={onSignupPress} className="text-primary font-medium">
              Sign up
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
}

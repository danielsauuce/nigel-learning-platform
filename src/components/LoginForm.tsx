import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react-native';
import { IconButton } from './IconButton';

interface LoginFormProps {
  emailPlaceholder: string;
  submitLabel?: string;
  onSignupPress?: () => void;
}

export function LoginForm({
  emailPlaceholder,
  submitLabel = 'Continue',
  onSignupPress,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail =
    email.includes('@') &&
    (email.endsWith('.ac.uk') || email.endsWith('.edu') || email.includes('school'));

  // disable button unless field are filled
  const isButtonDisabled = () => {
    return email.trim() === '' || password.trim() === '';
  };

  return (
    <View className="w-full max-w-sm space-y-6">
      {/* Email */}
      <View>
        <Text className="text-sm font-medium text-foreground mb-2">Email</Text>

        <View className="relative">
          <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
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
            className="bg-card border border-border rounded-xl py-4 px-12 text-foreground"
          />

          {isValidEmail && (
            <View className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
              <CheckCircle2 size={20} color="#10B981" />
            </View>
          )}
        </View>
      </View>

      {/* Password */}
      <View>
        <Text className="text-sm font-medium text-foreground mb-2">Password</Text>

        <View className="relative">
          <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Lock size={20} color="#71717A" />
          </View>

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#71717A"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            className="bg-card border border-border rounded-xl py-4 px-12 text-foreground"
          />

          <IconButton
            onPress={() => setShowPassword((v) => !v)}
            positionClassName="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent"
            icon={
              showPassword ? (
                <EyeOff size={20} color="#71717A" />
              ) : (
                <Eye size={20} color="#71717A" />
              )
            }
          />
        </View>
      </View>

      <IconButton
        disabled={isButtonDisabled()}
        positionClassName={`
          w-full h-14 rounded-xl items-center justify-center mt-5
          ${isButtonDisabled() ? 'bg-primary/60' : 'bg-primary'}
        `}
        icon={
          <View className="flex-row items-center gap-2">
            <Text className="text-lg font-semibold text-primary-foreground">{submitLabel}</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </View>
        }
      />

      {onSignupPress && (
        <Text className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Text onPress={onSignupPress} className="text-primary font-medium">
            Sign up
          </Text>
        </Text>
      )}
    </View>
  );
}

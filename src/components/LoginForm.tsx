import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react-native';

interface LoginFormProps {
  emailPlaceholder: string;
  submitLabel?: string;
  onSubmit: (email: string, password: string) => Promise<void> | void;
}

export function LoginForm({
  emailPlaceholder,
  submitLabel = 'Continue',
  onSubmit,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidEmail =
    email.includes('@') &&
    (email.endsWith('.ac.uk') || email.endsWith('.edu') || email.includes('school'));

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      await onSubmit(email, password);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full max-w-sm space-y-5">
      {error && (
        <Animated.View
          entering={FadeInDown.duration(300)}
          className="flex-row items-center gap-2 px-4 py-3 bg-destructive/10 border border-destructive/30 rounded-xl"
        >
          <AlertCircle size={18} color="rgb(var(--destructive))" />
          <Text className="text-sm text-destructive flex-1">{error}</Text>
        </Animated.View>
      )}

      <View>
        <Text className="text-sm font-medium text-foreground mb-2">Email</Text>
        <View className="relative">
          <View className="absolute left-4 top-1/2 -translate-y-1/2">
            <Mail size={20} color="rgb(var(--muted-foreground))" />
          </View>

          <TextInput
            placeholder={emailPlaceholder}
            placeholderTextColor="rgb(var(--muted-foreground))"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-card border border-border rounded-xl py-4 px-12 text-foreground"
          />

          {isValidEmail && (
            <View className="absolute right-4 top-1/2 -translate-y-1/2">
              <CheckCircle2 size={20} color="rgb(var(--success))" />
            </View>
          )}
        </View>
      </View>

      <View>
        <Text className="text-sm font-medium text-foreground mb-2">Password</Text>
        <View className="relative">
          <View className="absolute left-4 top-1/2 -translate-y-1/2">
            <Lock size={20} color="rgb(var(--muted-foreground))" />
          </View>

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="rgb(var(--muted-foreground))"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            className="bg-card border border-border rounded-xl py-4 px-12 text-foreground"
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff size={20} color="rgb(var(--muted-foreground))" />
            ) : (
              <Eye size={20} color="rgb(var(--muted-foreground))" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        className="h-14 rounded-xl items-center justify-center bg-primary mt-2"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-lg font-semibold text-primary-foreground">{submitLabel}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

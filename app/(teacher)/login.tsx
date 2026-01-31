import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LoginForm } from '@/src/components/LoginForm';
import { AuthHeader } from '@/src/components/AuthHeader';

export default function TeacherLoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center px-6">
      <AuthHeader emoji="👨‍🏫" title="Teacher Login" subtitle="Access your class dashboard" />

      <LoginForm
        emailPlaceholder="teacher@school.ac.uk"
        submitLabel="Access Dashboard"
        onSubmit={async (email, password) => {
          if (!email || password.length < 8) {
            throw new Error('Invalid email or password');
          }

          router.replace('/(teacher)/dashboard');
        }}
      />
    </SafeAreaView>
  );
}

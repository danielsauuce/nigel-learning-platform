import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LoginForm } from '@/src/components/LoginForm';
import { AuthHeader } from '@/src/components/AuthHeader';

export default function TeacherLoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerClassName="flex-1 items-center justify-center px-6"
        keyboardShouldPersistTaps="handled"
      >
        <AuthHeader emoji="👨‍🏫" title="Teacher Login" subtitle="Access your class dashboard" />

        <LoginForm
          emailPlaceholder="teacher@school.ac.uk"
          submitLabel="Access Dashboard"
          showSignupLink={true}
          onSubmit={async (email, password) => {
            if (!email || !email.includes('@')) {
              throw new Error('Please enter a valid email address');
            }

            if (!password || password.length < 8) {
              throw new Error('Password must be at least 8 characters');
            }

            await new Promise((resolve) => setTimeout(resolve, 500));

            router.replace('/(teacher)/dashboard');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SignupForm } from '@/src/components/SignupForm';

export default function TeacherRegisterScreen() {
  const router = useRouter();

  const handleRegister = async () => {
    await new Promise((r) => setTimeout(r, 1200));
    router.replace('/(teacher)/dashboard');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <SignupForm onSubmit={handleRegister} />
      </ScrollView>
    </SafeAreaView>
  );
}

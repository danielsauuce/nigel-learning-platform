import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { SignupForm } from '@/src/components/SignupForm';
import { IconButton } from '@/src/components/IconButton';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1">
          {/* Header with Back Button */}
          <View className="px-6 pt-4 pb-3">
            <View className="flex-row items-center gap-4">
              <IconButton
                onPress={() => router.back()}
                accessibilityLabel="Go back"
                icon={<ArrowLeft size={24} color="#71717A" />}
              />
            </View>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            className="flex-1 px-6"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Title Section */}
            <View className="mb-8">
              <Text className="text-3xl font-bold text-foreground mb-2">Create your account</Text>
              <Text className="text-base text-muted-foreground">
                Join Nigel as a teacher and start tracking your students' progress
              </Text>
            </View>

            {/* Signup Form */}
            <SignupForm
              submitLabel="Create Account"
              showLoginLink={true}
              onSuccess={(data) => {
                console.log('Signup successful:', data);
                // Router.push will be called from inside SignupForm
              }}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

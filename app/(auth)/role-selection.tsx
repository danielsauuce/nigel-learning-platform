import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Header } from '@/src/components/Header';
import { RoleCard } from '@/src/components/RoleCard';

// routes types
type AppRoute = '/personalization' | '/(teacher)/login' | '/worries';

const roles: {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  route: AppRoute;
}[] = [
  {
    id: 'student',
    emoji: '📚',
    title: "I'm a Student",
    subtitle: 'Continue learning about money',
    route: '/personalization',
  },
  {
    id: 'teacher',
    emoji: '👨‍🏫',
    title: "I'm a Teacher",
    subtitle: 'View and manage class progress',
    route: '/(teacher)/login',
  },
];

export default function RoleSelectionScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 justify-center">
        <Header
          title="Choose your path"
          messages={[
            {
              text: 'Nigel adapts based on how you’ll use it.',
              className: 'text-muted-foreground text-lg',
            },
          ]}
        />

        <View className="mt-10">
          {roles.map((role, index) => (
            <RoleCard
              key={role.id}
              emoji={role.emoji}
              title={role.title}
              subtitle={role.subtitle}
              onPress={() => router.push(role.route as any)}
              index={index}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Accessibility, GraduationCap } from 'lucide-react-native';
import { SplashIconTransition } from '@/src/components/SplashIconTransition';
import { SplashVersion } from '@/src/components/SplashVersion';
import { IconButton } from '@/src/components/IconButton';
import { AnimatedTextStack } from '@/src/components/AnimatedTextStack';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashPage() {
  const router = useRouter();
  const [showFinalIcon, setShowFinalIcon] = useState(false);

  useEffect(() => {
    const iconTimer = setTimeout(() => setShowFinalIcon(true), 1000);
    const navTimer = setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 50000);

    return () => {
      clearTimeout(iconTimer);
      clearTimeout(navTimer);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <View className="flex-1 items-center justify-center px-6 relative">
        <IconButton
          icon={<Accessibility size={24} color="rgb(161, 161, 170)" />}
          accessibilityLabel="Accessibility options"
          positionClassName="absolute top-4 right-4"
        />

        <SplashIconTransition
          showFinal={showFinalIcon}
          initialIcon={
            <View>
              <Text className="text-4xl">🐷</Text>
            </View>
          }
          finalIcon={<GraduationCap size={48} color="white" />}
        />

        <AnimatedTextStack
          items={[
            {
              text: 'Nigel',
              delay: 400,
              className: 'text-5xl font-bold text-foreground mt-1 text-center',
            },
            {
              text: 'Your financial future starts here',
              delay: 600,
              className: 'text-2xl  text-foreground mt-2 text-center',
            },
          ]}
        />

        <SplashVersion label="v1.0" />
      </View>
    </SafeAreaView>
  );
}

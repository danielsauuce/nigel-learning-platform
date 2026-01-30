import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft, User } from 'lucide-react-native';
import { IconButton } from '@/src/components/IconButton';
import { YearGroupCard } from '@/src/components/YearGroupCard';
import { ProgressBar } from '@/src/components/ProgressBar.tsx';
import { InputField } from '@/src/components/InputField';
import { useRouter } from 'expo-router';

const yearGroups = [
  { year: 'Year 7', age: 'Age 11-12', icon: '🌱' },
  { year: 'Year 8', age: 'Age 12-13', icon: '🌿' },
  { year: 'Year 9', age: 'Age 13-14', icon: '🌳' },
  { year: 'Year 10', age: 'Age 14-15', icon: '🎯' },
  { year: 'Year 11', age: 'Age 15-16', icon: '🚀' },
];

export default function PersonalizationScreen() {
  const [name, setName] = useState('');
  const [yearGroup, setYearGroup] = useState('');
  const [screen, setScreen] = useState(1);

  const router = useRouter();

  // the button is diable if the input field is empty
  const canContinue = name.trim().length > 0 && yearGroup !== '';

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 pt-6 pb-10">
        <View className="flex-row items-center gap-4 mb-8">
          <IconButton
            onPress={() => setScreen(1)}
            accessibilityLabel="Go back"
            icon={<ArrowLeft size={24} />}
          />

          <ProgressBar step={1} total={3} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInDown.duration(700)}>
            <Text className="text-3xl font-extrabold text-foreground mb-3">
              Let's personalize your experience
            </Text>

            <View className="mt-10">
              <InputField
                label="What should we call you?"
                value={name}
                onChangeText={setName}
                placeholder="Your name or nickname"
                autoCapitalize="words"
                icon={
                  <View className="text-muted-foreground">
                    <User size={20} />
                  </View>
                }
                helperText="We'll use this to make learning feel personal"
                accessibilityLabel="Your name"
                accessibilityHint="Enter your name or nickname"
              />
            </View>

            <View className="mt-12">
              <Text className="text-base font-medium text-foreground mb-4">
                Which year group are you in?
              </Text>

              <View className="flex-row flex-wrap gap-4">
                {yearGroups.map((item) => (
                  <YearGroupCard
                    key={item.year}
                    {...item}
                    isSelected={yearGroup === item.year}
                    onSelect={() => setYearGroup(item.year)}
                  />
                ))}
              </View>
            </View>
          </Animated.View>
        </ScrollView>

        <Animated.View entering={FadeInDown.duration(700).delay(400)} className="mt-auto pt-8">
          <IconButton
            onPress={canContinue ? () => router.push('/worries') : undefined}
            accessibilityLabel="Continue"
            positionClassName={`w-full h-14 rounded-2xl items-center justify-center ${
              canContinue ? 'bg-primary' : 'bg-primary/50'
            }`}
            icon={
              <Text
                className={`text-xl font-semibold ${canContinue ? 'text-white' : 'text-white/70'}`}
              >
                Continue
              </Text>
            }
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

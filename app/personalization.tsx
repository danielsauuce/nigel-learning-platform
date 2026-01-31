import { IconButton } from '@/src/components/IconButton';
import { InputField } from '@/src/components/InputField';
import { ProgressBar } from '@/src/components/ProgressBar';
import { YearGroupCard } from '@/src/components/YearGroupCard';
import { useRouter } from 'expo-router';
import { ArrowLeft, User } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const router = useRouter();

  const canContinue = name.trim().length > 0 && yearGroup !== '';

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View className="flex-1">
          <View className="px-6 pt-4 pb-3">
            <View className="flex-row items-center gap-4">
              <IconButton
                onPress={() => router.back()}
                accessibilityLabel="Go back"
                icon={<ArrowLeft size={24} color="#71717A" />}
              />
              <ProgressBar step={1} total={3} />
            </View>
          </View>

          <ScrollView
            className="flex-1 px-6"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <Animated.View entering={FadeInDown.duration(700)}>
              <Text className="text-2xl font-extrabold text-foreground mb-2 leading-tight">
                Let's personalize your experience
              </Text>

              <View className="mt-6">
                <InputField
                  label="What should we call you?"
                  value={name}
                  onChangeText={setName}
                  placeholder="Your name or nickname"
                  autoCapitalize="words"
                  icon={<User size={20} color="#71717A" />}
                  helperText="We'll use this to make learning feel personal"
                  accessibilityLabel="Your name"
                  accessibilityHint="Enter your name or nickname"
                />
              </View>

              <View className="mt-8">
                <Text className="text-base font-semibold text-foreground mb-3">
                  Which year group are you in?
                </Text>

                <View className="flex-row flex-wrap justify-between gap-3">
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

          <View className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-background border-t border-border/50">
            <Animated.View entering={FadeInDown.duration(700).delay(400)}>
              <IconButton
                onPress={canContinue ? () => router.push('/worries') : undefined}
                disabled={!canContinue}
                accessibilityLabel="Continue to next step"
                positionClassName={`w-full h-14 rounded-2xl items-center justify-center ${
                  canContinue ? 'bg-primary' : 'bg-primary/50'
                }`}
                icon={
                  <Text
                    className={`text-lg font-semibold ${
                      canContinue ? 'text-white' : 'text-white/70'
                    }`}
                  >
                    Continue
                  </Text>
                }
              />
            </Animated.View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import { Header } from '@/src/components/Header';
import { IconButton } from '@/src/components/IconButton';
import { InputField } from '@/src/components/InputField';
import { ProgressBar } from '@/src/components/ProgressBar';
import { SelectableCard } from '@/src/components/SelectableCard';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const worryOptions = [
  {
    id: 'not-enough',
    emoji: '😟',
    title: 'Not having enough',
    subtitle: 'Worried about affording things I need or want',
  },
  {
    id: 'wrong-decisions',
    emoji: '🤔',
    title: 'Making wrong decisions',
    subtitle: 'Scared of choosing badly and regretting it',
  },
  {
    id: 'bills',
    emoji: '📄',
    title: 'Understanding bills and payments',
    subtitle: 'Confused by paperwork and financial terms',
  },
  {
    id: 'scams',
    emoji: '🎣',
    title: 'Falling for scams',
    subtitle: 'Worried about being tricked or scammed',
  },
  {
    id: 'family',
    emoji: '👨‍👩‍👧',
    title: 'Disappointing my family',
    subtitle: 'Concerned about letting down people who depend on me',
  },
  {
    id: 'confident',
    emoji: '💪',
    title: 'Nothing — I feel confident!',
    subtitle: "I'm comfortable with money matters",
  },
];

export default function WorriesScreen() {
  const router = useRouter();
  const [worries, setWorries] = useState<string[]>([]);
  const [otherWorry, setOtherWorry] = useState('');

  // Handle multi-select toggle
  const toggleWorry = (id: string) => {
    setWorries((prev) => {
      // If "confident" is selected, clear all others and only select "confident"
      if (id === 'confident') {
        return ['confident'];
      }

      // If selecting other worries, remove "confident" if it was selected
      const filteredPrev = prev.filter((w) => w !== 'confident');

      // Toggle the selected worry
      if (filteredPrev.includes(id)) {
        return filteredPrev.filter((w) => w !== id);
      } else {
        return [...filteredPrev, id];
      }
    });
  };

  const canContinue = worries.length > 0;

  // Handle continue button press
  const handleContinue = () => {
    if (!canContinue) return;

    // Save worries data (you can use context or async storage here)
    console.log('Selected worries:', worries);
    console.log('Other worry:', otherWorry);

    router.push('/learning-style');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1">
          <View className="px-6 pt-4 pb-3">
            <View className="flex-row items-center gap-4">
              <IconButton
                onPress={() => router.back()}
                accessibilityLabel="Go back"
                icon={<ArrowLeft size={24} color="#71717A" />}
              />
              <View className="flex-1">
                <ProgressBar step={2} total={3} />
              </View>
            </View>
          </View>

          <ScrollView
            className="flex-1 px-6"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 140 }}
            keyboardShouldPersistTaps="handled"
          >
            <Header
              title="What worries you about money?"
              messages={[
                {
                  text: "Be honest — we'll personalize your learning based on this. Select all that apply.",
                  className: 'text-muted-foreground leading-6',
                },
              ]}
            />

            <View className="mt-6 gap-3">
              {worryOptions.map((option, index) => (
                <SelectableCard
                  key={option.id}
                  title={option.title}
                  subtitle={option.subtitle}
                  leading={<Text className="text-3xl">{option.emoji}</Text>}
                  selected={worries.includes(option.id)}
                  onPress={() => toggleWorry(option.id)}
                  index={index}
                />
              ))}
            </View>

            <Animated.View entering={FadeIn.duration(600).delay(300)} className="mt-8">
              <InputField
                label="Something else worries you?"
                placeholder="Share anything else on your mind… (optional)"
                value={otherWorry}
                onChangeText={setOtherWorry}
                multiline
                numberOfLines={4}
                maxLength={200}
                style={{ minHeight: 100, textAlignVertical: 'top', paddingTop: 12 }}
                helperText={`${otherWorry.length}/200`}
              />
            </Animated.View>
          </ScrollView>

          <View className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-background border-t border-border/50">
            <Animated.View entering={FadeIn.duration(600).delay(500)}>
              <IconButton
                onPress={handleContinue}
                disabled={!canContinue}
                accessibilityLabel="Continue to next step"
                accessibilityHint={`${worries.length} ${worries.length === 1 ? 'worry' : 'worries'} selected`}
                positionClassName={`
                  w-full h-14 rounded-2xl items-center justify-center
                  ${canContinue ? 'bg-primary' : 'bg-primary/50'}
                `}
                icon={
                  <Text className="text-lg font-semibold text-primary-foreground">Continue</Text>
                }
              />

              {worries.length > 0 && (
                <Text className="text-center text-xs text-muted-foreground mt-2">
                  {worries.length} {worries.length === 1 ? 'worry' : 'worries'} selected
                </Text>
              )}
            </Animated.View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

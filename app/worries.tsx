import { View, Text, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectableCard } from '@/src/components/SelectableCard';
import { Header } from '@/src/components/Header';
import { ProgressBar } from '@/src/components/ProgressBar.tsx';
import { IconButton } from '@/src/components/IconButton';
import { InputField } from '@/src/components/InputField';
import { useState } from 'react';
import { useRouter } from 'expo-router';

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
  const [worries, setWorries] = useState<string[]>([]);
  const [otherWorry, setOtherWorry] = useState('');

  const toggleWorry = (id: string) => {
    setWorries((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));
  };

  const canContinue = worries.length > 0;
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 pt-4 pb-6">
        <View className="flex-row items-center gap-4 mb-6">
          <IconButton
            onPress={() => router.back()}
            accessibilityLabel="Go back"
            icon={<ArrowLeft size={24} />}
          />

          <View className="flex-1">
            <ProgressBar step={2} total={3} />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
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

          <View className="mt-8 space-y-3">
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

          <Animated.View entering={FadeIn.duration(600).delay(300)} className="mt-10">
            <InputField
              label="Something else worries you?"
              placeholder="Share anything else on your mind… (optional)"
              value={otherWorry}
              onChangeText={setOtherWorry}
              multiline
              maxLength={200}
              className="min-h-[100px] pt-4"
              helperText={`${otherWorry.length}/200`}
            />
          </Animated.View>
        </ScrollView>

        <Animated.View entering={FadeIn.duration(600).delay(500)}>
          <IconButton
            onPress={() => console.log('Continue pressed')}
            accessibilityLabel="Continue"
            positionClassName={`
              mt-6 h-14 rounded-2xl items-center justify-center
              ${canContinue ? 'bg-primary shadow-xl' : 'bg-primary/50'}
            `}
            icon={<Text className="text-lg font-semibold text-primary-foreground">Continue</Text>}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

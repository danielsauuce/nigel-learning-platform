import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Message {
  text: string;
  className: string;
}

interface WelcomeHeaderProps {
  title?: string;
  messages?: Message[];
}

const defaultMessages: Message[] = [
  {
    text: "We're here to help you understand money — without the stress.",
    className: 'text-lg text-foreground leading-7',
  },
  {
    text: "Learn real skills you'll actually use for life.",
    className: 'text-lg text-foreground leading-7',
  },
  {
    text: "73% of young adults wish they'd learned this at your age.",
    className: 'text-lg font-medium text-primary leading-7',
  },
];

const messages = [
  {
    text: "We're here to help you understand money — without the stress.",
    className: 'text-lg text-foreground leading-7',
  },
  {
    text: "Learn real skills you'll actually use for life.",
    className: 'text-lg text-foreground leading-7',
  },
  {
    text: "73% of young adults wish they'd learned this at your age.",
    className: 'text-lg font-medium text-primary leading-7',
  },
];

export function Header({
  title = 'Welcome to Nigel 👋',
  messages = defaultMessages,
}: WelcomeHeaderProps) {
  return (
    <Animated.View entering={FadeInDown.duration(700)}>
      <Text className="text-4xl font-extrabold text-foreground tracking-tight mb-6">{title}</Text>

      <View className="space-y-5">
        {messages.map((msg, index) => (
          <Text key={index} className={msg.className}>
            {msg.text}
          </Text>
        ))}
      </View>
    </Animated.View>
  );
}

import { View, Text, TouchableOpacity } from 'react-native';
import { ReactNode } from 'react';

type CardVariant = 'selectable' | 'stat';

export interface CardProps {
  variant: CardVariant;
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  selected?: boolean;
  onPress?: () => void;
  children?: ReactNode;
}

export function Card({
  variant,
  title,
  subtitle,
  leading,
  trailing,
  selected = false,
  onPress,
  children,
}: CardProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      {...(onPress && { onPress, activeOpacity: 0.85 })}
      className={`
        w-full rounded-2xl border p-6 flex-row gap-4
        ${
          variant === 'selectable'
            ? selected
              ? 'border-primary bg-primary/10'
              : 'border-border bg-card'
            : 'border-border bg-card shadow-xl'
        }
      `}
    >
      {leading && <View className="flex-shrink-0">{leading}</View>}

      <View className="flex-1">
        <Text className="font-semibold text-foreground text-base">{title}</Text>
        {subtitle && <Text className="text-sm text-muted-foreground mt-1">{subtitle}</Text>}
        {children}
      </View>

      {trailing && <View className="flex-shrink-0">{trailing}</View>}
    </Container>
  );
}

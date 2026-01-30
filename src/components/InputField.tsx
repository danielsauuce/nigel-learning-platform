import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

export function InputField({ label, icon, helperText, className, ...props }: InputFieldProps) {
  return (
    <View>
      {label && <Text className="text-base font-medium text-foreground mb-3">{label}</Text>}

      <View className="relative">
        {icon && (
          <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10" pointerEvents="box-none">
            {icon}
          </View>
        )}

        <TextInput
          {...props}
          accessibilityLabel={props.accessibilityLabel ?? label}
          accessibilityHint={props.accessibilityHint ?? helperText}
          className={`h-14 text-lg bg-card border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground
            ${icon ? 'pl-14 pr-4' : 'px-4'}
            ${className ?? ''}
          `}
        />
      </View>

      {helperText && <Text className="text-sm text-muted-foreground mt-2">{helperText}</Text>}
    </View>
  );
}

// src/components/InputField.tsx
import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label?: string;
  labelClassName?: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  helperText?: string;
  error?: string;
  success?: boolean;
  multiline?: boolean;
  className?: string;
}

export function InputField({
  label,
  labelClassName,
  icon,
  trailing,
  helperText,
  error,
  success = false,
  multiline,
  className,
  ...props
}: InputFieldProps) {
  const hasError = !!error;
  const showHelper = hasError ? error : helperText;
  const helperColor = hasError ? 'text-red-500' : 'text-muted-foreground';

  return (
    <View>
      {label && (
        <Text
          className={`
            text-base font-medium text-foreground mb-2.5
            ${labelClassName || ''}
          `}
        >
          {label}
        </Text>
      )}

      <View className="relative">
        {icon && !multiline && (
          <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            {icon}
          </View>
        )}

        {trailing && !multiline && (
          <View className="absolute right-4 top-1/2 -translate-y-1/2 z-10">{trailing}</View>
        )}

        <TextInput
          {...props}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          placeholderTextColor="#9CA3AF"
          accessibilityLabel={props.accessibilityLabel ?? label}
          accessibilityHint={props.accessibilityHint ?? (hasError ? error : helperText)}
          className={`
            bg-card rounded-xl text-foreground border-2
            placeholder:text-muted-foreground
            transition-colors duration-200
            ${multiline ? 'min-h-[110px] p-4 text-base' : 'h-14 text-base'}
            ${icon && !multiline ? 'pl-14' : 'pl-5'}
            ${trailing && !multiline ? 'pr-14' : 'pr-5'}
            ${
              hasError
                ? 'border-red-500 focus:border-red-500'
                : success
                  ? 'border-green-500 focus:border-green-500'
                  : 'border-border focus:border-primary'
            }
            ${className ?? ''}
          `}
        />
      </View>

      {showHelper && (
        <Text
          className={`
            text-sm mt-2
            ${helperColor}
          `}
        >
          {showHelper}
        </Text>
      )}
    </View>
  );
}

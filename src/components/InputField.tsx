import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: React.ReactNode;
  helperText?: string;
  multiline?: boolean;
}

export function InputField({
  label,
  icon,
  helperText,
  className,
  multiline,
  ...props
}: InputFieldProps) {
  return (
    <View>
      {label && <Text className="text-base font-medium text-foreground mb-3">{label}</Text>}

      <View className="relative">
        {icon && !multiline && (
          <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10" pointerEvents="box-none">
            {icon}
          </View>
        )}

        <TextInput
          {...props}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          accessibilityLabel={props.accessibilityLabel ?? label}
          accessibilityHint={props.accessibilityHint ?? helperText}
          className={`
            bg-card border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground
            ${multiline ? 'min-h-[100px] p-4 text-base' : 'h-14 text-lg'}
            ${icon && !multiline ? 'pl-14 pr-4' : 'px-4'}
            ${className ?? ''}
          `}
        />
      </View>

      {helperText && <Text className="text-sm text-muted-foreground mt-2">{helperText}</Text>}
    </View>
  );
}

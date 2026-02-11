import { Eye, EyeOff } from 'lucide-react-native';
import React, { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface FormFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  icon: React.ReactNode;
  error?: string;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export const FormField = forwardRef<TextInput, FormFieldProps>(
  (
    {
      label,
      icon,
      error,
      isPassword = false,
      showPassword = false,
      onTogglePassword,
      ...textInputProps
    },
    ref,
  ) => {
    return (
      <View className="mb-[18px]">
        {/* Label */}
        <Text
          className="mb-2 ml-1 font-poppins-semibold text-[13px]"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          {label}
        </Text>

        {/* Input row */}
        <View
          className="h-14 flex-row items-center rounded-2xl px-4"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            borderWidth: 1.5,
            borderColor: error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)',
          }}
        >
          {/* Left icon */}
          <View className="mr-3">{icon}</View>

          {/* Text input */}
          <TextInput
            ref={ref}
            className="h-full flex-1 font-poppins-medium text-[15px] text-white"
            placeholderTextColor="rgba(255,255,255,0.2)"
            secureTextEntry={isPassword && !showPassword}
            autoCapitalize="none"
            {...textInputProps}
          />

          {/* Password toggle */}
          {isPassword && onTogglePassword && (
            <TouchableOpacity onPress={onTogglePassword} className="ml-2 p-1" activeOpacity={0.6}>
              {showPassword ? (
                <Eye size={20} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
              ) : (
                <EyeOff size={20} color="rgba(255,255,255,0.25)" strokeWidth={1.5} />
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* Error text */}
        {error && (
          <Text className="ml-1 mt-1.5 font-poppins-regular text-xs text-destructive">{error}</Text>
        )}
      </View>
    );
  },
);

FormField.displayName = 'FormField';

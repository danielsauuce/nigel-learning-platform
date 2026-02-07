import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background p-5">
      <Text className="font-poppins-bold text-2xl text-foreground">This is a modal</Text>
      <Link href="/" dismissTo className="mt-4 py-4">
        <Text className="font-poppins-semibold text-base text-primary">Go to home screen</Text>
      </Link>
    </View>
  );
}
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import '../global.css';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(student)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// import React, { useEffect } from 'react';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import {
//   useFonts,
//   Poppins_400Regular,
//   Poppins_500Medium,
//   Poppins_600SemiBold,
//   Poppins_700Bold,
// } from '@expo-google-fonts/poppins';
// import { Fredoka_700Bold } from '@expo-google-fonts/fredoka';
// import * as SplashScreenExpo from 'expo-splash-screen';
// import { ThemeProvider, AuthProvider, useTheme } from '@/context';

// import '../global.css';

// SplashScreenExpo.preventAutoHideAsync();

// function RootInner() {
//   const { theme } = useTheme();

//   return (
//     <>
//       <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
//       <Stack
//         screenOptions={{
//           headerShown: false,
//           animation: 'fade',
//         }}
//       />
//     </>
//   );
// }

// export default function RootLayout() {
//   const [fontsLoaded, fontsError] = useFonts({
//     Poppins_400Regular,
//     Poppins_500Medium,
//     Poppins_600SemiBold,
//     Poppins_700Bold,
//     Fredoka_700Bold,
//   });

//   useEffect(() => {
//     if (fontsLoaded || fontsError) {
//       SplashScreenExpo.hideAsync();
//     }
//   }, [fontsLoaded, fontsError]);

//   if (!fontsLoaded && !fontsError) return null;

//   return (
//     <SafeAreaProvider>
//       <ThemeProvider>
//         <AuthProvider>
//           <RootInner />
//         </AuthProvider>
//       </ThemeProvider>
//     </SafeAreaProvider>
//   );
// }

import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Dimensions } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            swipeEdgeWidth: Dimensions.get('screen').width * 0.35,
            headerStyle: {
              borderBottomStartRadius: 15,
              borderBottomEndRadius: 15,
            },
            headerTransparent: true,
            unmountOnBlur: false,
            headerTitleAlign: 'center',
            // headerTintColor: 'black',
            headerShadowVisible: false,
            // headerStatusBarHeight: 10,
            // headerLeftLabelVisible: false,
            // headerPressColor: 'red',
            headerLeftContainerStyle: {
              // backgroundColor: 'red',
              paddingLeft: '0%',
              marginLeft: 7,
              // alignItems: 'center',
              // backgroundColor: 'blue',
            },
            headerRightContainerStyle: {
              paddingRight: '0%',
              alignItems: 'center',
              marginRight: 7,
              // backgroundColor: 'blue',
            },
            headerTitleStyle: {
              // backgroundColor: 'red',
              paddingHorizontal: 0,
              fontSize: 15,
            },
            headerTitleContainerStyle: {
              paddingHorizontal: '0%',
              // backgroundColor: 'blue',
            },
            headerBackgroundContainerStyle: {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderBottomStartRadius: 28,
              borderBottomEndRadius: 28,
              // marginHorizontal: '10%',
            },
            // freezeOnBlur: false,
            // overlayColor: 'red',
            // headerShown: false,
          }}
        />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

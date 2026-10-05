import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useAsyncStorage } from '@/src/hooks/useAsyncStore';
import { Stack, useRouter } from 'expo-router';

import { useMigrationHelper } from '@/db/drizzle';
import { DatabaseProvider } from '@/db/provider';
import { AuthProvider, useAuth } from '@/contexts/auth';

import { AUTH_KEY } from '@/src/constants/General';

require("../src/presets");

const Main = () => {
  const { state, actions } = useAuth();
  const router = useRouter();
  const { getStorage, setStorage } = useAsyncStorage();

  useEffect(() => {
    const handleFirstSetStorageAuth = async () => {
      actions.setLoading(true);

      const authStatus: any = await getStorage(AUTH_KEY);

      // First launch: storage is empty (null), so seed the default auth status
      if (!authStatus?.hasOwnProperty("isOnboarding")) {
        await setStorage(AUTH_KEY, {
          isOnboarding: true,
          isGuest: true
        });
        actions.setOnboarding(true);
        actions.setGuest(true);
      } else {
        actions.setOnboarding(authStatus.isOnboarding);
        actions.setGuest(authStatus.isGuest);
      }
      actions.setLoading(false);
    };

    handleFirstSetStorageAuth()
  }, []);

  useEffect(() => {
    if (state == null ||
      state.isOnboarding == null ||
      state.isGuest == null)
      return;

    if (state.isOnboarding) {
      router.replace('./onboarding');
      return
    }

    if (state.isGuest) {
      router.replace('./auth/login');
      return
    }

    if (!state.isGuest) {
      router.replace('./(tabs)');
      return
    }
  }, [state]);

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="onboarding" />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen
      options={{
        presentation: "modal",
        title: "Thêm giao dịch"
      }}
      name={'create-transaction'}
    />
    <Stack.Screen
      options={{
        title: "Ví của tôi"
      }}
      name={'wallet'}
    />
  </Stack>
}

export default function Layout() {
  const { success, error } = useMigrationHelper();

  if (error) {
    console.log({ error });
    return (
      <View >
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    console.log('Đang tải');

    return (
      <View >
        <Text>Migration is in progress...</Text>
      </View>
    );
  };

  return <DatabaseProvider>
    <View style={styles.safeContainer}>
      <AuthProvider>
        <StatusBar style='auto' />
        <Main />
      </AuthProvider>
    </View>
  </DatabaseProvider>
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20
  },
})


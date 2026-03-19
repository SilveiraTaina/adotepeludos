import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function RootLayoutNav() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  return (
    <Stack>
      {!user ? (
        // se não logado, mostra login
        <Stack.Screen name="login" options={{ headerShown: false }} />
      ) : (
        // se logado, mostra as tabs
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
      {/*esconde o index padrão */}
      <Stack.Screen name="index" options={{ href: null }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
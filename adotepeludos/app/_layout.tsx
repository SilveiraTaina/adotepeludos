import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import LoadingScreen from '../components/LoadingScreen';

function RootLayoutNav() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!user ? (
        // se não logado, mostra login como tela inicial
        <Stack.Screen name="login" />
      ) : (
        // se logado, mostra as tabs
        <Stack.Screen name="(tabs)" />
      )}
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
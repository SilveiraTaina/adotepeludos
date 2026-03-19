// app/login.tsx
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const handleLogin = () => {
    // Aqui você vai adicionar a lógica de autenticação depois
    // Por enquanto, só navega para as tabs
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vinda ao Adote Peludos</Text>
      
      <TextInput 
        placeholder="E-mail" 
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput 
        placeholder="Senha" 
        secureTextEntry 
        style={styles.input}
      />
      
      <Button title="Entrar" onPress={handleLogin} />
      
      <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#fff'
  },
  title: { 
    fontSize: 24, 
    marginBottom: 30, 
    textAlign: 'center',
    fontWeight: 'bold'
  },
  input: { 
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12, 
    marginBottom: 15, 
    borderRadius: 8,
    fontSize: 16
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF'
  } 
  });
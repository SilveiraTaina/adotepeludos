import { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      let errorMessage = 'Falha no login';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.mainTitle}>Adote Peludos</Text>
      <Text style={styles.subtitle}>Capão da Canoa</Text>
      
      <TextInput 
        placeholder="E-mail" 
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />
      
      <TextInput 
        placeholder="Senha" 
        secureTextEntry 
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity disabled={loading}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
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
  logo: {
    width: '100%',
    height: 120,
    marginBottom: 20,
    alignSelf: 'center'
  },
  mainTitle: { 
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FF6B00' 
  },
  subtitle: { 
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#FFA500'
  },
  input: { 
    borderWidth: 1,
    borderColor: '#FFA500', 
    padding: 12, 
    marginBottom: 15, 
    borderRadius: 8,
    fontSize: 16
  },
  button: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#FFA500',
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#FF6B00'
  }
});
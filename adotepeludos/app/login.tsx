import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
export default function LoginScreen() {
  const handleLogin = () => {
    // adicionar a lógica de autenticação depois
    router.replace('/(tabs)');
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
      />
      
      <TextInput 
        placeholder="Senha" 
        secureTextEntry 
        style={styles.input}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
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
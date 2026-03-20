import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  email: string;
  name: string;
} | null;

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  async function loadStoredData() {
    try {
      const storedUser = await AsyncStorage.getItem('@AdotePeludos:user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // validação (add api depois)
      if (email === 'teste@email.com' && password === '123456') {
        const userData = {
          id: '1',
          email: email,
          name: 'Usuário Teste',
        };
        
        //salva no AsyncStorage
        await AsyncStorage.setItem('@AdotePeludos:user', JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error('E-mail ou senha inválidos');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  //logout
  async function signOut() {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('@AdotePeludos:user');
      setUser(null);
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
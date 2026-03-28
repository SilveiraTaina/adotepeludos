import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function PerfilScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível sair');
            }
          }
        }
      ]
    );
  };

  const menuItems = [
    { icon: 'person-outline' as const, title: 'Meus Dados', onPress: () => {} },
    { icon: 'heart-outline' as const, title: 'Minhas Adoções', onPress: () => {} },
    { icon: 'cash-outline' as const, title: 'Minhas Doações', onPress: () => {} },
    { icon: 'settings-outline' as const, title: 'Configurações', onPress: () => {} },
    { icon: 'help-circle-outline' as const, title: 'Ajuda', onPress: () => {} },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/150/FF6B00/ffffff?text=User' }} 
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.profileName}>{user?.name || 'Usuário'}</Text>
        <Text style={styles.profileEmail}>{user?.email || 'email@exemplo.com'}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Adoções</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Doações</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>Favoritos</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={24} color="#666" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#FF6B00" />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF6B00',
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileImage: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  profileName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: -20,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 12,
    padding: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6B00',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF6B00',
    fontWeight: '600',
    marginLeft: 10,
  },
});
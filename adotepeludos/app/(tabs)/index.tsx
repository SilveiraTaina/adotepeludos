import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  const pets = [
    { id: '1', name: 'Rex', age: '2 anos', image: 'https://via.placeholder.com/150/FF6B00/ffffff?text=Rex', type: 'Cachorro' },
    { id: '2', name: 'Mia', age: '1 ano', image: 'https://via.placeholder.com/150/FFA500/ffffff?text=Mia', type: 'Gato' },
    { id: '3', name: 'Bob', age: '3 anos', image: 'https://via.placeholder.com/150/FF6B00/ffffff?text=Bob', type: 'Cachorro' },
    { id: '4', name: 'Luna', age: '6 meses', image: 'https://via.placeholder.com/150/FFA500/ffffff?text=Luna', type: 'Gato' },
  ];

  const campaigns = [
    { 
      id: '1', 
      title: 'Ração para Canil São Francisco', 
      goal: 1500, 
      current: 890,
      description: 'Ajude a alimentar 50 cães resgatados'
    },
    { 
      id: '2', 
      title: 'Campanha de Castração', 
      goal: 3000, 
      current: 1250,
      description: 'Meta: castrar 20 animais de rua'
    },
  ];

  const handleSeeAllPets = () => {
    router.push('/(tabs)/animais');
  };

  const handlePetDetails = (petId: string) => {
    router.push(`/pet/${petId}`);
  };

  const handleCampaignDetails = (campaignId: string) => {
    router.push(`/campanha/${campaignId}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* header*/}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Adote Peludos</Text>
      </View>

      {/* campo de busca */}
      <View style={styles.searchContainer}>
        <TextInput 
          placeholder="Buscar animais..." 
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      {/* boas vindas*/}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Encontre seu melhor amigo</Text>
        <Text style={styles.welcomeSubtitle}>Adote um peludo hoje 💛</Text>
      </View>

      {/* seção de adoções */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Adoções</Text>
        <TouchableOpacity onPress={handleSeeAllPets}>
          <Text style={styles.seeAllText}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.petsScroll}
      >
        {pets.map((pet) => (
          <TouchableOpacity 
            key={pet.id} 
            style={styles.petCard}
            onPress={() => handlePetDetails(pet.id)}
          >
            <Image source={{ uri: pet.image }} style={styles.petImage} />
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petInfo}>{pet.age} • {pet.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* campanhas*/}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Campanhas Ativas</Text>
      </View>

      {campaigns.map((campaign) => {
        const progress = (campaign.current / campaign.goal) * 100;
        
        return (
          <TouchableOpacity 
            key={campaign.id} 
            style={styles.campaignCard}
            onPress={() => handleCampaignDetails(campaign.id)}
          >
            <Text style={styles.campaignTitle}>{campaign.title}</Text>
            <Text style={styles.campaignDescription}>{campaign.description}</Text>
            
            {/* barra de progresso */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            
            <View style={styles.campaignFooter}>
              <Text style={styles.campaignGoal}>Meta: R$ {campaign.goal}</Text>
              <Text style={styles.campaignCurrent}>
                Arrecadado: R$ {campaign.current} ({progress.toFixed(0)}%)
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      {/* espaço */}
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
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  welcomeSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#FF6B00',
    fontWeight: '600',
  },
  petsScroll: {
    paddingLeft: 20,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  petCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  petImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  petInfo: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  campaignCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  campaignDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF6B00',
    borderRadius: 4,
  },
  campaignFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  campaignGoal: {
    fontSize: 14,
    color: '#666',
  },
  campaignCurrent: {
    fontSize: 14,
    color: '#FF6B00',
    fontWeight: '600',
  },
});
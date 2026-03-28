import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ANIMAIS_MOCK } from "../perfilanimal";

export default function HomeScreen() {
  const handleContribuir = (campaignId: string, campaignTitle: string) => {
    router.push({
      pathname: "/(tabs)/contribuir",
      params: { id: campaignId, title: campaignTitle },
    });
  };

  const campaigns = [
    {
      id: "1",
      title: "Ração para Canil São Francisco",
      goal: 1500,
      current: 890,
      description: "Ajude a alimentar 50 cães resgatados",
    },
    {
      id: "2",
      title: "Campanha de Castração",
      goal: 3000,
      current: 1250,
      description: "Meta: castrar 20 animais de rua",
    },
  ];

  const featuredCampaign = campaigns.reduce((prev, current) => {
    const prevPercentage = (prev.current / prev.goal) * 100;
    const currentPercentage = (current.current / current.goal) * 100;
    return currentPercentage > prevPercentage ? current : prev;
  });

  const handleSeeAllPets = () => {
    router.push("/(tabs)/animais");
  };

  const handleSeeAllCampaigns = () => {
    router.push("/(tabs)/doacoes");
  };


  const handlePetDetails = (petId: string) => {
    const animal = ANIMAIS_MOCK.find((a) => a.id === petId);
    if (!animal) return;
    router.push({
      pathname: "/perfilanimal",
      params: { animalJson: JSON.stringify(animal) },
    });
  };

  const featuredProgress =
    (featuredCampaign.current / featuredCampaign.goal) * 100;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Adote Peludos</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar animais..."
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Encontre seu melhor amigo</Text>
        <Text style={styles.welcomeSubtitle}>Adote um peludo hoje 💛</Text>
      </View>

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
        {ANIMAIS_MOCK.map((pet) => (
          <TouchableOpacity
            key={pet.id}
            style={styles.petCard}
            onPress={() => handlePetDetails(pet.id)}
          >
            {pet.imagem ? (
              <Image
                source={
                  typeof pet.imagem === "string"
                    ? { uri: pet.imagem }
                    : pet.imagem
                }
                style={styles.petImage}
              />
            ) : (
              <View style={styles.petImagePlaceholder}>
                <Text style={{ fontSize: 36 }}>
                  {pet.especie === "Cachorro" ? "🐶" : "🐱"}
                </Text>
              </View>
            )}
            <Text style={styles.petName}>{pet.nome}</Text>
            <Text style={styles.petInfoText}>
              {pet.idade} • {pet.especie}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Campanha em Destaque</Text>
        <TouchableOpacity onPress={handleSeeAllCampaigns}>
          <Text style={styles.seeAllText}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.featuredCampaignCard}>
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredBadgeText}>🔥 Mais próxima da meta</Text>
        </View>

        <Text style={styles.featuredCampaignTitle}>
          {featuredCampaign.title}
        </Text>
        <Text style={styles.featuredCampaignDescription}>
          {featuredCampaign.description}
        </Text>

        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${featuredProgress}%` }]}
          />
        </View>

        <View style={styles.campaignFooter}>
          <View>
            <Text style={styles.campaignGoal}>
              Meta: R$ {featuredCampaign.goal}
            </Text>
            <Text style={styles.campaignCurrent}>
              Arrecadado: R$ {featuredCampaign.current}
            </Text>
          </View>
          <View style={styles.progressCircle}>
            <Text style={styles.progressCircleText}>
              {featuredProgress.toFixed(0)}%
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.donateButtonContainer}
          onPress={() =>
            handleContribuir(featuredCampaign.id, featuredCampaign.title)
          }
        >
          <Text style={styles.donateButtonText}>Contribuir agora →</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#FF6B00",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  welcomeSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  welcomeSubtitle: { fontSize: 16, color: "#666" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  seeAllText: { color: "#FF6B00", fontWeight: "600" },
  petsScroll: {
    paddingLeft: 20,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  petCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 15,
    width: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    overflow: "hidden",
  },
  // Imagem com altura definida para aparecer corretamente
  petImage: {
    width: 140,
    height: 120,
    resizeMode: "cover",
  },
  petImagePlaceholder: {
    width: 140,
    height: 120,
    backgroundColor: "#FFF0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  petName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  petInfoText: {
    fontSize: 13,
    color: "#666",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  featuredCampaignCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#FFE0B5",
  },
  featuredBadge: {
    backgroundColor: "#FF6B00",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  featuredBadgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  featuredCampaignTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  featuredCampaignDescription: { fontSize: 14, color: "#666", marginBottom: 16 },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressBar: { height: "100%", backgroundColor: "#FF6B00", borderRadius: 5 },
  campaignFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  campaignGoal: { fontSize: 13, color: "#666", marginBottom: 4 },
  campaignCurrent: { fontSize: 14, color: "#FF6B00", fontWeight: "bold" },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF6B00",
  },
  progressCircleText: { fontSize: 16, fontWeight: "bold", color: "#FF6B00" },
  donateButtonContainer: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
    alignItems: "center",
  },
  donateButtonText: { color: "#FF6B00", fontSize: 14, fontWeight: "600" },
});

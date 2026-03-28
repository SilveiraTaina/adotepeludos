import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { ANIMAIS_MOCK } from "../perfilanimal";

type Filtro = "Todos" | "Cachorro" | "Gato";

export default function AnimaisScreen() {
  const router = useRouter();

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("Todos");

  const botoes: Filtro[] = ["Todos", "Cachorro", "Gato"];

  const resultado = ANIMAIS_MOCK.filter((pet) => {
    const buscaOk =
      pet.nome.toLowerCase().includes(busca.toLowerCase()) ||
      pet.especie.toLowerCase().includes(busca.toLowerCase()) ||
      pet.raca.toLowerCase().includes(busca.toLowerCase());

    const filtroOk = filtro === "Todos" || pet.especie === filtro;

    return buscaOk && filtroOk;
  });

function handlePetDetails(pet: typeof ANIMAIS_MOCK[0]) {
  router.push({
    pathname: "/perfilanimal",
    params: { animalJson: JSON.stringify(pet) },
  });
}

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Animais</Text>
      </View>

      <View style={styles.petInfoContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Buscar animais..."
            value={busca}
            onChangeText={setBusca}
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
          <View style={styles.filtrosContainer}>
            {botoes.map((botao) => (
              <TouchableOpacity
                key={botao}
                style={[
                  styles.filtroBotao,
                  filtro === botao && styles.filtroBotaoAtivo,
                ]}
                onPress={() => setFiltro(botao)}
              >
                <Text
                  style={[
                    styles.filtroTexto,
                    filtro === botao && styles.filtroTextoAtivo,
                  ]}
                >
                  {botao}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <FlatList
          data={resultado}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          style={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.petCard}
              onPress={() => handlePetDetails(item)}
            >
              {item.imagem ? (
                <Image
                  source={
                    typeof item.imagem === "string"
                      ? { uri: item.imagem }
                      : item.imagem
                  }
                  style={styles.petImage}
                />
              ) : (
                <View style={styles.petImagePlaceholder}>
                  <Text style={{ fontSize: 32 }}>
                    {item.especie === "Cachorro" ? "🐶" : "🐱"}
                  </Text>
                </View>
              )}
              <View style={styles.petInfo}>
                <Text style={styles.petName}>{item.nome}</Text>
                <Text style={styles.petSubInfo}>
                  {item.idade} · {item.especie}
                </Text>
                <Text style={styles.petRaca}>{item.raca}</Text>
                <View style={styles.badgeRow}>
                  {item.vacinado && (
                    <View style={styles.badgeVerde}>
                      <Text style={styles.badgeVerdeText}>✓ Vacinado</Text>
                    </View>
                  )}
                  {item.castrado && (
                    <View style={styles.badgeVerde}>
                      <Text style={styles.badgeVerdeText}>✓ Castrado</Text>
                    </View>
                  )}
                </View>
              </View>
              <Text style={styles.seta}>›</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum animal encontrado.</Text>
          }
        />
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#FF6B00",
    paddingTop: 56,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
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
  filtrosContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    gap: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  filtroBotao: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f0f0f0",
  },
  filtroBotaoAtivo: {
    backgroundColor: "#FF6B00",
    borderColor: "#FF6B00",
  },
  filtroTexto: { fontSize: 14, color: "#666", fontWeight: "600" },
  filtroTextoAtivo: { color: "#fff" },
  listContent: { padding: 15 },
  petCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    overflow: "hidden",
  },
  petImage: { width: 100, height: 110, resizeMode: "cover" },
  petImagePlaceholder: {
    width: 100,
    height: 110,
    backgroundColor: "#FFF0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  petInfo: { flex: 1, paddingHorizontal: 12, paddingVertical: 10 },
  petName: { fontSize: 16, fontWeight: "bold", color: "#FF6B00", marginBottom: 2 },
  petSubInfo: { fontSize: 13, color: "#666", marginBottom: 2 },
  petRaca: { fontSize: 12, color: "#aaa", marginBottom: 6 },
  badgeRow: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  badgeVerde: {
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#2E7D32",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeVerdeText: { fontSize: 10, color: "#2E7D32", fontWeight: "600" },
  seta: { fontSize: 24, color: "#FFA500", paddingRight: 12 },
  petInfoContainer: { flex: 1, paddingHorizontal: 5 },
  emptyText: { textAlign: "center", color: "#999", marginTop: 40, fontSize: 16 },
});

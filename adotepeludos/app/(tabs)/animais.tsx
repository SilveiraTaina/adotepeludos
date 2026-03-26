import { useRouter } from "expo-router";
import { useState } from "react";
import React from "react";
import {
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View, Button
} from "react-native";

type Filtro = "Todos" | "Cachorro" | "Gato";

// componente 

export default function DoacoesScreen() {

  const router = useRouter();

  const pets = [
    {
      id: "1",
      name: "Rex",
      age: "2 anos",
      image: require("../../assets/images/rex.jpg"),
      type: "Cachorro",
    },
    {
      id: "2",
      name: "Mia",
      age: "1 ano",
      image: require("../../assets/images/mia.png"),
      type: "Gato",
    },
    {
      id: "3",
      name: "Bob",
      age: "3 anos",
      image: require("../../assets/images/bob.png"),
      type: "Cachorro",
    },
    {
      id: "4",
      name: "Luna",
      age: "6 meses",
      image: require("../../assets/images/luna.jpg"),
      type: "Gato",
    },
  ];

  //envia para o perfil do bicho 
  const handlePetDetails = (petId: string) => {
    router.push(`/pet/${petId}`);
  };

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("Todos");

  const botoes: Filtro[] = ["Todos", "Cachorro", "Gato"];

  const resultado = pets.filter((pet) => {
    const buscaOk =
      pet.name.toLowerCase().includes(busca.toLowerCase()) ||
      pet.type.toLowerCase().includes(busca.toLowerCase());

    const filtroOk = filtro === "Todos" || pet.type === filtro;

    return buscaOk && filtroOk;
  });


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Animais</Text>
      </View>

      <View style={styles.petInfoContainer}>
        {/* barra de procura */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Buscar animais..."
            value={busca}
            onChangeText={setBusca}
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
          {/* Botões de filtro */}
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

        {/* Lista de animais */}
        <FlatList
          data={resultado}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          style={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.petCard}
              onPress={() => handlePetDetails(item.id)}
            >
              <Image source={item.image} style={styles.petImage} />
              <Text style={styles.petName}>{item.name}</Text>
              <Text style={styles.petInfo}>
                {item.age} • {item.type}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum animal encontrado.</Text>
          }
        />
      </View>

      <View style={{ height: 32 }} />


      <View>
        <Button
          title="Botao teste ir para o formulario"
          onPress={() => router.push("/formularioAdocao")}
        />
      </View>
    </ScrollView>
  );
}


// estilos 

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#FF6B00",
    paddingTop: 56,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  headerSub: { color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 2 },

  body: { padding: 16 },

  sectionLabel: {
    fontSize: 11,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontWeight: "600",
    marginBottom: 12,
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
  filtrosContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
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
  filtroTexto: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  filtroTextoAtivo: {
    color: "#fff",
  },
  listContent: {
    padding: 15,
  },
  row: {
    justifyContent: "space-between",
  },
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
  },
  petImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  petName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  petInfo: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: 10,
    marginTop: 4,
  },

  petInfoContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },

  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 16,
  },
});
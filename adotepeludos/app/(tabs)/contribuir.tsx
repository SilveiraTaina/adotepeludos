import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Campanha, CAMPANHAS_MOCK } from "./doacoes"; // Importa os dados

export default function ContribuirScreen() {
  const { id, titulo } = useLocalSearchParams();
  const [campanhaSelecionada, setCampanhaSelecionada] = useState<string>(
    (id as string) || "1",
  );
  const [valor, setValor] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [metodo, setMetodo] = useState("pix");

  // Usa os mesmos dados mock da tela de doações
  const campanhas: Campanha[] = CAMPANHAS_MOCK;

  const campanhaAtual = campanhas.find((c) => c.id === campanhaSelecionada);

  // Atualiza quando chegar parâmetro da navegação
  useEffect(() => {
    if (id) {
      setCampanhaSelecionada(id as string);
    }
  }, [id]);

  const calcularProgresso = (arrecadado: number, meta: number) => {
    return Math.min(100, (arrecadado / meta) * 100);
  };

  const formatarMoeda = (valor: number) => {
    return `R$ ${valor.toLocaleString("pt-BR")}`;
  };

  const handleDoar = () => {
    if (!valor || !nome || !email) {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }

    const valorNumero = parseFloat(valor.replace(",", "."));
    if (isNaN(valorNumero) || valorNumero < 5) {
      Alert.alert("Atenção", "O valor mínimo para doação é R$ 5,00");
      return;
    }

    // Aqui você poderia salvar no histórico
    Alert.alert(
      "Doação realizada! 🎉",
      `Obrigado ${nome} pela sua contribuição de ${formatarMoeda(valorNumero)}!\n\n` +
        `Campanha: ${campanhaAtual?.titulo}\n` +
        `Método: ${metodo.toUpperCase()}\n\n` +
        `Você receberá um comprovante por e-mail.`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contribuir</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Seleção de campanha */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Escolha a campanha</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.campanhasScroll}
          contentContainerStyle={styles.campanhasScrollContent}
        >
          {campanhas.map((campanha) => {
            const progresso = calcularProgresso(
              campanha.arrecadado,
              campanha.meta,
            );
            const isSelected = campanhaSelecionada === campanha.id;

            return (
              <TouchableOpacity
                key={campanha.id}
                style={[
                  styles.campanhaCard,
                  isSelected && styles.campanhaCardSelected,
                ]}
                onPress={() => setCampanhaSelecionada(campanha.id)}
              >
                {/* Imagem ou placeholder */}
                {campanha.imagem ? (
                  <Image
                    source={{ uri: campanha.imagem }}
                    style={styles.campanhaImagem}
                  />
                ) : (
                  <View style={styles.campanhaImagemPlaceholder}>
                    <Text style={styles.campanhaImagemEmoji}>🐾</Text>
                  </View>
                )}

                <View style={styles.campanhaContent}>
                  <View style={styles.campanhaHeader}>
                    <Text
                      style={[
                        styles.campanhaTitle,
                        isSelected && styles.campanhaTitleSelected,
                      ]}
                      numberOfLines={1}
                    >
                      {campanha.titulo}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#FF6B00"
                      />
                    )}
                  </View>

                  <Text style={styles.campanhaDescription} numberOfLines={2}>
                    {campanha.descricao}
                  </Text>

                  <View style={styles.progressContainer}>
                    <View style={styles.progressBarContainer}>
                      <View
                        style={[styles.progressBar, { width: `${progresso}%` }]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {Math.round(progresso)}%
                    </Text>
                  </View>

                  <View style={styles.valoresContainer}>
                    <Text style={styles.valorText}>
                      Meta: {formatarMoeda(campanha.meta)}
                    </Text>
                    <Text style={styles.valorTextDestaque}>
                      Arrecadado: {formatarMoeda(campanha.arrecadado)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Informações da campanha selecionada */}
      {campanhaAtual && (
        <View style={styles.campanhaInfoContainer}>
          <Text style={styles.infoTitle}>Você está contribuindo para:</Text>
          <Text style={styles.infoCampaignTitle}>{campanhaAtual.titulo}</Text>
          <Text style={styles.infoDescription}>{campanhaAtual.descricao}</Text>
          <View style={styles.infoProgressContainer}>
            <Text style={styles.infoProgressText}>
              {formatarMoeda(campanhaAtual.arrecadado)} de{" "}
              {formatarMoeda(campanhaAtual.meta)}
            </Text>
          </View>
        </View>
      )}

      {/* Formulário de doação */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Valor da contribuição (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="R$ 0,00"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <Text style={styles.label}>Seu nome completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>E-mail para contato</Text>
        <TextInput
          style={styles.input}
          placeholder="seuemail@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Método de pagamento</Text>
        <View style={styles.methodContainer}>
          <TouchableOpacity
            style={[
              styles.methodButton,
              metodo === "pix" && styles.methodSelected,
            ]}
            onPress={() => setMetodo("pix")}
          >
            <Ionicons
              name="qr-code"
              size={24}
              color={metodo === "pix" ? "#FF6B00" : "#666"}
            />
            <Text
              style={[
                styles.methodText,
                metodo === "pix" && styles.methodTextSelected,
              ]}
            >
              PIX
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodButton,
              metodo === "cartao" && styles.methodSelected,
            ]}
            onPress={() => setMetodo("cartao")}
          >
            <Ionicons
              name="card"
              size={24}
              color={metodo === "cartao" ? "#FF6B00" : "#666"}
            />
            <Text
              style={[
                styles.methodText,
                metodo === "cartao" && styles.methodTextSelected,
              ]}
            >
              Cartão
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodButton,
              metodo === "boleto" && styles.methodSelected,
            ]}
            onPress={() => setMetodo("boleto")}
          >
            <Ionicons
              name="document-text"
              size={24}
              color={metodo === "boleto" ? "#FF6B00" : "#666"}
            />
            <Text
              style={[
                styles.methodText,
                metodo === "boleto" && styles.methodTextSelected,
              ]}
            >
              Boleto
            </Text>
          </TouchableOpacity>
        </View>

        {/* Valores sugeridos */}
        <View style={styles.suggestedValues}>
          <Text style={styles.suggestedTitle}>Valores sugeridos:</Text>
          <View style={styles.suggestedButtons}>
            {[10, 20, 50, 100].map((value) => (
              <TouchableOpacity
                key={value}
                style={styles.suggestedButton}
                onPress={() => setValor(value.toString())}
              >
                <Text style={styles.suggestedButtonText}>R$ {value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Botão de doar */}
        <TouchableOpacity style={styles.donateButton} onPress={handleDoar}>
          <Text style={styles.donateButtonText}>Confirmar contribuição</Text>
        </TouchableOpacity>

        {/* Informação adicional */}
        <View style={styles.infoContainer}>
          <Ionicons name="information-circle-outline" size={20} color="#999" />
          <Text style={styles.infoText}>
            Sua contribuição será destinada integralmente à campanha
            selecionada. Você receberá um comprovante por e-mail.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#FF6B00",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    marginTop: 15,
    paddingVertical: 15,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  campanhasScroll: {
    paddingHorizontal: 15,
  },
  campanhasScrollContent: {
    paddingRight: 5,
  },
  campanhaCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginHorizontal: 5,
    width: 280,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  campanhaCardSelected: {
    borderColor: "#FF6B00",
    backgroundColor: "#FFF9F0",
  },
  campanhaImagem: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  campanhaImagemPlaceholder: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFF0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  campanhaImagemEmoji: {
    fontSize: 40,
  },
  campanhaContent: {
    padding: 12,
  },
  campanhaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  campanhaTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  campanhaTitleSelected: {
    color: "#FF6B00",
  },
  campanhaDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    marginRight: 8,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FF6B00",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: "#FF6B00",
    fontWeight: "600",
  },
  valoresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  valorText: {
    fontSize: 10,
    color: "#999",
  },
  valorTextDestaque: {
    fontSize: 10,
    color: "#FF6B00",
    fontWeight: "600",
  },
  campanhaInfoContainer: {
    backgroundColor: "#FFF9F0",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B00",
  },
  infoTitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  infoCampaignTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  infoProgressContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#FFE0C0",
  },
  infoProgressText: {
    fontSize: 12,
    color: "#FF6B00",
    fontWeight: "600",
  },
  formContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  methodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  methodButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginHorizontal: 5,
    gap: 8,
  },
  methodSelected: {
    borderColor: "#FF6B00",
    backgroundColor: "#FFF3E0",
  },
  methodText: {
    fontSize: 14,
    color: "#666",
  },
  methodTextSelected: {
    color: "#FF6B00",
    fontWeight: "600",
  },
  suggestedValues: {
    marginBottom: 24,
  },
  suggestedTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  suggestedButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  suggestedButton: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  suggestedButtonText: {
    color: "#FF6B00",
    fontWeight: "600",
    fontSize: 14,
  },
  donateButton: {
    backgroundColor: "#FF6B00",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  donateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: "#999",
    lineHeight: 16,
  },
});

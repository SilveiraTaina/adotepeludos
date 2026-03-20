import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

export type Campanha = {
  id: string;
  titulo: string;
  descricao: string;
  meta: number;
  arrecadado: number;
  imagem?: string; // uri opcional; sem ela exibe placeholder
};

export type Doacao = {
  id: string;
  campanhaId: string;
  campanhaNome: string;
  valor: number;
  data: string; // ex: '15/03/2025'
};

// ── dados mock ────────────────────────────────────────────────────────────────

export const CAMPANHAS_MOCK: Campanha[] = [
  {
    id: '1',
    titulo: 'Tratamento do Rex',
    descricao:
      'Rex precisa de cirurgia urgente na pata. Ajude a cobrir as despesas veterinárias.',
    meta: 2000,
    arrecadado: 1200,
  },
  {
    id: '2',
    titulo: 'Castração de gatinhos',
    descricao:
      'Campanha de castração coletiva para reduzir o número de animais em situação de rua.',
    meta: 2000,
    arrecadado: 800,
  },
  {
    id: '3',
    titulo: 'Ração para o abrigo',
    descricao:
      'O abrigo está precisando de ração para mais de 30 animais. Contribua com qualquer valor.',
    meta: 500,
    arrecadado: 450,
  },
];

export const HISTORICO_MOCK: Doacao[] = [
  { id: 'h1', campanhaId: '1', campanhaNome: 'Tratamento do Rex', valor: 50, data: '15/03/2025' },
  { id: 'h2', campanhaId: '3', campanhaNome: 'Ração para o abrigo', valor: 30, data: '02/02/2025' },
];

// ── helpers ───────────────────────────────────────────────────────────────────

function pct(arrecadado: number, meta: number) {
  return Math.min(1, arrecadado / meta);
}

function brl(valor: number) {
  return `R$ ${valor.toLocaleString('pt-BR')}`;
}

// ── componente ────────────────────────────────────────────────────────────────

export default function DoacoesScreen() {
  const router = useRouter();

  function abrirDetalhe(campanha: Campanha) {
    // Passa os dados via query params (serializado)
    router.push({
      pathname: '/doacoes/detalhe',
      params: { campanhaJson: JSON.stringify(campanha) },
    });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doações</Text>
        <Text style={styles.headerSub}>Ajude um peludo hoje 🐾</Text>
      </View>

      <View style={styles.body}>
        {/* Campanhas */}
        <Text style={styles.sectionLabel}>Campanhas ativas</Text>

        {CAMPANHAS_MOCK.map((campanha) => (
          <View key={campanha.id} style={styles.card}>
            {/* Imagem / placeholder */}
            {campanha.imagem ? (
              <Image source={{ uri: campanha.imagem }} style={styles.cardImg} />
            ) : (
              <View style={styles.cardImgPlaceholder}>
                <Text style={styles.cardImgEmoji}>🐾</Text>
              </View>
            )}

            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{campanha.titulo}</Text>
              <Text style={styles.cardDesc}>{campanha.descricao}</Text>

              {/* Barra de progresso */}
              <View style={styles.progressRow}>
                <Text style={styles.progressText}>
                  {brl(campanha.arrecadado)} arrecadados
                </Text>
                <Text style={styles.progressText}>
                  {Math.round(pct(campanha.arrecadado, campanha.meta) * 100)}%
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${pct(campanha.arrecadado, campanha.meta) * 100}%` },
                  ]}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => abrirDetalhe(campanha)}
              >
                <Text style={styles.buttonText}>Doar para esta campanha</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Histórico */}
        <Text style={[styles.sectionLabel, { marginTop: 8 }]}>
          Meu histórico de doações
        </Text>

        {HISTORICO_MOCK.length === 0 ? (
          <Text style={styles.emptyText}>Você ainda não fez nenhuma doação.</Text>
        ) : (
          HISTORICO_MOCK.map((d) => (
            <View key={d.id} style={styles.histItem}>
              <View>
                <Text style={styles.histNome}>{d.campanhaNome}</Text>
                <Text style={styles.histData}>{d.data}</Text>
              </View>
              <Text style={styles.histValor}>{brl(d.valor)}</Text>
            </View>
          ))
        )}

        <View style={{ height: 32 }} />
      </View>
    </ScrollView>
  );
}

// ── estilos ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#FF6B00',
    paddingTop: 56,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  headerSub: { color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 2 },

  body: { padding: 16 },

  sectionLabel: {
    fontSize: 11,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '600',
    marginBottom: 12,
  },

  // Card de campanha
  card: {
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cardImg: { width: '100%', height: 130, resizeMode: 'cover' },
  cardImgPlaceholder: {
    width: '100%',
    height: 110,
    backgroundColor: '#FFF0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImgEmoji: { fontSize: 40 },
  cardBody: { padding: 14 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#FF6B00' },
  cardDesc: { fontSize: 13, color: '#666', marginTop: 6, lineHeight: 19 },

  // Progresso
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 4,
  },
  progressText: { fontSize: 11, color: '#999' },
  progressBar: {
    height: 7,
    backgroundColor: '#FFE0C0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B00',
    borderRadius: 6,
  },

  // Botão
  button: {
    backgroundColor: '#FF6B00',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  // Histórico
  histItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  histNome: { fontSize: 13, color: '#333' },
  histData: { fontSize: 11, color: '#aaa', marginTop: 2 },
  histValor: { fontSize: 14, fontWeight: 'bold', color: '#FF6B00' },

  emptyText: { fontSize: 13, color: '#aaa', textAlign: 'center', marginTop: 8 },
});

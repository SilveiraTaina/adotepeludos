import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import type { Campanha } from '../types/campanha';
// ── helpers ───────────────────────────────────────────────────────────────────

function brl(valor: number) {
  return `R$ ${valor.toLocaleString('pt-BR')}`;
}

function pct(arrecadado: number, meta: number) {
  return Math.min(1, arrecadado / meta);
}

const VALORES_RAPIDOS = [10, 25, 50, 100];
const FORMAS_PAGAMENTO = ['PIX', 'Cartão', 'Boleto'] as const;
type FormaPagamento = (typeof FORMAS_PAGAMENTO)[number];

// ── componente ────────────────────────────────────────────────────────────────

export default function DoacaoDetalheScreen() {
  const router = useRouter();
  const { campanhaJson } = useLocalSearchParams<{ campanhaJson: string }>();

  const campanha: Campanha = campanhaJson
    ? JSON.parse(campanhaJson)
    : {
        id: '0',
        titulo: 'Campanha',
        descricao: '',
        meta: 1000,
        arrecadado: 0,
      };

  const [valorSelecionado, setValorSelecionado] = useState<number | null>(25);
  const [valorCustom, setValorCustom] = useState('');
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('PIX');
  const [loading, setLoading] = useState(false);

  const valorFinal = valorCustom
    ? parseFloat(valorCustom.replace(',', '.'))
    : valorSelecionado;

  function selecionarValorRapido(v: number) {
    setValorSelecionado(v);
    setValorCustom('');
  }

  function handleCustomChange(text: string) {
    setValorCustom(text);
    setValorSelecionado(null);
  }

  async function handleDoacar() {
    if (!valorFinal || isNaN(valorFinal) || valorFinal <= 0) {
      Alert.alert('Valor inválido', 'Por favor, informe um valor para a doação.');
      return;
    }

    setLoading(true);
    try {
      // 🔌 Aqui você conecta ao backend / Firebase para registrar a doação
      await new Promise((res) => setTimeout(res, 1200)); // simula chamada

      Alert.alert(
        'Doação realizada! 🐾',
        `Obrigado pela doação de ${brl(valorFinal)} via ${formaPagamento} para a campanha "${campanha.titulo}".`,
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch {
      Alert.alert('Erro', 'Não foi possível registrar a doação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const progresso = pct(campanha.arrecadado, campanha.meta);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero / Imagem */}
      {campanha.imagem ? (
        <Image source={{ uri: campanha.imagem }} style={styles.hero} />
      ) : (
        <View style={styles.heroPlaceholder}>
          <Text style={styles.heroEmoji}>🐾</Text>
        </View>
      )}

      {/* Botão voltar */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <View style={styles.body}>
        {/* Título e descrição */}
        <Text style={styles.titulo}>{campanha.titulo}</Text>
        <Text style={styles.descricao}>{campanha.descricao}</Text>

        {/* Badges: meta / arrecadado / doadores */}
        <View style={styles.metaRow}>
          <View style={styles.metaBadge}>
            <Text style={styles.metaVal}>{brl(campanha.meta)}</Text>
            <Text style={styles.metaLbl}>Meta</Text>
          </View>
          <View style={styles.metaBadge}>
            <Text style={styles.metaVal}>{brl(campanha.arrecadado)}</Text>
            <Text style={styles.metaLbl}>Arrecadado</Text>
          </View>
          <View style={styles.metaBadge}>
            <Text style={styles.metaVal}>
              {Math.round(progresso * 100)}%
            </Text>
            <Text style={styles.metaLbl}>Atingido</Text>
          </View>
        </View>

        {/* Barra de progresso */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progresso * 100}%` }]} />
        </View>

        {/* Valores rápidos */}
        <Text style={styles.sectionLabel}>Escolha o valor</Text>
        <View style={styles.valorRow}>
          {VALORES_RAPIDOS.map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.valorChip, valorSelecionado === v && !valorCustom && styles.valorChipSelected]}
              onPress={() => selecionarValorRapido(v)}
            >
              <Text
                style={[
                  styles.valorChipText,
                  valorSelecionado === v && !valorCustom && styles.valorChipTextSelected,
                ]}
              >
                {brl(v)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Outro valor (R$)"
          keyboardType="decimal-pad"
          value={valorCustom}
          onChangeText={handleCustomChange}
        />

        {/* Forma de pagamento */}
        <Text style={styles.sectionLabel}>Forma de pagamento</Text>
        <View style={styles.pagRow}>
          {FORMAS_PAGAMENTO.map((fp) => (
            <TouchableOpacity
              key={fp}
              style={[styles.pagChip, formaPagamento === fp && styles.pagChipSelected]}
              onPress={() => setFormaPagamento(fp)}
            >
              <Text
                style={[
                  styles.pagChipText,
                  formaPagamento === fp && styles.pagChipTextSelected,
                ]}
              >
                {fp}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botão confirmar */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleDoacar}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading
              ? 'Processando...'
              : `Confirmar doação${valorFinal && !isNaN(valorFinal) ? ` — ${brl(valorFinal)}` : ''}`}
          </Text>
        </TouchableOpacity>

        {/* Botão compartilhar */}
        <TouchableOpacity style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Compartilhar campanha</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

// ── estilos ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // Hero
  hero: { width: '100%', height: 200, resizeMode: 'cover' },
  heroPlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: '#FFF0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: { fontSize: 60 },

  // Botão voltar
  backBtn: {
    position: 'absolute',
    top: 48,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  backIcon: { fontSize: 22, color: '#FF6B00', lineHeight: 26 },

  body: { padding: 20 },

  titulo: { fontSize: 22, fontWeight: 'bold', color: '#FF6B00' },
  descricao: { fontSize: 14, color: '#555', marginTop: 8, lineHeight: 21 },

  // Meta badges
  metaRow: { flexDirection: 'row', gap: 10, marginTop: 18, marginBottom: 14 },
  metaBadge: {
    flex: 1,
    backgroundColor: '#FFF0E0',
    borderWidth: 0.5,
    borderColor: '#FFA500',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  metaVal: { fontSize: 15, fontWeight: 'bold', color: '#FF6B00' },
  metaLbl: { fontSize: 10, color: '#999', marginTop: 2 },

  // Barra de progresso
  progressBar: {
    height: 8,
    backgroundColor: '#FFE0C0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: { height: '100%', backgroundColor: '#FF6B00', borderRadius: 6 },

  sectionLabel: {
    fontSize: 11,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '600',
    marginBottom: 10,
  },

  // Valores rápidos
  valorRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 12 },
  valorChip: {
    flex: 1,
    minWidth: 70,
    borderWidth: 1.5,
    borderColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  valorChipSelected: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  valorChipText: { fontSize: 13, fontWeight: '600', color: '#FF6B00' },
  valorChipTextSelected: { color: '#fff' },

  // Input
  input: {
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },

  // Formas de pagamento
  pagRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  pagChip: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  pagChipSelected: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  pagChipText: { fontSize: 13, fontWeight: '600', color: '#FF6B00' },
  pagChipTextSelected: { color: '#fff' },

  // Botões
  button: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: { opacity: 0.65 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  buttonOutline: {
    borderWidth: 1.5,
    borderColor: '#FF6B00',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonOutlineText: { color: '#FF6B00', fontWeight: 'bold', fontSize: 15 },
});

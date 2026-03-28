import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// ── tipos ─────────────────────────────────────────────────────────────────────

export type Animal = {
  id: string;
  nome: string;
  idade: string;
  especie: string;
  raca: string;
  comportamento: string[];
  historia: string;
  vacinado: boolean;
  castrado: boolean;
  abrigo: string;
  imagem?: string | number;
};

// ── dados mock ────────────────────────────────────────────────────────────────

export const ANIMAIS_MOCK: Animal[] = [
  {
    id: '1',
    nome: 'Rex',
    idade: '2 anos',
    especie: 'Cachorro',
    raca: 'Labrador',
    comportamento: ['Brincalhão', 'Dócil', 'Ativo', 'Sociável'],
    historia:
      'Rex foi resgatado de uma situação de maus-tratos em 2023. Após meses de recuperação no abrigo, ele se tornou um dos queridinhos dos voluntários. Adora crianças e se dá bem com outros cães.',
    vacinado: true,
    castrado: false,
    abrigo: 'Canil São Francisco — Capão da Canoa',
    imagem: require('../assets/images/rex.jpg'),
  },
  {
    id: '2',
    nome: 'Mia',
    idade: '1 ano',
    especie: 'Gato',
    raca: 'Sem raça definida',
    comportamento: ['Carinhosa', 'Tranquila', 'Independente'],
    historia:
      'Mia chegou ao abrigo ainda filhote, abandonada em uma caixa na porta. Cresceu rodeada de cuidado e carinho. É calma, adora colo e se adapta bem a apartamentos.',
    vacinado: true,
    castrado: true,
    abrigo: 'Lar Temporário — Capão da Canoa',
    imagem: require('../assets/images/mia.png'),
  },
  {
    id: '3',
    nome: 'Bob',
    idade: '3 anos',
    especie: 'Cachorro',
    raca: 'Vira-lata',
    comportamento: ['Protetor', 'Leal', 'Energético', 'Inteligente'],
    historia:
      'Bob foi encontrado nas ruas do centro da cidade, desnutrido e assustado. Com paciência e muito amor dos voluntários, ele se transformou em um cão confiante e cheio de personalidade.',
    vacinado: true,
    castrado: true,
    abrigo: 'Canil São Francisco — Capão da Canoa',
    imagem: require('../assets/images/bob.png'),
  },
  {
    id: '4',
    nome: 'Luna',
    idade: '6 meses',
    especie: 'Gato',
    raca: 'Persa mix',
    comportamento: ['Curiosa', 'Brincalhona', 'Tímida'],
    historia:
      'Luna é um filhote resgatada de uma ninhada de rua. Ainda está aprendendo a confiar nas pessoas, mas com paciência se torna uma companheira adorável.',
    vacinado: false,
    castrado: false,
    abrigo: 'Lar Temporário — Capão da Canoa',
    imagem: require('../assets/images/luna.jpg'),
  },
];

// ── helpers ───────────────────────────────────────────────────────────────────

function getImageSource(imagem: string | number | undefined) {
  if (!imagem) return null;
  return typeof imagem === 'string' ? { uri: imagem } : imagem;
}

function Badge({ texto, cor }: { texto: string; cor: string }) {
  return (
    <View style={[styles.badge, { backgroundColor: cor + '22', borderColor: cor }]}>
      <Text style={[styles.badgeText, { color: cor }]}>{texto}</Text>
    </View>
  );
}

function InfoRow({ label, valor }: { label: string; valor: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValor}>{valor}</Text>
    </View>
  );
}

// ── componente ────────────────────────────────────────────────────────────────

export default function PerfilAnimalScreen() {
  const { animalJson, animalId } = useLocalSearchParams<{
    animalJson?: string;
    animalId?: string;
  }>();

  const animal: Animal =
    animalJson
      ? JSON.parse(animalJson)
      : ANIMAIS_MOCK.find((a) => a.id === animalId) ?? ANIMAIS_MOCK[0];

  const [mostrarBotao, setMostrarBotao] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const chegouAoFim =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 40;
    if (chegouAoFim && !mostrarBotao) setMostrarBotao(true);
  }

  function irParaFormulario() {
    router.push({
      pathname: '/formularioAdocao',
      params: { animalNome: animal.nome, animalId: animal.id },
    });
  }

  const imageSource = getImageSource(animal.imagem);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Foto hero */}
        {imageSource ? (
          <Image source={imageSource} style={styles.hero} />
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
          {/* Nome e espécie */}
          <View style={styles.nomeLinha}>
            <Text style={styles.nome}>{animal.nome}</Text>
            <View style={styles.especiePill}>
              <Text style={styles.especieText}>
                {animal.especie === 'Cachorro' ? '🐶' : '🐱'} {animal.especie}
              </Text>
            </View>
          </View>
          <Text style={styles.raca}>{animal.raca} · {animal.idade}</Text>

          {/* Informações rápidas */}
          <View style={styles.card}>
            <InfoRow label="🏠 Abrigo" valor={animal.abrigo} />
            <View style={styles.separator} />
            <View style={styles.saudeRow}>
              <Badge
                texto={animal.vacinado ? '✓ Vacinado' : '✗ Não vacinado'}
                cor={animal.vacinado ? '#2E7D32' : '#C62828'}
              />
              <Badge
                texto={animal.castrado ? '✓ Castrado' : '✗ Não castrado'}
                cor={animal.castrado ? '#2E7D32' : '#C62828'}
              />
            </View>
          </View>

          {/* Comportamento */}
          <Text style={styles.sectionLabel}>Comportamento</Text>
          <View style={styles.comportamentoRow}>
            {animal.comportamento.map((c) => (
              <Badge key={c} texto={c} cor="#FF6B00" />
            ))}
          </View>

          {/* História */}
          <Text style={styles.sectionLabel}>História</Text>
          <View style={styles.card}>
            <Text style={styles.historiaText}>{animal.historia}</Text>
          </View>

          {!mostrarBotao && (
            <Text style={styles.avisoRolar}>
              Role até o fim para adotar {animal.nome} 🐾
            </Text>
          )}

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      {mostrarBotao && (
        <View style={styles.botaoContainer}>
          <TouchableOpacity style={styles.botaoAdotar} onPress={irParaFormulario}>
            <Text style={styles.botaoText}>Quero adotar {animal.nome}! 🐾</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ── estilos ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  hero: { width: '100%', height: 280, resizeMode: 'cover' },
  heroPlaceholder: {
    width: '100%',
    height: 280,
    backgroundColor: '#FFF0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: { fontSize: 72 },
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
  nomeLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nome: { fontSize: 28, fontWeight: 'bold', color: '#FF6B00' },
  especiePill: {
    backgroundColor: '#FFF0E0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  especieText: { fontSize: 13, color: '#FF6B00', fontWeight: '600' },
  raca: { fontSize: 15, color: '#888', marginBottom: 20 },
  card: {
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  infoLabel: { fontSize: 13, color: '#888', flex: 1 },
  infoValor: { fontSize: 13, color: '#333', fontWeight: '500', flex: 2, textAlign: 'right' },
  separator: { height: 0.5, backgroundColor: '#f0f0f0', marginVertical: 10 },
  saudeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  badge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  badgeText: { fontSize: 12, fontWeight: '600' },
  sectionLabel: {
    fontSize: 11,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '600',
    marginBottom: 10,
  },
  comportamentoRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  historiaText: { fontSize: 14, color: '#555', lineHeight: 22 },
  avisoRolar: {
    textAlign: 'center',
    color: '#FFA500',
    fontSize: 13,
    marginTop: 8,
  },
  botaoContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#f0f0f0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  botaoAdotar: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  botaoText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

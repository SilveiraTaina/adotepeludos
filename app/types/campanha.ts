export type Campanha = {
  id: string;
  titulo: string;
  descricao: string;
  meta: number;
  arrecadado: number;
  imagem?: string;
};
 
export type Doacao = {
  id: string;
  campanhaId: string;
  campanhaNome: string;
  valor: number;
  data: string;
};
 
export const CAMPANHAS_MOCK: Campanha[] = [
  {
    id: '1',
    titulo: 'Tratamento do Rex',
    descricao:
      'Rex é um labrador de 4 anos resgatado das ruas. Ele precisa de cirurgia urgente na pata traseira. Cada contribuição faz diferença na recuperação dele!',
    meta: 2000,
    arrecadado: 1200,
  },
  {
    id: '2',
    titulo: 'Castração de gatinhos',
    descricao:
      'Campanha de castração coletiva para reduzir o número de animais em situação de rua em Capão da Canoa. Ajude a fazer a diferença!',
    meta: 2000,
    arrecadado: 800,
  },
  {
    id: '3',
    titulo: 'Ração para o abrigo',
    descricao:
      'O abrigo está precisando de ração para mais de 30 animais. Contribua com qualquer valor e ajude a manter os peludos alimentados.',
    meta: 500,
    arrecadado: 450,
  },
];
 
export const HISTORICO_MOCK: Doacao[] = [
  { id: 'h1', campanhaId: '1', campanhaNome: 'Tratamento do Rex', valor: 50, data: '15/03/2025' },
  { id: 'h2', campanhaId: '3', campanhaNome: 'Ração para o abrigo', valor: 30, data: '02/02/2025' },
];
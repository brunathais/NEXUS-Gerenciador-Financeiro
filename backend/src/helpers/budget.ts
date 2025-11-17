// helpers/budget.ts
export function getBudgetLimit(categoriaRotulo: string | null | undefined, orcamento: any): number | undefined {
  if (!categoriaRotulo) return undefined;

  // Mapa explícito (ajuste os nomes conforme seu modelo Orcamento)
  const MAP: Record<string, keyof typeof orcamento> = {
    'essenciais': 'essenciais',
    'não essenciais': 'naoEssenciais', // ou 'nao_essenciais' / 'naoessenciais'
    'imprevistos': 'imprevistos',
  };

  // Normaliza rótulo para minúsculas sem acentos e espaços “normais”
  const rotuloNormalizado = categoriaRotulo
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

  // Reverte para chave do mapa mantendo acento no rótulo se preferir,
  // aqui usamos as chaves do MAP sem acento:
  const chaveMapa = Object.keys(MAP).find(k => (
    k.normalize('NFD').replace(/[\u0300-\u036f]/g, '') === rotuloNormalizado
  ));

  if (!chaveMapa) return undefined;
  const campo = MAP[chaveMapa];
  return (orcamento as any)[campo];
}

export function toNumber(val: any): number {
  // SUM do Sequelize pode vir string
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

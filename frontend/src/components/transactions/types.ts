// importante arquivo com os tipos relacionados às transações
// tipos usados em varios componentes, pois são tipos centrais
export type Tipo = 'Entrada' | 'Saída';
export type Categoria = 'Essenciais' | 'Não essenciais' | 'Imprevistos' | null;

export type Transacao = {
    id: number; //a API retorna o id como number
    descricao: string;
    valor: number;
    tipo: Tipo;
    data: string;     // yyyy-MM-dd (para o input) ou ISO (se preferir)
    categoria: Categoria; // pode ser null
};

export type Filtros = {
    dataInicio: string;
    dataFim: string;
    tipo: '' | Tipo; //aqui pode ser vazio, 'Entrada' ou 'Saída' pois é usado para filtro
    categoria: '' | Exclude<Categoria, null>; // exclui null das opções de categoria
};

export type Orcamento = {
    essenciais: number;  // Limite para a categoria "Essenciais"
    naoEssenciais: number;  // Limite para a categoria "Não essenciais"
    imprevistos: number;  // Limite para a categoria "Imprevistos"
};

// Alterando o tipo de alerta para incluir os valores de comparação
export type Alertas = {
    categoria: string;
    alerta: string;
    valorTransacao: number; // Valor da transação que ultrapassou o orçamento
    limiteOrcamento: number; // Limite do orçamento para aquela categoria
};

interface AlertaOrcamento {
    categoria: string;
    alerta: string;
    valorTransacao: number;
    limiteOrcamento: number;
}

export interface TransactionSummaryData {
    somaEntradas: number;
    somaSaidas: number;
    somaSaidasPorCategoria: Array<any>; // Ajuste conforme necessário para as categorias
    saldo: number;
    alertas: AlertaOrcamento[]; // Alteração aqui para refletir a nova estrutura
}

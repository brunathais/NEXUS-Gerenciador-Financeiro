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

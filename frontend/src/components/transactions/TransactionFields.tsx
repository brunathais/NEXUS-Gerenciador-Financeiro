import { Categoria, Tipo } from './types';

type Props = {
    descricao: string; setDescricao: (v: string) => void;
    valor: string; setValor: (v: string) => void;
    tipo: Tipo; setTipo: (v: Tipo) => void;
    data: string; setData: (v: string) => void;
    categoria: Categoria; setCategoria: (v: Categoria) => void;
};

export function TransactionFields(p: Props) {
    return (
        <>
            <div>
                <label htmlFor="descricao">Descrição</label>
                <input id="descricao" value={p.descricao} onChange={(e) => p.setDescricao(e.target.value)} required />
            </div>

            <div>
                <label htmlFor="valor">Valor</label>
                <input id="valor" type="number" step="0.01" value={p.valor} onChange={(e) => p.setValor(e.target.value)} required />
            </div>

            <div>
                <label htmlFor="tipo">Tipo</label>
                <select id="tipo" value={p.tipo} onChange={(e) => p.setTipo(e.target.value as Tipo)}>
                    <option value="Entrada">Entrada</option>
                    <option value="Saída">Saída</option>
                </select>
            </div>

            <div>
                <label htmlFor="data">Data</label>
                <input id="data" type="date" value={p.data} onChange={(e) => p.setData(e.target.value)} required />
            </div>

            {p.tipo === 'Saída' && (
                <div>
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={p.categoria ?? ''}
                        onChange={(e) => p.setCategoria((e.target.value || null) as Categoria)}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Essenciais">Essenciais</option>
                        <option value="Não essenciais">Não essenciais</option>
                        <option value="Imprevistos">Imprevistos</option>
                    </select>
                </div>
            )}
        </>
    );
}

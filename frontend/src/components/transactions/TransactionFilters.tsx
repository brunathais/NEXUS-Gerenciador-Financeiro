import { Filtros } from './types';

type Props = {
    filtros: Filtros;
    setFiltros: (f: Filtros) => void;
};

export function TransactionFilters({ filtros, setFiltros }: Props) {
    function upd<K extends keyof Filtros>(k: K, v: Filtros[K]) {
        setFiltros({ ...filtros, [k]: v });
    }
    return (
        <div className="filters">
            <div>
                <label>Data Início</label>
                <input type="date" value={filtros.dataInicio} onChange={(e) => upd('dataInicio', e.target.value)} />
            </div>
            <div>
                <label>Data Fim</label>
                <input type="date" value={filtros.dataFim} onChange={(e) => upd('dataFim', e.target.value)} />
            </div>
            <div>
                <label>Tipo</label>
                <select value={filtros.tipo} onChange={(e) => upd('tipo', e.target.value as any)}>
                    <option value="">Todos</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Saída">Saída</option>
                </select>
            </div>
            <div>
                <label>Categoria</label>
                <select value={filtros.categoria} onChange={(e) => upd('categoria', e.target.value as any)}>
                    <option value="">Todas</option>
                    <option value="Essenciais">Essenciais</option>
                    <option value="Não essenciais">Não essenciais</option>
                    <option value="Imprevistos">Imprevistos</option>
                </select>
            </div>
        </div>
    );
}

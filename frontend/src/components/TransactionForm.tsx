import { useState, useEffect } from 'react';
import { api } from '../api';

export default function TransactionForm() {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState<number | string>('');
    const [tipo, setTipo] = useState('Entrada');
    const [data, setData] = useState('');
    const [categoria, setCategoria] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const [transacoes, setTransacoes] = useState<any[]>([]);

    // Filtros
    const [filtroDataInicio, setFiltroDataInicio] = useState('');
    const [filtroDataFim, setFiltroDataFim] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');

    // Função para buscar as transações com filtros
    const fetchTransacoes = async () => {
        try {
            const params: any = {};
            if (filtroTipo) params.tipo = filtroTipo;
            if (filtroCategoria) params.categoria = filtroCategoria;
            if (filtroDataInicio) params.dataInicio = filtroDataInicio;
            if (filtroDataFim) params.dataFim = filtroDataFim;

            const response = await api.get('/transacoes', { params });
            setTransacoes(response.data);
        } catch (err) {
            console.error('Erro ao carregar transações:', err);
            setMsg('Erro ao carregar as transações');
        }
    };

    // Chama a função fetchTransacoes quando o componente for montado ou quando os filtros mudarem
    useEffect(() => {
        fetchTransacoes();
    }, [filtroTipo, filtroCategoria, filtroDataInicio, filtroDataFim]);

    // Função para cadastrar transação
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
            if (tipo === 'Saída' && !categoria) {
                setMsg('A categoria é obrigatória para transações de saída.');
                return;
            }

            await api.post('/transacoes', { descricao, valor, tipo, data, categoria: tipo === 'Saída' ? categoria : null });
            setMsg('Transação criada com sucesso!');
            fetchTransacoes(); // Atualiza a lista de transações após cadastrar uma nova
            setDescricao('');
            setValor('');
            setTipo('Entrada');
            setData('');
            setCategoria('');
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Erro ao criar transação';
            setMsg(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="transaction-container">
            <h1>Registrar Transação</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                    <input id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="valor">Valor</label>
                    <input id="valor" type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="tipo">Tipo</label>
                    <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="Entrada">Entrada</option>
                        <option value="Saída">Saída</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="data">Data</label>
                    <input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)} required />
                </div>

                {tipo === 'Saída' && (
                    <div>
                        <label htmlFor="categoria">Categoria</label>
                        <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                            <option value="">Selecione</option>
                            <option value="Essenciais">Essenciais</option>
                            <option value="Não essenciais">Não essenciais</option>
                            <option value="Imprevistos">Imprevistos</option>
                        </select>
                    </div>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>

            {msg && <p>{msg}</p>}

            <h2>Filtros</h2>
            <div>
                <label htmlFor="filtroDataInicio">Data Início</label>
                <input id="filtroDataInicio" type="date" value={filtroDataInicio} onChange={(e) => setFiltroDataInicio(e.target.value)} />
            </div>
            <div>
                <label htmlFor="filtroDataFim">Data Fim</label>
                <input id="filtroDataFim" type="date" value={filtroDataFim} onChange={(e) => setFiltroDataFim(e.target.value)} />
            </div>
            <div>
                <label htmlFor="filtroTipo">Tipo</label>
                <select id="filtroTipo" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Saída">Saída</option>
                </select>
            </div>
            <div>
                <label htmlFor="filtroCategoria">Categoria</label>
                <select id="filtroCategoria" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                    <option value="">Todas</option>
                    <option value="Essenciais">Essenciais</option>
                    <option value="Não essenciais">Não essenciais</option>
                    <option value="Imprevistos">Imprevistos</option>
                </select>
            </div>

            <h2>Transações Cadastradas</h2>
            <ul>
                {transacoes.length === 0 ? (
                    <li>Não há transações registradas.</li>
                ) : (
                    transacoes.map((transacao) => (
                        <li key={transacao.id}>
                            <strong>{transacao.descricao}</strong><br />
                            Valor: {transacao.valor}<br />
                            Tipo: {transacao.tipo}<br />
                            Categoria: {transacao.categoria || 'N/A'}<br />
                            Data: {new Date(transacao.data).toLocaleDateString()}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { api } from '../api'; // Certifique-se de que o 'api' está configurado corretamente

export default function TransactionForm() {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState<number | string>('');
    const [tipo, setTipo] = useState('Entrada');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null); // Estado para mensagens de feedback
    const [transacoes, setTransacoes] = useState<any[]>([]); // Estado para armazenar as transações

    // Função para buscar as transações
    const fetchTransacoes = async () => {
        try {
            const response = await api.get('/transacoes'); // Faz a requisição GET para buscar as transações
            setTransacoes(response.data); // Atualiza o estado com as transações
        } catch (err) {
            console.error('Erro ao carregar transações:', err);
            setMsg('Erro ao carregar as transações');
        }
    };

    // Chama a função fetchTransacoes quando o componente for montado
    useEffect(() => {
        fetchTransacoes();
    }, []); // O array vazio significa que o efeito roda apenas uma vez, no momento em que o componente é montado

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
            // Envia os dados da transação para o backend
            await api.post('/transacoes', { descricao, valor, tipo, data });
            setMsg('Transação criada com sucesso!');
            fetchTransacoes(); // Atualiza a lista de transações após cadastrar uma nova
            // Limpa o formulário após o envio (opcional)
            setDescricao('');
            setValor('');
            setTipo('Entrada');
            setData('');
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
                    <input
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="valor">Valor</label>
                    <input
                        id="valor"
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        required
                    />
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
                    <input
                        id="data"
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
            {msg && <p>{msg}</p>}

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
                            Data: {new Date(transacao.data).toLocaleDateString()}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { api } from '../api'; // Certifique-se de que 'api' está configurado corretamente

export default function BudgetForm() {
    const [descricao, setDescricao] = useState('');
    const [essenciais, setEssenciais] = useState<number | string>('');
    const [naoEssenciais, setNaoEssenciais] = useState<number | string>('');
    const [imprevistos, setImprevistos] = useState<number | string>('');

    const [poupanca, setPoupanca] = useState<number | string>('');
    const [investimentos, setInvestimentos] = useState<number | string>('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null); // Estado para mensagens de feedback
    const [orcamentos, setOrcamentos] = useState<any[]>([]); // Estado para armazenar os orçamentos

    // Função para buscar os orçamentos
    const fetchOrcamentos = async () => {
        try {
            const response = await api.get('/orcamentos'); // Faz a requisição GET para buscar os orçamentos
            setOrcamentos(response.data); // Atualiza o estado com os orçamentos
        } catch (err) {
            console.error('Erro ao carregar orçamentos:', err);
            setMsg('Erro ao carregar os orçamentos');
        }
    };

    // Chama a função fetchOrcamentos quando o componente for montado
    useEffect(() => {
        fetchOrcamentos();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
            // Envia os dados do orçamento para o backend
            await api.post('/orcamentos', { descricao, essenciais, naoEssenciais, imprevistos, poupanca, investimentos });
            setMsg('Orçamento criado com sucesso!');
            fetchOrcamentos(); // Atualiza a lista de orçamentos após cadastrar um novo
            // Limpa o formulário após o envio (opcional)
            setDescricao('');
            setEssenciais('');
            setNaoEssenciais('');
            setPoupanca('');
            setInvestimentos('');
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Erro ao criar orçamento';
            setMsg(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="budget-container">
            <h1>Cadastrar Orçamento</h1>
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
                    <label htmlFor="essenciais">Essenciais</label>
                    <input
                        id="essenciais"
                        type="number"
                        value={essenciais}
                        onChange={(e) => setEssenciais(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="naoEssenciais">Não Essenciais</label>
                    <input
                        id="naoEssenciais"
                        type="number"
                        value={naoEssenciais}
                        onChange={(e) => setNaoEssenciais(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="imprevistos">imprevistos</label>
                    <input
                        id="imprevistos"
                        type="number"
                        value={imprevistos}
                        onChange={(e) => setImprevistos(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="poupanca">Poupança</label>
                    <input
                        id="poupanca"
                        type="number"
                        value={poupanca}
                        onChange={(e) => setPoupanca(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="investimentos">Investimentos</label>
                    <input
                        id="investimentos"
                        type="number"
                        value={investimentos}
                        onChange={(e) => setInvestimentos(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
            {msg && <p>{msg}</p>}
            <h2>Orçamentos Cadastrados</h2>
            <ul>
                {orcamentos.length === 0 ? (
                    <li>Não há orçamentos registrados.</li>
                ) : (
                    orcamentos.map((orcamento) => (
                        <li key={orcamento.id}>
                            <strong>{orcamento.descricao}</strong><br />
                            Essenciais: {orcamento.essenciais}<br />
                            Não Essenciais: {orcamento.naoEssenciais}<br />
                            imprevistos: {orcamento.imprevistos}<br />
                            Poupança: {orcamento.poupanca}<br />
                            Investimentos: {orcamento.investimentos}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
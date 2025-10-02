import { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function OrcamentoForm() {
    const [descricao, setDescricao] = useState('');
    const [essenciais, setEssenciais] = useState<string>('');
    const [naoEssenciais, setNaoEssenciais] = useState<string | number>('');
    const [poupanca, setPoupanca] = useState<string | number>('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
            await api.post('/orcamentos', { descricao, essenciais, naoEssenciais, poupanca });
            setMsg('orcamento criada com sucesso!');
            setTimeout(() => navigate('/home'), 1000); // Redireciona após 1 segundo
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Erro ao criar orcamento';
            setMsg(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="transaction-container">
            <h1>Registrar meta</h1>
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
                    <label htmlFor="essenciais">essenciais</label>
                    <input
                        id="essenciais"
                        type="number"
                        value={essenciais}
                        onChange={(e) => setEssenciais(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="naoEssenciais">naoEssenciais</label>
                    <input
                        id="naoEssenciais"
                        type="number"
                        value={naoEssenciais}
                        onChange={(e) => setNaoEssenciais(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="poupanca">poupanca</label>
                    <input
                        id="poupanca"
                        type="number"
                        value={poupanca}
                        onChange={(e) => setPoupanca(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
            {msg && <p>{msg}</p>}
        </div>
    );
}


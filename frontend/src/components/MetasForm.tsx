import { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function MetasForm() {
    const [descricao, setDescricao] = useState('');
    const [valorTotal, setValorTotal] = useState<number | string>('');
    const [valorInicial, setValorInicial] = useState<number | string>('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
            await api.post('/metas', { descricao, valorTotal, valorInicial });
            setMsg('Meta cadastrada com sucesso!');
            setTimeout(() => navigate('/home'), 1000); // Redireciona após 1 segundo
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Erro ao cadastrar meta';
            setMsg(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="metas-container">
            <h1>Cadastrar Meta</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nomeMeta">Nome da Meta</label>
                    <input
                        id="nomeMeta"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="valorTotal">Valor Total</label>
                    <input
                        id="valorTotal"
                        type="number"
                        value={valorTotal}
                        onChange={(e) => setValorTotal(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="valorInicial">Valor Inicial</label>
                    <input
                        id="valorInicial"
                        type="number"
                        value={valorInicial}
                        onChange={(e) => setValorInicial(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar Meta'}
                </button>
            </form>
            {msg && <p>{msg}</p>}
        </div>
    );
}

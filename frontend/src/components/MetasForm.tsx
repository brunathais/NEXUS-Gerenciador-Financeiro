import { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function MetasForm() {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState<number | string>('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
            await api.post('/metas', { descricao, valor, data });
            setMsg('meta criada com sucesso!');
            setTimeout(() => navigate('/home'), 1000); // Redireciona após 1 segundo
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Erro ao criar meta';
            setMsg(msg);
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="transaction-container">
                 <link rel="stylesheet" href="metas.css" />
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
        </div>
    );
}

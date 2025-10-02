import { useEffect, useState } from 'react';
import { api } from '../api';

export default function MetasForm() {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState<number | string>('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const [metas, setMetas] = useState<any[]>([]);

    const fetchMetas = async () => {
        try {
            const response = await api.get('/metas')
            setMetas(response.data)
        } catch (err) {
            console.error('Erro ao carregar metas:', err);
            setMsg('Erro ao carregar as metas');
        }
    }

    useEffect(() => {
        fetchMetas()
    }, [])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
            await api.post('/metas', { descricao, valor, data });
            setMsg('meta criada com sucesso!');
            fetchMetas();
            setDescricao('');
            setValor('');
            setData('');
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

            <h2>Metas Cadastradas</h2>
            <ul>
                {metas.length === 0 ? (
                    <li>Nenhuma meta cadastrada</li>
                ) : (
                    metas.map((meta) => (
                        <li key={meta.id}>
                            <strong>{meta.descricao}</strong> <br />
                            Valor: {meta.valor} <br />
                            Data alvo: {new Date(meta.data).toLocaleDateString()}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}


import { useState, useEffect } from 'react';
import { api } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

export default function ContaEdit() {
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState<'PAGAR' | 'RECEBER'>('PAGAR');
    const [valor, setValor] = useState<number | string>('');
    const [dataVencimento, setDataVencimento] = useState('');
    const [observacao, setObservacao] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);

    const navigate = useNavigate();
    const { id } = useParams();

    // Carregar dados da conta para edição
    useEffect(() => {
        const fetchConta = async () => {
            try {
                const response = await api.get(`/contas/${id}`);
                const { descricao, tipo, valor, dataVencimento, observacao } = response.data;
                setDescricao(descricao);
                setTipo(tipo);
                setValor(valor);
                setDataVencimento(dataVencimento);
                setObservacao(observacao);
            } catch (err) {
                console.error('Erro ao carregar a conta para edição:', err);
            }
        };

        if (id) {
            fetchConta();
        }
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
            await api.put(`/contas/${id}`, { descricao, tipo, valor, dataVencimento, observacao });
            setMsg('Conta atualizada com sucesso!');
            setTimeout(() => navigate('/contas'), 1000);
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Erro ao atualizar conta';
            setMsg(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Editar Conta</h1>
            <form onSubmit={handleSubmit}>
                {/* Campos de formulário semelhantes ao de cadastro */}
                <div>
                    <label>Descrição</label>
                    <input
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                        required
                        placeholder="Digite a descrição"
                    />
                </div>
                <div>
                    <label>Tipo</label>
                    <select
                        value={tipo}
                        onChange={e => setTipo(e.target.value as 'PAGAR' | 'RECEBER')}
                    >
                        <option value="PAGAR">Pagar</option>
                        <option value="RECEBER">Receber</option>
                    </select>
                </div>
                <div>
                    <label>Valor</label>
                    <input
                        type="number"
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                        required
                        placeholder="Digite o valor"
                    />
                </div>
                <div>
                    <label>Data de Vencimento</label>
                    <input
                        type="date"
                        value={dataVencimento}
                        onChange={e => setDataVencimento(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Observação</label>
                    <input
                        value={observacao}
                        onChange={e => setObservacao(e.target.value)}
                        placeholder="Digite uma observação (opcional)"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Atualizando...' : 'Atualizar'}
                </button>
            </form>
            {msg && <p>{msg}</p>}
        </div>
    );
}

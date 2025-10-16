import { useState } from 'react';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';
import MetaCard from './MetaCard';

const categorias = ['reserva', 'viagem', 'dividas', 'bens', 'outros'] as const;
const prioridades = ['ALTA', 'MEDIA', 'BAIXA'] as const;
const flexes = ['FIXA', 'PODE_ADIAR'] as const;
const recorrencias = ['UNICA', 'ANUAL', 'MENSAL', 'SEMESTRAL', 'TRIMESTRAL'] as const;
const visibilidades = ['PRIVADA', 'COMPARTILHADA'] as const;

export default function MetaForm() {
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState<typeof categorias[number]>('outros');
    const [valorAlvo, setValorAlvo] = useState<number | string>('');
    const [dataAlvo, setDataAlvo] = useState<string>('');
    const [prioridade, setPrioridade] = useState<typeof prioridades[number]>('MEDIA');
    const [flexibilidade, setFlexibilidade] = useState<typeof flexes[number]>('PODE_ADIAR');
    const [contribuicaoMensal, setContribuicaoMensal] = useState<number | string>('');
    const [permiteDepositosExtras, setPermiteDepositosExtras] = useState(true);
    const [tipoRecorrencia, setTipoRecorrencia] = useState<typeof recorrencias[number]>('UNICA');
    const [visibilidade, setVisibilidade] = useState<typeof visibilidades[number]>('PRIVADA');
    const [compartilhadoCom, setCompartilhadoCom] = useState(''); // csv de emails

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
            const payload = {
                nome, categoria,
                valorAlvo: Number(valorAlvo),
                dataAlvo: dataAlvo || null,
                prioridade, flexibilidade,
                contribuicaoMensal: Number(contribuicaoMensal || 0),
                permiteDepositosExtras,
                tipoRecorrencia, visibilidade,
                compartilhadoCom: compartilhadoCom
                    ? compartilhadoCom.split(',').map(s => s.trim()).filter(Boolean)
                    : null,
            };
            await api.post('/metas', payload);
            setMsg('Meta criada com sucesso!');
            setTimeout(() => navigate('/home'), 800);
        } catch (err: any) {
            const m = err?.response?.data?.message || 'Erro ao criar meta';
            setMsg(m);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="meta-form">
            <h1>Nova Meta</h1>
            <form onSubmit={handleSubmit}>
                <label>Nome</label>
                <input value={nome} onChange={e => setNome(e.target.value)} required />

                <label>Categoria</label>
                <select value={categoria} onChange={e => setCategoria(e.target.value as any)}>
                    {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <label>Valor-alvo (R$)</label>
                <input type="number" step="0.01" value={valorAlvo} onChange={e => setValorAlvo(e.target.value)} required />

                <label>Data-alvo (opcional)</label>
                <input type="date" value={dataAlvo} onChange={e => setDataAlvo(e.target.value)} />

                <label>Prioridade</label>
                <select value={prioridade} onChange={e => setPrioridade(e.target.value as any)}>
                    {prioridades.map(p => <option key={p} value={p}>{p}</option>)}
                </select>

                <label>Flexibilidade</label>
                <select value={flexibilidade} onChange={e => setFlexibilidade(e.target.value as any)}>
                    {flexes.map(f => <option key={f} value={f}>{f}</option>)}
                </select>

                <label>Contribuição mensal (R$)</label>
                <input type="number" step="0.01" value={contribuicaoMensal} onChange={e => setContribuicaoMensal(e.target.value)} />

                <label>Depósitos extras permitidos</label> {/** talvez deixar por dafault como permitido */}
                <input type="checkbox" checked={permiteDepositosExtras} onChange={e => setPermiteDepositosExtras(e.target.checked)} />

                <label>Recorrência</label> {/** não seria obrigatorio */}
                <select value={tipoRecorrencia} onChange={e => setTipoRecorrencia(e.target.value as any)}>
                    {recorrencias.map(r => <option key={r} value={r}>{r}</option>)}
                </select>

                <label>Visibilidade</label> {/** aqui teria que ver sobre as outras contas cadastradas */}
                <select value={visibilidade} onChange={e => setVisibilidade(e.target.value as any)}>
                    {visibilidades.map(v => <option key={v} value={v}>{v}</option>)}
                </select>

                {visibilidade === 'COMPARTILHADA' && (
                    <>
                        <label>Compartilhar com (emails, separados por vírgula)</label>
                        <input value={compartilhadoCom} onChange={e => setCompartilhadoCom(e.target.value)} placeholder="pessoa@exemplo.com, outra@exemplo.com" />
                    </>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>
            </form>
            {msg && <p>{msg}</p>}

        </div>
    );
}

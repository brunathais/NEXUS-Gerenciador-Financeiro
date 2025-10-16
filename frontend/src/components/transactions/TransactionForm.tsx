import { useEffect, useState } from 'react';
import { Categoria, Transacao, Tipo } from './types';
import { TransactionFields } from './TransactionFields';

type Props = {
    editing: Transacao | null;
    onSaved: () => void;
    onCancel: () => void;
    createOrUpdate: (payload: Omit<Transacao, 'id'>, editingId?: number) => Promise<void>;
    setMsg: (m: string | null) => void;
};

export function TransactionForm({ editing, onSaved, onCancel, createOrUpdate, setMsg }: Props) {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState<string>('');
    const [tipo, setTipo] = useState<Tipo>('Entrada');
    const [data, setData] = useState('');
    const [categoria, setCategoria] = useState<Categoria>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!editing) {
            setDescricao(''); setValor(''); setTipo('Entrada'); setData(''); setCategoria(null); return;
        }
        setDescricao(editing.descricao);
        setValor(String(editing.valor));
        setTipo(editing.tipo);
        // se sua API envia ISO, converta pra yyyy-MM-dd
        const d = new Date(editing.data);
        const ymd = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10);
        setData(ymd);
        setCategoria(editing.tipo === 'Saída' ? editing.categoria : null);
    }, [editing]);

    useEffect(() => { if (tipo === 'Entrada') setCategoria(null); }, [tipo]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { descricao, valor: Number(valor), tipo, data, categoria: tipo === 'Saída' ? categoria : null };
            await createOrUpdate(payload, editing?.id ?? undefined);
            onSaved();
        } catch (err: any) {
            const m = err?.response?.data?.message || 'Falha ao salvar';
            setMsg(m);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TransactionFields
                descricao={descricao} setDescricao={setDescricao}
                valor={valor} setValor={setValor}
                tipo={tipo} setTipo={setTipo}
                data={data} setData={setData}
                categoria={categoria} setCategoria={setCategoria}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button type="submit" disabled={loading}>
                    {loading ? (editing ? 'Salvando...' : 'Cadastrando...') : (editing ? 'Salvar' : 'Cadastrar')}
                </button>
                {editing && (
                    <button type="button" onClick={onCancel} disabled={loading}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}

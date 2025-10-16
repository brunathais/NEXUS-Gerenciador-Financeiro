// TransactionList.tsx
import { Transacao } from './types';
import { TransactionItem } from './TransactionItem';

type Props = {
    transacoes: Transacao[];
    loading: boolean;
    onEdit: (t: Transacao) => void;
    onDelete: (id: number) => Promise<void>;
    onDuplicate: (id: number) => Promise<void>;
};

export function TransactionList({ transacoes, loading, onEdit, onDelete, onDuplicate }: Props) {
    if (loading) return <p>Carregando...</p>;
    if (transacoes.length === 0) return <p>Não há transações registradas.</p>;

    return (
        <ul>
            {transacoes.map(t => (
                <TransactionItem
                    key={t.id}
                    t={t}
                    onEdit={() => onEdit(t)}
                    onDelete={() => onDelete(t.id)}
                    onDuplicate={() => onDuplicate(t.id)}
                />
            ))}
        </ul>
    );
}

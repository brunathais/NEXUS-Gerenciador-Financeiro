// TransactionItem.tsx
import { Transacao } from './types';
import { useConfirm } from './useConfirm';

type Props = {
    t: Transacao;
    onEdit: () => void;
    onDelete: () => Promise<void>;
    onDuplicate: () => Promise<void>;
};

export function TransactionItem({ t, onEdit, onDelete, onDuplicate }: Props) {
    const { confirm } = useConfirm();

    async function askDelete() {
        const ok = confirm(
            `Confirma excluir?

• ${t.descricao}
• ${t.tipo} • ${t.categoria ?? 'N/A'}
• Valor: ${t.valor}
• Data: ${new Date(t.data).toLocaleDateString()}`
        );
        if (ok) await onDelete();
    }

    return (
        <li style={{ marginBottom: 10 }}>
            <strong>{t.descricao}</strong><br />
            Valor: {t.valor}<br />
            Tipo: {t.tipo}<br />
            Categoria: {t.categoria || 'N/A'}<br />
            Data: {new Date(t.data).toLocaleDateString()}<br />
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <button type="button" onClick={onEdit}>Editar</button>
                <button type="button" onClick={askDelete}>Excluir</button>
                <button type="button" onClick={onDuplicate}>Duplicar</button>
            </div>
        </li>
    );
}

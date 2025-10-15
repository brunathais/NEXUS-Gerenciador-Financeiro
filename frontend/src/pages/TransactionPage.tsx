import { useState } from 'react';
import { useTransactions } from '../components/transactions/useTransactions';
import { TransactionForm } from '../components/transactions/TransactionForm';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionList } from '../components/transactions/TransactionList';
import { Transacao } from '../components/transactions/types';

export default function TransactionPage() {
    const tx = useTransactions();
    const [editing, setEditing] = useState<Transacao | null>(null);

    function startEdit(t: Transacao) { setEditing(t); }
    function cancelEdit() { setEditing(null); }

    return (
        <div className="transaction-container">
            <h1>{editing ? 'Editar Transação' : 'Registrar Transação'}</h1>

            <TransactionForm
                editing={editing}
                onSaved={() => setEditing(null)}
                onCancel={cancelEdit}
                createOrUpdate={tx.createOrUpdate}
                setMsg={tx.setMsg}
            />

            {tx.msg && <p style={{ marginTop: 8 }}>{tx.msg}</p>}

            <h2>Filtros</h2>
            {/**<TransactionFilters filtros={tx.filtros} setFiltros={tx.setFiltros} />*/}

            <h2 style={{ marginTop: 24 }}>Transações</h2>
            <TransactionList
                transacoes={tx.transacoes}
                loading={tx.loading}
                onEdit={startEdit}
                onDelete={tx.del}
                onDuplicate={tx.duplicate}
            />
        </div>
    );
}

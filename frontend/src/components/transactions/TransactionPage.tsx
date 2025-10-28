import { useEffect, useState } from 'react';
import { useTransactions } from './useTransactions';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { Transacao, TransactionSummaryData } from './types';
import { api } from '../../api';
import { SummaryCards } from '../SummaryCards';
import { TransactionFilters } from './TransactionFilters';

export default function TransactionPage() {
    const [resumo, setResumo] = useState<TransactionSummaryData | null>(null);

    const fetchResumo = async () => {
        try {
            const { data } = await api.get('/transacoes/resumo');
            setResumo(data);  // Atualiza o estado com os dados do resumo
        } catch (err) {
            console.error('Erro ao carregar o resumo:', err);
        }
    };

    useEffect(() => {
        fetchResumo(); // Inicialmente carrega os dados do resumo
    }, []); // O efeito roda uma vez quando a página é carregada


    const tx = useTransactions();
    const [editing, setEditing] = useState<Transacao | null>(null);

    function startEdit(t: Transacao) { setEditing(t); }
    function cancelEdit() { setEditing(null); }

    return (
        <div className="transaction-container">
            <h1>{editing ? 'Editar Transação' : 'Registrar Transação'}</h1>

            {/** funcional mas sem atualização automatica 
 *                 <TransactionForm
                    editing={editing}
                    onSaved={() => setEditing(null)}
                    onCancel={cancelEdit}
                    createOrUpdate={tx.createOrUpdate}
                    setMsg={tx.setMsg}
                />
*/}

            <TransactionForm
                editing={editing}
                onSaved={async () => {
                    setEditing(null);
                    await fetchResumo(); // Atualiza o resumo após salvar a transação
                }}
                onCancel={cancelEdit}
                createOrUpdate={tx.createOrUpdate}
                setMsg={tx.setMsg}
            />

            <TransactionList
                transacoes={tx.transacoes}
                loading={tx.loading}
                onEdit={startEdit}
                onDelete={async (id) => {
                    await tx.del(id);
                    await fetchResumo();  // Atualiza o resumo após a exclusão
                }}
                onDuplicate={async (id) => {
                    await tx.duplicate(id);
                    await fetchResumo();  // Atualiza o resumo após a duplicação
                }}
            />

            {resumo ? (
                <SummaryCards resumo={resumo} />  // Passa o resumo atualizado como prop
            ) : (
                <p>Carregando...</p>  // Exibe mensagem enquanto carrega os dados
            )}

        </div>
    );
}
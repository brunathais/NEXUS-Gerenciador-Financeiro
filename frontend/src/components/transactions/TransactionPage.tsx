// src/pages/TransactionPage.tsx
import { useEffect, useState } from 'react';
import { useTransactions } from './useTransactions';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { Transacao, TransactionSummaryData } from './types';
import { api } from '../../api';
import { SummaryCards } from '../SummaryCards';
import { TransactionFilters } from './TransactionFilters';
import TransactionChart  from '../transactions/TransactionChart'; // Importa o gráfico

export default function TransactionPage() {
    const [resumo, setResumo] = useState<TransactionSummaryData | null>(null);

    useEffect(() => {
        const fetchResumo = async () => {
            try {
                const { data } = await api.get('/transacoes/resumo');
                setResumo(data); // Atualiza o estado com os dados do resumo
            } catch (err) {
                console.error('Erro ao carregar o resumo:', err);
            }
        };

        fetchResumo();  // Chama a função para carregar os dados
    }, []); // O efeito roda uma vez quando a página é carregada

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
            <TransactionFilters filtros={tx.filtros} setFiltros={tx.setFiltros} />

            <h2 style={{ marginTop: 24 }}>Transações</h2>
            <TransactionList
                transacoes={tx.transacoes}
                loading={tx.loading}
                onEdit={startEdit}
                onDelete={tx.del}
                onDuplicate={tx.duplicate}
            />

            <h1>Resumo das Transações</h1>
            {/* Verifica se os dados já foram carregados */}
            {resumo ? (
                <SummaryCards resumo={resumo} />  // Passa o resumo como prop
            ) : (
                <p>Carregando...</p>  // Exibe mensagem enquanto carrega os dados
            )}

            <h2>Gráfico de Transações por Categoria</h2>
            <TransactionChart />  {/* Renderiza o gráfico */}
        </div>
    );
}

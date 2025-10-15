import { useState, useEffect } from 'react';
import { api } from '../../api';
import { TransactionSummaryData } from './types';

export const TransactionSummary = () => {
    const [resumo, setResumo] = useState<TransactionSummaryData>({
        somaEntradas: 0,
        somaSaidas: 0,
        somaSaidasPorCategoria: [],
        saldo: 0,
        alertas: [],
    });

    useEffect(() => {
        const fetchResumo = async () => {
            try {
                const { data } = await api.get('/transacoes/resumo');
                setResumo(data);
            } catch (err) {
                console.error('Erro ao buscar resumo das transações:', err);
            }
        };
        fetchResumo();
    }, []);

    return (
        <div>
            <h2>Resumo das Transações</h2>
            <p>Entradas: {resumo.somaEntradas}</p>
            <p>Saídas: {resumo.somaSaidas}</p>
            <p>Saldo: {resumo.saldo}</p>
        </div>
    );
};

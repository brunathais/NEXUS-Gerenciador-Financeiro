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
                console.log(data); // Verifique os dados retornados aqui
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

            {/* Exibindo os alertas de orçamento */}
            {resumo?.alertas.length > 0 && (
                <div style={{ backgroundColor: '#fdd', padding: '10px', borderRadius: '5px' }}>
                    <h3 style={{ color: 'red' }}>Alertas de Orçamento:</h3>
                    <ul>
                        {resumo.alertas.map((alerta, index) => (
                            <li key={index} style={{ color: 'darkred' }}>
                                <strong>{alerta.alerta}</strong><br />
                                <strong>Valor da Transação:</strong> {alerta.valorTransacao?.toFixed(2)} <br />
                                <strong>Limite do Orçamento:</strong> {alerta.limiteOrcamento?.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}


        </div>
    );
};

import { useState, useEffect } from 'react';
import { api } from '../api';

const TransactionSummary = () => {
    const [resumo, setResumo] = useState<any>({
        somaEntradas: 0,
        somaSaidas: 0,
        somaSaidasPorCategoria: [],
        saldo: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchResumo = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/transacoes/resumo');
            setResumo(response.data); // Atualiza os dados do resumo
        } catch (err) {
            console.error('Erro ao buscar resumo das transações:', err);
            setError('Erro ao carregar o resumo');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumo(); // Chama a função para obter os dados de resumo quando o componente for montado
    }, []);

    return (
        <div className="transaction-summary-container">
            <h2>Resumo das Transações</h2>
            {loading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="summary-cards-container">
                    <div className="card">
                        <h3>Total Entradas</h3>
                        <p>{resumo.somaEntradas.toFixed(2)}</p>
                    </div>
                    <div className="card">
                        <h3>Total Saídas</h3>
                        <p>{resumo.somaSaidas.toFixed(2)}</p>
                    </div>
                    <div className="card">
                        <h3>Saldo (Entradas - Saídas)</h3>
                        <p>{resumo.saldo.toFixed(2)}</p>
                    </div>
                    <div className="card">
                        <h3>Saídas por Categoria</h3>
                        <ul>
                            {resumo.somaSaidasPorCategoria.map((categoria: { categoria: string; soma: number }) => (
                                <li key={categoria.categoria}>
                                    <strong>{categoria.categoria}:</strong> {categoria.soma.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionSummary;

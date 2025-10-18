import { TransactionSummaryData } from '../components/transactions/types'; // Tipo de dados do resumo

type Props = {
    resumo: TransactionSummaryData;
};

export const SummaryCards = ({ resumo }: Props) => {
    return (
        <div className="summary-cards-container">
            <div className="summary-card">
                <h3>Total Entradas</h3>
                <p>{resumo.somaEntradas.toFixed(2)}</p>
            </div>

            <div className="summary-card">
                <h3>Total Saídas</h3>
                <p>{resumo.somaSaidas.toFixed(2)}</p>
            </div>

            <div className="summary-card">
                <h3>Saldo</h3>
                <p>{resumo.saldo.toFixed(2)}</p>
            </div>

            <div className="summary-card">
                <h3>Saídas por Categoria</h3>
                <ul>
                    {resumo.somaSaidasPorCategoria.map((cat) => (
                        <li key={cat.categoria}>
                            <strong>{cat.categoria}:</strong> {cat.soma.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Exibindo os alertas de orçamento */}
            {resumo.alertas.length > 0 && (
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

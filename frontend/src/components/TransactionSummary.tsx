import { useEffect, useState } from "react"
import { api } from "../api";

const TransactionSummary = () => {
    const [somaCategoria, setSomaCategoria] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSomaCategoria = async () => {
        {/* Função que faz uma requisição GET para a rota /transacoes/soma-categoria e armazena o resultado no estado somaPorCategoria */ }
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/transacoes/soma-categoria');
            setSomaCategoria(response.data); {/*Armazena a resposta da API, que é a soma das transações por categoria*/ }
        } catch (err) {
            console.error('erro ao buscar soma das categorias:', err);
            setError('erro ao carregar a soma das categorias')
        } finally {
            {/*finally*/ }
            setLoading(false)
        }
    }
    useEffect(() => {
        {/*Chama a função fetchSomaPorCategoria quando o componente for montado para buscar os dados de soma */ }
        {/*useEffect*/ }
        fetchSomaCategoria();
    }, []);

    return (
        <div className="transaction-summary-container">
            <h2>Resumo das Transações por Categoria</h2>
            {loading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="cards-container">
                    {/*Itera sobre as categorias retornadas e exibe cada uma em um card com a soma correspondente.*/}
                    {somaCategoria.map((categoria: { categoria: string; soma: number }) => (
                        <div key={categoria.categoria} className="card">
                            <h3>{categoria.categoria}</h3>
                            <p>Soma: {categoria.soma.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionSummary;



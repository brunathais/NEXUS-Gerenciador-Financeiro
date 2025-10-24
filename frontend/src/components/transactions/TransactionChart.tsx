// src/components/TransactionChart.tsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { api } from '../../api';

// Registrar os elementos necessários para o Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionChart = () => {
    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Busca as transações somadas por categoria
                const { data } = await api.get('/transacoes/soma-categoria');
                const categories = data.somaCategoria.map((item: any) => item.categoria);
                const values = data.somaCategoria.map((item: any) => item.soma);

                // Prepara os dados para o gráfico
                setChartData({
                    labels: categories,
                    datasets: [
                        {
                            label: 'Total de Saídas por Categoria',
                            data: values,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Erro ao carregar os dados do gráfico:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ width: '80%', height: '400px' }}>
            {chartData ? (
                <Bar data={chartData} />
            ) : (
                <p>Carregando gráfico...</p>
            )}
        </div>
    );
};

export default TransactionChart;

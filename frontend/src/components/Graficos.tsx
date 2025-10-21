import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DadoGrafico { categoria: string; total: number; }

const Graficos: React.FC = () => {
  const [dados, setDados] = useState<DadoGrafico[]>([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/graficos');
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchDados();
  }, []);

  const data = {
    labels: dados.map(d => d.categoria),
    datasets: [
      {
        label: 'Total por categoria',
        data: dados.map(d => d.total),
        backgroundColor: [
          '#36A2EB',
          '#FF6384',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
    },
  };

  return (
    <div>

      <h2>Gráfico de Vendas</h2>

      {dados.length > 0 ? ( <Doughnut data={data} options={options} /> ): ( <p> Carregando dados... </p> )}

    </div>
  );
}; export default Graficos;

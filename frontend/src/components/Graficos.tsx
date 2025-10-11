import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/graficos.css';

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,);
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function Graficos() {
    const data = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [
            {
                label: 'Vendas',
                data: [1000, 1500, 2000, 2500, 3000, 3500],
                backgroundColor: 'black',

            },
        ],
        label: {
            color: 'black'
        },
        scales: {
            x: {
                ticks: {
                    color: 'black' // Aqui você define a cor desejada para os rótulos do eixo x (Isso irá ser exibido no gráfico, na tela do browser)
                }
            }
        }
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    color: 'black' // Aqui você define a cor desejada para os rótulos do eixo x (Isso irá ser exibido no gráfico, na tela do browser)
                }
            },
            y: {
                ticks: {
                    color: 'black' // Aqui você define a cor desejada para os rótulos do eixo y (Isso irá ser exibido no gráfico, na tela do browser)
                }
            }
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Gráfico de Barras - Controle Financeiro',
                color: 'black'
            }
        }
    };
// Componentes do grafico de donut =================================================================================================================================

const data2 = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [
            {
                label: 'Gastos',
                data: [750, 1250, 1750, 2250, 2750, 3250],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
            },
        ],
    };
    
    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Gráfico de Rosca - Controle Financeiro',
                color: 'black'
            }
        }
    };

    return (
        <div className="title" >
            <h2>Controle Financeiro - Gráficos</h2>
            <div className="roda-pe-progenitor">
                <Bar data={data} options={options} />
                <p>Vendas - 2024</p>
            </div>
            <div>
                <Doughnut data={data} options={options} />
                <p>Gastos - 2024</p>
            </div>
        </div >
    );

}

import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/graficos.css';
import { color } from "chart.js/helpers";

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,);

export function Graficos() {
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

    return (
        <div className="title" >
            <h2>Controle Financeiro - Gráficos</h2>
            <div className="roda-pe-progenitor">
                <div className="grafico-Barras">
                    <Bar data={data} options={options} />
                    <div className="roda-pe">
                        <p>Vendas - 2024</p>
                    </div>
                </div>
            </div>
        </div >
    );

}

export default Graficos;
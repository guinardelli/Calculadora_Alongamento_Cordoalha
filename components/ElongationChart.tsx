import React, { useMemo } from 'react';
import type { CalculationResult } from '../types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ElongationChartProps {
    result: CalculationResult;
}

const textColor = '#999999';
const titleColor = '#EAEAEA';
const gridColor = '#2a2a2a';
const primaryColor = '#FFD200';
const secondaryColor = '#EAEAEA';


export const ElongationChart: React.FC<ElongationChartProps> = ({ result }) => {
    const { strandInfo, elongation_cm_m, appliedForce_kgf } = result;

    const chartData = useMemo(() => {
        const maxElongation = strandInfo.fp_max_kgf / (strandInfo.area_cm2 * strandInfo.modulus_elasticity);

        return {
            datasets: [
                {
                    label: 'Comportamento da Armadura',
                    data: [
                        { x: 0, y: 0 },
                        { x: strandInfo.fp_max_kgf, y: maxElongation },
                    ],
                    borderColor: primaryColor,
                    backgroundColor: 'rgba(255, 210, 0, 0.5)',
                    tension: 0.1,
                    pointRadius: 0,
                    borderWidth: 2,
                },
                {
                    label: 'Ponto Calculado',
                    data: [{ x: appliedForce_kgf, y: elongation_cm_m }],
                    borderColor: secondaryColor,
                    backgroundColor: secondaryColor,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    showLine: false,
                },
            ],
        };
    }, [result]);

    const chartOptions: ChartOptions<'line'> = useMemo(() => {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null && context.parsed.x !== null) {
                                label += `(${context.parsed.x.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} kgf, ${context.parsed.y.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} cm/m)`;
                            }
                            return label;
                        },
                    },
                },
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Força Aplicada (kgf)',
                        color: titleColor,
                        font: {
                            weight: 'bold',
                        }
                    },
                    grid: {
                        color: gridColor,
                    },
                    ticks: {
                        color: textColor,
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Alongamento (cm/m)',
                         color: titleColor,
                         font: {
                            weight: 'bold',
                        }
                    },
                    grid: {
                        color: gridColor,
                    },
                    ticks: {
                        color: textColor,
                    }
                },
            },
        };
    }, []);

    return (
        <section>
            <h2 className="text-2xl font-bold text-center text-white mb-6 uppercase tracking-wider">Gráfico: Força vs. Alongamento</h2>
            <div className="bg-[var(--dark-card)] border border-[var(--dark-border)] p-2 clip-rhomboid-lg">
                <div className="clip-rhomboid-md overflow-hidden p-4 relative" style={{ height: '400px' }}>
                    <Line options={chartOptions} data={chartData} />
                </div>
            </div>
        </section>
    );
};
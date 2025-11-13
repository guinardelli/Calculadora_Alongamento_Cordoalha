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
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    tension: 0.1,
                    pointRadius: 0,
                    borderWidth: 2,
                },
                {
                    label: 'Ponto Calculado',
                    data: [{ x: appliedForce_kgf, y: elongation_cm_m }],
                    borderColor: 'rgb(239, 68, 68)',
                    backgroundColor: 'rgb(239, 68, 68)',
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
                        font: {
                            weight: 'bold',
                        }
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Alongamento (cm/m)',
                         font: {
                            weight: 'bold',
                        }
                    },
                },
            },
        };
    }, []);

    return (
        <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">Gráfico: Força vs. Alongamento</h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative" style={{ height: '300px' }}>
                <Line options={chartOptions} data={chartData} />
            </div>
        </div>
    );
};
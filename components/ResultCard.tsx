
import React from 'react';
import type { CalculationResult } from '../types';

interface ResultCardProps {
    result: CalculationResult;
}

const formatNumber = (value: number, decimalPlaces: number): string => {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    });
};

const ResultItem: React.FC<{ label: string; value: string; unit: string; highlight?: boolean }> = ({ label, value, unit, highlight = false }) => (
    <div className={`p-4 rounded-lg flex flex-col justify-center ${highlight ? 'bg-blue-50' : 'bg-slate-50'}`}>
        <span className="text-sm text-slate-600">{label}</span>
        <div className="flex items-baseline gap-2">
            <span className={`text-xl font-bold ${highlight ? 'text-blue-700' : 'text-slate-800'}`}>{value}</span>
            <span className="text-sm text-slate-500">{unit}</span>
        </div>
    </div>
);


export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
    const { strandInfo, elongation_cm_m } = result;

    return (
        <div className="mt-8 pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">Resultados Calculados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ResultItem label="Área (A)" value={formatNumber(strandInfo.area_cm2, 4)} unit="cm²" />
                <ResultItem label="Peso" value={formatNumber(strandInfo.weight_kg_m, 3)} unit="kg/m" />
                <ResultItem label="fptk" value={formatNumber(strandInfo.fptk, 0)} unit="kgf/mm²" />
                <ResultItem label="0,77 × fptk" value={formatNumber(strandInfo.fptk_0_77, 1)} unit="kgf/mm²" />
                <ResultItem label="Força Máx." value={formatNumber(strandInfo.fp_max_kgf, 2)} unit="kgf" />
                <ResultItem label="Alongamento (ΔL/m)" value={formatNumber(elongation_cm_m, 4)} unit="cm/m" highlight={true} />
            </div>
        </div>
    );
};

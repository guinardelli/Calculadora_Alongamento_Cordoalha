
import React from 'react';
import type { CalculationResult } from '../types';

const formatNumber = (value: number, decimalPlaces: number): string => {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    });
};

interface CalculationMemoryProps {
    result: CalculationResult;
}

export const CalculationMemory: React.FC<CalculationMemoryProps> = ({ result }) => {
    const { strandInfo, elongation_cm_m, appliedForce_kgf } = result;
    const intermediateCalc = strandInfo.area_cm2 * strandInfo.modulus_elasticity;

    return (
        <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">Memória de Cálculo Detalhada</h3>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-6">
                
                {/* Formula */}
                <div>
                    <p className="font-semibold text-slate-700">Fórmula Utilizada:</p>
                    <p className="text-center bg-white p-3 rounded-md text-lg font-mono tracking-wider shadow-sm mt-1">
                        ΔL/m = Fp / (A × E)
                    </p>
                </div>

                {/* Variable Definitions */}
                <div>
                    <p className="font-semibold text-slate-700 mb-2">Onde:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                        <li><span className="font-mono font-semibold">ΔL/m</span>: Alongamento por metro (cm/m)</li>
                        <li><span className="font-mono font-semibold">Fp</span>: Força de protensão aplicada (kgf)</li>
                        <li><span className="font-mono font-semibold">A</span>: Área da seção do aço (cm²)</li>
                        <li><span className="font-mono font-semibold">E</span>: Módulo de elasticidade (kgf/mm²)</li>
                    </ul>
                </div>

                {/* Substituted Values */}
                <div>
                    <p className="font-semibold text-slate-700 mb-2">Valores Aplicados:</p>
                    <div className="space-y-2 text-slate-800">
                         <p className="font-mono">Fp = {formatNumber(appliedForce_kgf, 2)} kgf</p>
                         <p className="font-mono">A = {formatNumber(strandInfo.area_cm2, 4)} cm²</p>
                         <p className="font-mono">E = {formatNumber(strandInfo.modulus_elasticity, 0)} kgf/mm²</p>
                    </div>
                </div>

                {/* Calculation Steps */}
                <div>
                    <p className="font-semibold text-slate-700 mb-2">Passo a Passo:</p>
                    <div className="space-y-3 text-slate-800">
                        <p className="font-mono">1. Calcular o denominador (A × E):</p>
                        <p className="pl-4 font-mono">{formatNumber(strandInfo.area_cm2, 4)} × {formatNumber(strandInfo.modulus_elasticity, 0)} = {formatNumber(intermediateCalc, 2)}</p>
                        <p className="font-mono">2. Calcular o alongamento (Fp / resultado anterior):</p>
                        <p className="pl-4 font-mono">{formatNumber(appliedForce_kgf, 2)} / {formatNumber(intermediateCalc, 2)} = <span className="font-bold text-blue-700">{formatNumber(elongation_cm_m, 4)} cm/m</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

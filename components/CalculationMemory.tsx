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
        <section>
            <h2 className="text-2xl font-bold text-center text-white mb-6 uppercase tracking-wider">Memória de Cálculo</h2>
            <div className="bg-[var(--dark-card)] border border-[var(--dark-border)] p-6 clip-rhomboid-lg space-y-6">
                <div>
                    <h3 className="font-semibold text-white uppercase tracking-wider text-sm">Fórmula:</h3>
                    <div className="mt-2 p-4 bg-[#101010] border border-[var(--dark-border)] clip-rhomboid-sm text-center">
                        <code className="text-lg font-mono text-[var(--primary-yellow)]">ΔL/m = Fp / (A × E)</code>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-white uppercase tracking-wider text-sm">Onde:</h3>
                        <ul className="mt-2 space-y-1 text-[var(--dark-text-secondary)] text-sm">
                            <li><strong className="text-white">ΔL/m:</strong> Alongamento por metro</li>
                            <li><strong className="text-white">Fp:</strong> Força de protensão</li>
                            <li><strong className="text-white">A:</strong> Área da seção do aço</li>
                            <li><strong className="text-white">E:</strong> Módulo de elasticidade</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white uppercase tracking-wider text-sm">Valores Aplicados:</h3>
                        <div className="mt-2 space-y-1 text-[var(--dark-text-secondary)] font-mono text-sm">
                            <p>Fp = {formatNumber(appliedForce_kgf, 2)} kgf</p>
                            <p>A  = {formatNumber(strandInfo.area_cm2, 4)} cm²</p>
                            <p>E  = {formatNumber(strandInfo.modulus_elasticity, 0)} kgf/mm²</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-white uppercase tracking-wider text-sm">Passo a Passo:</h3>
                    <div className="mt-2 space-y-3 text-[var(--dark-text-secondary)] text-sm">
                        <p>1. <span className="font-mono ml-2">{formatNumber(strandInfo.area_cm2, 4)} × {formatNumber(strandInfo.modulus_elasticity, 0)} = {formatNumber(intermediateCalc, 2)}</span></p>
                        <p>2. <span className="font-mono ml-2">{formatNumber(appliedForce_kgf, 2)} / {formatNumber(intermediateCalc, 2)} = <strong className="text-[var(--primary-yellow)]">{formatNumber(elongation_cm_m, 4)} cm/m</strong></span></p>
                    </div>
                </div>
            </div>
        </section>
    );
};
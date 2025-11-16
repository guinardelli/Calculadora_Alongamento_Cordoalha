import React from 'react';
import type { CalculationResult } from '../types';

const formatNumber = (value: number, decimalPlaces: number): string => {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    });
};

export const ResultCard: React.FC<{ result: CalculationResult }> = ({ result }) => {
    const { strandInfo, elongation_cm_m } = result;

    return (
        <section>
            <h2 className="text-2xl font-bold text-center text-white mb-6 uppercase tracking-wider">Resultados</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--dark-card)] border border-[var(--dark-border)] p-4 rounded-lg">
                    <p className="text-xs text-[var(--dark-text-secondary)] uppercase">Área (A)</p>
                    <p className="text-xl font-bold text-white font-mono">{formatNumber(strandInfo.area_cm2, 4)} <span className="text-sm font-normal text-[var(--dark-text-secondary)]">cm²</span></p>
                </div>
                <div className="bg-[var(--dark-card)] border border-[var(--dark-border)] p-4 rounded-lg">
                    <p className="text-xs text-[var(--dark-text-secondary)] uppercase">Peso</p>
                    <p className="text-xl font-bold text-white font-mono">{formatNumber(strandInfo.weight_kg_m, 3)} <span className="text-sm font-normal text-[var(--dark-text-secondary)]">kg/m</span></p>
                </div>
                <div className="bg-[var(--dark-card)] border border-[var(--dark-border)] p-4 rounded-lg">
                    <p className="text-xs text-[var(--dark-text-secondary)] uppercase">fptk</p>
                    <p className="text-xl font-bold text-white font-mono">{formatNumber(strandInfo.fptk, 0)} <span className="text-sm font-normal text-[var(--dark-text-secondary)]">kgf/mm²</span></p>
                </div>
                <div className="bg-[var(--dark-card)] border border-[var(--dark-border)] p-4 rounded-lg">
                    <p className="text-xs text-[var(--dark-text-secondary)] uppercase">0,77 x fptk</p>
                    <p className="text-xl font-bold text-white font-mono">{formatNumber(strandInfo.fptk_0_77, 1)} <span className="text-sm font-normal text-[var(--dark-text-secondary)]">kgf/mm²</span></p>
                </div>
                <div className="bg-[var(--dark-card)] border border-[var(--dark-border)] p-4 rounded-lg col-span-2">
                    <p className="text-xs text-[var(--dark-text-secondary)] uppercase">Força Máx.</p>
                    <p className="text-xl font-bold text-white font-mono">{formatNumber(strandInfo.fp_max_kgf, 2)} <span className="text-sm font-normal text-[var(--dark-text-secondary)]">kgf</span></p>
                </div>
                <div className="bg-[var(--primary-yellow)] p-4 rounded-lg col-span-2 glow-yellow">
                    <p className="text-sm text-black font-bold uppercase">Alongamento (ΔL/m)</p>
                    <p className="text-3xl font-bold text-black font-mono">{formatNumber(elongation_cm_m, 4)} <span className="text-base font-normal">cm/m</span></p>
                </div>
            </div>
        </section>
    );
};
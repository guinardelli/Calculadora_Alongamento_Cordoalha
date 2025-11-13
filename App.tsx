import React, { useState, useCallback } from 'react';
import { STRAND_DATA } from './constants';
import type { CalculationResult, StrandInfo } from './types';
import { ResultCard } from './components/ResultCard';
import { CalculationMemory } from './components/CalculationMemory';
import { ElongationChart } from './components/ElongationChart';

const App: React.FC = () => {
  const [selectedStrandId, setSelectedStrandId] = useState<string>('');
  const [forceInput, setForceInput] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback(() => {
    setError(null);
    setResult(null);

    if (!selectedStrandId) {
      setError("Selecione o tipo de armadura.");
      return;
    }

    if (!forceInput.trim()) {
      setError("Informe a força de protensão.");
      return;
    }

    const forceValue = parseFloat(forceInput.replace(',', '.'));

    if (isNaN(forceValue)) {
      setError("Força de protensão inválida. Use apenas números.");
      return;
    }

    if (forceValue <= 0) {
      setError("A força de protensão deve ser um valor positivo.");
      return;
    }

    const selectedStrand = STRAND_DATA.find(s => s.id === selectedStrandId);
    if (!selectedStrand) {
      setError("Tipo de armadura selecionado é inválido.");
      return;
    }

    if (forceValue > selectedStrand.fp_max_kgf) {
       const formattedMaxForce = selectedStrand.fp_max_kgf.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      setError(`Força excede o máximo permitido de ${formattedMaxForce} kgf para esta armadura!`);
      return;
    }

    // Fórmula: alongamento_cm_por_m = F / (A * E)
    // Onde A está em cm² e E está em kgf/mm².
    const elongation = forceValue / (selectedStrand.area_cm2 * selectedStrand.modulus_elasticity);

    setResult({
      strandInfo: selectedStrand,
      elongation_cm_m: elongation,
      appliedForce_kgf: forceValue,
    });

  }, [selectedStrandId, forceInput]);

  const handleClear = useCallback(() => {
    setSelectedStrandId('');
    setForceInput('');
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                Calculadora de Alongamento
            </h1>
            <p className="text-slate-600 mt-2">Para Fios e Cordoalhas de Protensão</p>
        </header>

        <main className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input: Tipo de Armadura */}
                <div className="flex flex-col">
                    <label htmlFor="strand-type" className="mb-2 font-semibold text-slate-700">Tipo de Armadura</label>
                    <select
                        id="strand-type"
                        value={selectedStrandId}
                        onChange={(e) => setSelectedStrandId(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
                    >
                        <option value="" disabled>Selecione um tipo...</option>
                        {STRAND_DATA.map(strand => (
                            <option key={strand.id} value={strand.id}>
                                {strand.type} Ø{strand.diameter}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Input: Força de Protensão */}
                <div className="flex flex-col">
                    <label htmlFor="force" className="mb-2 font-semibold text-slate-700">Força de Protensão</label>
                    <div className="relative">
                        <input
                            id="force"
                            type="text"
                            value={forceInput}
                            onChange={(e) => setForceInput(e.target.value)}
                            placeholder="Ex: 12500"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">kgf</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                    onClick={handleCalculate}
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                >
                    Calcular
                </button>
                <button
                    onClick={handleClear}
                    className="w-full bg-slate-500 text-white font-semibold py-3 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-all duration-200"
                >
                    Limpar
                </button>
            </div>
            
            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
                <p className="font-bold">Erro de Entrada</p>
                <p>{error}</p>
              </div>
            )}

            {/* Results Display */}
            {result && !error && (
              <>
                <ResultCard result={result} />
                <CalculationMemory result={result} />
                <ElongationChart result={result} />
              </>
            )}
        </main>
      </div>
    </div>
  );
};

export default App;
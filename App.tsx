import React, { useState, useCallback, useEffect } from 'react';
import { STRAND_DATA } from './constants';
import type { CalculationResult } from './types';
import { ResultCard } from './components/ResultCard';
import { CalculationMemory } from './components/CalculationMemory';
import { ElongationChart } from './components/ElongationChart';

const App: React.FC = () => {
  const [selectedStrandId, setSelectedStrandId] = useState<string>(STRAND_DATA[5].id); // Default to Cord. 12.7
  const [forceInput, setForceInput] = useState<string>('12500'); // Default force
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setResult(null);

    if (!selectedStrandId) {
      setError("Selecione o tipo de armadura.");
      return;
    }
    const forceValue = parseFloat(forceInput.replace(',', '.'));
    if (!forceInput.trim() || isNaN(forceValue)) {
      setError("Informe um valor numérico para a força de protensão.");
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

  // Calculate on initial load with default values
  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-12">
        <header className="text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-16 h-16 bg-[var(--primary-yellow)] flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}>
                <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125a1.125 1.125 0 00-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125z" />
                </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide uppercase">Calculadora de Alongamento</h1>
          </div>
          <p className="text-lg text-[var(--dark-text-secondary)]">Para Fios e Cordoalhas de Protensão</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <section className="bg-[var(--dark-card)] border border-[var(--dark-border)] p-6 clip-rhomboid-lg">
              <form onSubmit={handleCalculate} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--dark-text-secondary)] uppercase tracking-wider mb-2" htmlFor="tipo-armadura">Tipo de Armadura</label>
                  <select
                    id="tipo-armadura"
                    name="tipo-armadura"
                    value={selectedStrandId}
                    onChange={(e) => setSelectedStrandId(e.target.value)}
                    className="block w-full py-3 px-4 text-base border-2 border-[var(--dark-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-yellow)] focus:border-[var(--primary-yellow)] clip-rhomboid-sm bg-[#101010] text-white"
                  >
                    <option value="" disabled>Selecione um tipo...</option>
                    {STRAND_DATA.map(strand => (
                      <option key={strand.id} value={strand.id}>
                          {strand.type} Ø{strand.diameter}mm
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--dark-text-secondary)] uppercase tracking-wider mb-2" htmlFor="forca-protensao">Força de Protensão</label>
                  <div className="relative">
                    <input
                      id="forca-protensao"
                      name="forca-protensao"
                      type="text"
                      placeholder="Ex: 12500"
                      value={forceInput}
                      onChange={(e) => setForceInput(e.target.value)}
                      className="focus:ring-2 focus:ring-[var(--primary-yellow)] focus:border-[var(--primary-yellow)] block w-full pr-14 py-3 px-4 sm:text-base border-2 border-[var(--dark-border)] clip-rhomboid-sm bg-[#101010] text-white"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-[var(--dark-text-secondary)] sm:text-sm">kgf</span>
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="p-3 bg-red-900/50 border border-red-700 text-red-300 clip-rhomboid-sm text-sm">
                    <p>{error}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent clip-rhomboid-sm text-sm font-bold text-black bg-[var(--primary-yellow)] hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--primary-yellow)] transition duration-150 ease-in-out uppercase tracking-wider">Calcular</button>
                  <button type="button" onClick={handleClear} className="w-full flex justify-center py-3 px-4 border-2 border-[var(--dark-border)] clip-rhomboid-sm text-sm font-bold text-[var(--dark-text-secondary)] bg-transparent hover:border-[var(--primary-yellow)] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-gray-500 transition duration-150 ease-in-out uppercase tracking-wider">Limpar</button>
                </div>
              </form>
            </section>
            {result && !error && <ResultCard result={result} />}
          </div>

          <div className="lg:col-span-2 space-y-8">
            {result && !error && (
              <>
                <CalculationMemory result={result} />
                <ElongationChart result={result} />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
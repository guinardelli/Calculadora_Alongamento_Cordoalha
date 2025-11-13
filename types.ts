
export interface StrandInfo {
  id: string;
  type: string;
  diameter: number;
  area_cm2: number;
  weight_kg_m: number;
  fptk: number; // kgf/mm²
  fptk_0_77: number; // kgf/mm²
  fp_max_kgf: number;
  modulus_elasticity: number; // kgf/mm² (E)
}

export interface CalculationResult {
  strandInfo: StrandInfo;
  elongation_cm_m: number;
  appliedForce_kgf: number;
}

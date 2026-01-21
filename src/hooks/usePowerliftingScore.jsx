import { useMemo } from "react";

// Wilks 2020 coefficients (a..f) for bodyweight in kg, total in kg
// Source: Wilks Coefficient (2020 version)
const WILKS2020 = {
  male: {
    a: 47.46178854,
    b: 8.472061379,
    c: 0.07369410346,
    d: -0.001395833811,
    e: 0.00000707665973070743,
    f: -0.0000000120804336482315,
  },
  female: {
    a: -125.4255398,
    b: 13.71219419,
    c: -0.03307250631,
    d: -0.001050400051,
    e: 0.00000938773881462799,
    f: -0.000000023334613884954,
  },
};

// IPF GL Points coefficients (A,B,C) for 3-lift (SQ+BP+DL)
// Source: Championships-IPF-GL.xlsm
const IPF_GL = {
  male: {
    classic: { A: 1199.72839, B: 1025.18162, C: 0.00921 },
    equipped: { A: 1236.25115, B: 1449.21864, C: 0.01644 },
  },
  female: {
    classic: { A: 610.32796, B: 1045.59282, C: 0.03048 },
    equipped: { A: 758.63878, B: 949.31382, C: 0.02435 },
  },
};

const toNum = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const wilks2020Score = (sex, bodyweightKg, totalKg) => {
  const bw = toNum(bodyweightKg);
  const t = toNum(totalKg);
  if (bw <= 0 || t <= 0) return null;

  const { a, b, c, d, e, f } = WILKS2020[sex];
  const denom =
    a + b * bw + c * bw ** 2 + d * bw ** 3 + e * bw ** 4 + f * bw ** 5;

  if (!Number.isFinite(denom) || denom === 0) return null;

  const coeff = 600 / denom;
  const score = t * coeff;
  return Number.isFinite(score) ? score : null;
};

const ipfGlPoints = (sex, equipment, bodyweightKg, totalKg) => {
  const bw = toNum(bodyweightKg);
  const t = toNum(totalKg);
  if (bw <= 0 || t <= 0) return null;

  const { A, B, C } = IPF_GL[sex][equipment];
  const coeff = 100 / (A - B * Math.exp(-C * bw));
  const pts = t * coeff;
  return Number.isFinite(pts) ? pts : null;
};

export default function usePowerliftingScore({
  sex = "female",
  equipment = "classic",
  bodyweightKg,
  squatKg,
  benchKg,
  deadliftKg,
}) {
  return useMemo(() => {
    const total = toNum(squatKg) + toNum(benchKg) + toNum(deadliftKg);

    const wilks = wilks2020Score(sex, bodyweightKg, total);
    const ipf = ipfGlPoints(sex, equipment, bodyweightKg, total);

    return {
      totalKg: total > 0 ? total : 0,
      wilks2020: wilks,
      ipfGl: ipf,
    };
  }, [sex, equipment, bodyweightKg, squatKg, benchKg, deadliftKg]);
}

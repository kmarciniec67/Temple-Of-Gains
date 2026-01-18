import { useMemo } from "react";

const toNum = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export default function useCalories({
  sex = "female",
  ageYears,
  heightCm,
  weightKg,
  activity = 1.2,
  goalDelta = 0,
}) {
  return useMemo(() => {
    const age = toNum(ageYears);
    const h = toNum(heightCm);
    const w = toNum(weightKg);
    const act = Number(activity);

    if (age <= 0 || h <= 0 || w <= 0 || !Number.isFinite(act)) {
      return { bmr: null, tdee: null, target: null };
    }

    // Mifflin–St Jeor
    const base = 10 * w + 6.25 * h - 5 * age;
    const bmr = sex === "male" ? base + 5 : base - 161;

    const tdee = bmr * act;
    const target = tdee + Number(goalDelta || 0);

    return {
      bmr,
      tdee,
      target,
    };
  }, [sex, ageYears, heightCm, weightKg, activity, goalDelta]);
}

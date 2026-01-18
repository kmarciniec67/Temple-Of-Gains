import { useMemo } from "react";

const calcBmi = (weightKg, heightCm) => {
  const w = Number(weightKg);
  const hcm = Number(heightCm);
  if (!Number.isFinite(w) || !Number.isFinite(hcm) || hcm <= 0) return null;
  const hm = hcm / 100;
  const bmi = w / (hm * hm);
  return Number.isFinite(bmi) ? bmi : null;
};

const classifyBmi = (bmi) => {
  if (!Number.isFinite(bmi))
    return { label: "Brak danych BMI", kind: "neutral" };
  if (bmi < 18.5) return { label: "Niedowaga", kind: "bad" };
  if (bmi < 25) return { label: "W normie", kind: "ok" };
  if (bmi < 30) return { label: "Nadwaga", kind: "warn" };
  return { label: "Otyłość", kind: "bad" };
};

export default function useBmiData(measurements, formatDate) {
  const chartData = useMemo(() => {
    return (measurements || [])
      .map((m) => {
        const bmi = calcBmi(m?.body_weight, m?.height);
        const rawDate = new Date(m?.date).getTime();
        if (!Number.isFinite(rawDate) || bmi === null) return null;

        return {
          date: formatDate
            ? formatDate(m.date)
            : new Date(m.date).toLocaleDateString("pl-PL"),
          bmi: Number(bmi.toFixed(2)),
          rawDate,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.rawDate - b.rawDate)
      .map(({ rawDate, ...rest }) => rest);
  }, [measurements, formatDate]);

  const latest = chartData.length ? chartData[chartData.length - 1] : null;
  const status = classifyBmi(latest?.bmi);

  return { chartData, latest, status };
}

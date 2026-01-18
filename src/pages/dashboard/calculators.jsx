import React, { useState } from "react";
import styles from "./Calculators.module.css";

import usePowerliftingScore from "../../hooks/usePowerliftingScore";
import useCalories from "../../hooks/useCalories";

const round1 = (x) => (x == null ? "-" : (Math.round(x * 10) / 10).toFixed(1));
const round0 = (x) => (x == null ? "-" : Math.round(x).toString());

export default function Calculators() {
  // powerlifting
  const [sex, setSex] = useState("female");
  const [equipment, setEquipment] = useState("classic");
  const [bw, setBw] = useState("");
  const [sq, setSq] = useState("");
  const [bp, setBp] = useState("");
  const [dl, setDl] = useState("");

  const scores = usePowerliftingScore({
    sex,
    equipment,
    bodyweightKg: bw,
    squatKg: sq,
    benchKg: bp,
    deadliftKg: dl,
  });

  // calories
  const [cSex, setCSex] = useState("female");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [goal, setGoal] = useState("0");

  const cal = useCalories({
    sex: cSex,
    ageYears: age,
    heightCm: height,
    weightKg: weight,
    activity: Number(activity),
    goalDelta: Number(goal),
  });

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Kalkulatory</h1>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.h2}>Wilks 2020 / IPF GL Points</h2>
          <div className={styles.sub}>SQ + BP + DL</div>
        </div>

        <div className={styles.grid2}>
          <label className={styles.label}>
            Płeć
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className={styles.input}
            >
              <option value="female">Kobieta</option>
              <option value="male">Mężczyzna</option>
            </select>
          </label>

          <label className={styles.label}>
            IPF: Sprzęt
            <select
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              className={styles.input}
            >
              <option value="classic">Classic (Raw)</option>
              <option value="equipped">Equipped</option>
            </select>
          </label>

          <label className={styles.label}>
            Masa ciała (kg)
            <input
              value={bw}
              onChange={(e) => setBw(e.target.value)}
              className={styles.input}
              inputMode="decimal"
            />
          </label>

          <div className={styles.totalBox}>
            <div className={styles.totalLabel}>Total</div>
            <div className={styles.totalValue}>{round1(scores.totalKg)} kg</div>
          </div>

          <label className={styles.label}>
            Przysiad (kg)
            <input
              value={sq}
              onChange={(e) => setSq(e.target.value)}
              className={styles.input}
              inputMode="decimal"
            />
          </label>

          <label className={styles.label}>
            Wyciskanie (kg)
            <input
              value={bp}
              onChange={(e) => setBp(e.target.value)}
              className={styles.input}
              inputMode="decimal"
            />
          </label>

          <label className={styles.label}>
            Martwy ciąg (kg)
            <input
              value={dl}
              onChange={(e) => setDl(e.target.value)}
              className={styles.input}
              inputMode="decimal"
            />
          </label>
        </div>

        <div className={styles.resultsRow}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Wilks 2020</div>
            <div className={styles.cardValue}>{round1(scores.wilks2020)}</div>
            <div className={styles.cardHint}>
              Na podstawie masy ciała i totalu.
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>IPF GL Points</div>
            <div className={styles.cardValue}>{round1(scores.ipfGl)}</div>
            <div className={styles.cardHint}>
              Wersja: {equipment === "classic" ? "Classic" : "Equipped"}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.h2}>
            Kalkulator kalorii (BMR / Całkowitego Dziennego Zapotrzebowania)
          </h2>
          <div className={styles.sub}>Mifflin–St Jeor</div>
        </div>

        <div className={styles.grid2}>
          <label className={styles.label}>
            Płeć
            <select
              value={cSex}
              onChange={(e) => setCSex(e.target.value)}
              className={styles.input}
            >
              <option value="female">Kobieta</option>
              <option value="male">Mężczyzna</option>
            </select>
          </label>

          <label className={styles.label}>
            Wiek (lata)
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={styles.input}
              inputMode="numeric"
            />
          </label>

          <label className={styles.label}>
            Wzrost (cm)
            <input
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className={styles.input}
              inputMode="numeric"
            />
          </label>

          <label className={styles.label}>
            Masa (kg)
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={styles.input}
              inputMode="decimal"
            />
          </label>

          <label className={styles.label}>
            Aktywność
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className={styles.input}
            >
              <option value="1.2">Siedzący tryb życia (1.2)</option>
              <option value="1.375">Lekka (1.375)</option>
              <option value="1.55">Umiarkowana (1.55)</option>
              <option value="1.725">Wysoka (1.725)</option>
              <option value="1.9">Bardzo wysoka (1.9)</option>
            </select>
          </label>

          <label className={styles.label}>
            Cel (kcal)
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className={styles.input}
            >
              <option value="0">Utrzymanie (0)</option>
              <option value="-300">Redukcja -300</option>
              <option value="-500">Redukcja -500</option>
              <option value="300">Masa +300</option>
              <option value="500">Masa +500</option>
            </select>
          </label>
        </div>

        <div className={styles.resultsRow}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>BMR</div>
            <div className={styles.cardValue}>{round0(cal.bmr)} kcal</div>
            <div className={styles.cardHint}>Spoczynkowe zapotrzebowanie.</div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>
              Całkowite dzienne zapotrzebowanie
            </div>
            <div className={styles.cardValue}>{round0(cal.tdee)} kcal</div>
            <div className={styles.cardHint}>BMR × aktywność.</div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>Cel dzienny</div>
            <div className={styles.cardValue}>{round0(cal.target)} kcal</div>
            <div className={styles.cardHint}>
              Całkowite dzienne zapotrzebowanie uwzględniając cel.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

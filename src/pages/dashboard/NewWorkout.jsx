import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewWorkout.module.css";


export default function NewWorkout() {
  const [plans, setPlans] = useState([]);
  const [planId, setPlanId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/plans", { credentials: "include" })
      .then((r) => r.json())
      .then(setPlans);
  }, []);

  const startWorkout = async () => {
    const today = new Date().toISOString().slice(0, 10);

    const res = await fetch("/api/workouts", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan_id: planId || null,
        date: today,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      navigate(`/dashboard/workout/${data.workout_id}`);
    }
  };

  return (
    <div className={styles.pageContent}>
      <div className={styles.card}>
        <h1 className={styles.title}>Nowy trening</h1>
  
        <select
          className={styles.select}
          value={planId}
          onChange={(e) => setPlanId(e.target.value)}
        >
          <option value="">— trening bez planu —</option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
  
        <button className={styles.button} onClick={startWorkout}>
          Rozpocznij trening
        </button>
      </div>
    </div>
  );
}

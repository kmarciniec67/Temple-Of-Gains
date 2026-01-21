import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./PlanCreator.module.css";

export default function PlanCreator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/exercises", { credentials: "include" })
      .then((r) => r.json())
      .then(setExercises);
  }, []);

  const toggleExercise = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((e) => e !== id)
        : [...prev, id]
    );
  };

  const savePlan = async () => {
    const res = await fetch("/api/plans", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        exercises: selected,
      }),
    });
  
    if (res.ok) {
      navigate("/dashboard/plans"); // ✅ POWRÓT
    }
  };

  return (
    <div className={styles.pageContent}>
      <div className={styles.card}>
        <h1 className={styles.title}>Nowy plan treningowy</h1>

        <input
          className={styles.input}
          placeholder="Nazwa planu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className={styles.textarea}
          placeholder="Opis (opcjonalnie)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

<div className={styles.exerciseList}>
  {exercises.map((e) => (
    <label key={e.id} className={styles.exerciseItem}>
      <input
        type="checkbox"
        checked={selected.includes(e.id)}
        onChange={() => toggleExercise(e.id)}
      />
      <span>{e.name}</span>
    </label>
  ))}
</div>


        <button className={styles.button} onClick={savePlan}>
          Zapisz plan
        </button>
      </div>
    </div>
  );
}

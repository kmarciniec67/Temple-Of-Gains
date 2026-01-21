import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Workout.module.css";

export default function ActiveWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);

  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState([]);

  useEffect(() => {
    fetch("/api/exercises", { credentials: "include" })
      .then((r) => r.json())
      .then(setExercises);
  }, []);

  const filteredExercises = exercises.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );

  const addSet = async () => {
    if (!selectedExercise) return;

    const setNumber =
      sets.filter((s) => s.exercise.id === selectedExercise.id).length + 1;

    await fetch(`/api/workouts/${id}/sets`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exercise_id: selectedExercise.id,
        set_number: setNumber,
        reps: Number(reps),
        weight: Number(weight),
      }),
    });

    setSets((prev) => [
      ...prev,
      {
        exercise: selectedExercise,
        set_number: setNumber,
        reps,
        weight,
      },
    ]);

    setReps("");
    setWeight("");
  };

  return (
    <div className={styles.pageContent}>
      <div className={styles.cardCentered}>
        <h1 className={styles.cardTitle}>Trening #{id}</h1>

        {/* SEARCH */}
        <div className={styles.searchBox}>
          <input
            className={styles.input}
            placeholder="Szukaj ćwiczenia..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedExercise(null);
            }}
          />

{query && !selectedExercise && (
  <div className={styles.searchResults}>
              {filteredExercises.slice(0, 6).map((e) => (
                <button
                  key={e.id}
                  className={styles.searchItem}
                  onClick={() => {
                    setSelectedExercise(e);
                    setQuery("");          // ZAMYKA LISTĘ
                  }}
                >
                  {e.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SET FORM */}
        {selectedExercise && (
          <div className={styles.setForm}>
            <div className={styles.exerciseName}>
              {selectedExercise.name}
            </div>

            <div className={styles.setRow}>
              <input
                className={styles.input}
                placeholder="Powtórzenia"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
              <input
                className={styles.input}
                placeholder="Ciężar (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <button className={styles.primaryButton} onClick={addSet}>
              Dodaj serię
            </button>
          </div>
        )}

        {/* ADDED SETS */}
        {sets.length > 0 && (
          <div className={styles.addedSets}>
            <h3 className={styles.sectionTitle}>Dodane serie</h3>

            {sets.map((s, i) => (
              <div key={i} className={styles.setItem}>
                <span className={styles.setExercise}>
                  {s.exercise.name}
                </span>
                <span className={styles.setDetails}>
                  {s.set_number} seria • {s.reps} powt. • {s.weight} kg
                </span>
              </div>
            ))}
          </div>
        )}

        {/* FINISH */}
        <button
          className={styles.finishButton}
          onClick={() => navigate("/dashboard")}
        >
          Zakończ trening
        </button>
      </div>
    </div>
  );
}

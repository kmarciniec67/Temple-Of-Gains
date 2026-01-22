import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Workout.module.css";

const API = "http://localhost:3000";

export default function ActiveWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [planExercises, setPlanExercises] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [query, setQuery] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState([]);
  const [error, setError] = useState(null);

  /* =============================
     1. WORKOUT → PLAN → ĆWICZENIA
  ============================= */
  useEffect(() => {
    const loadPlanExercises = async () => {
      try {
        // 1️⃣ workout
        const workoutRes = await fetch(`${API}/api/workouts/${id}`, {
          credentials: "include",
        });

        if (!workoutRes.ok) return;

        const workout = await workoutRes.json();
        if (!workout.plan_id) return;

        // 2️⃣ ćwiczenia planu
        const planRes = await fetch(`${API}/api/workouts/${id}/plan`, {
          credentials: "include"
        });

        if (!planRes.ok) throw new Error();

        const exercises = await planRes.json();
        setPlanExercises(exercises);
        console.log("PLAN RESPONSE STATUS:", planRes.status);


        if (exercises.length > 0) {
          setSelectedExercise(exercises[0]);
        }
      } catch {
        setError("Nie udało się pobrać planu treningowego");
      }
    };

    loadPlanExercises();
  }, [id]);

  /* =============================
     WSZYSTKIE ĆWICZENIA
  ============================= */
  useEffect(() => {
    fetch(`${API}/api/exercises`, { credentials: "include" })
      .then((r) => r.json())
      .then(setAllExercises);
  }, []);

  const filtered = allExercises.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );

  /* =============================
     DODAJ SERIĘ
  ============================= */
  const addSet = async () => {
    if (!selectedExercise || !reps) return;

    const setNumber =
      sets.filter((s) => s.exercise.id === selectedExercise.id).length + 1;

    await fetch(`${API}/api/workouts/${id}/sets`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exercise_id: selectedExercise.id,
        set_number: setNumber,
        reps: Number(reps),
        weight: Number(weight) || 0,
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

  /* =============================
     UI
  ============================= */
  return (
    <div className={styles.pageContent}>
      <div className={styles.cardCentered}>
        <h1 className={styles.cardTitle}>Trening #{id}</h1>

        {error && <p className={styles.error}>{error}</p>}

        {/* PLAN */}
        {planExercises.length > 0 && (
          <div className={styles.planBox}>
            <h3 className={styles.sectionTitle}>Ćwiczenia z planu</h3>
            <div className={styles.planExercises}>
              {planExercises.map((e) => (
                <button
                  key={e.id}
                  className={`${styles.planExerciseButton} ${
                    selectedExercise?.id === e.id ? styles.active : ""
                  }`}
                  onClick={() => setSelectedExercise(e)}
                >
                  {e.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SEARCH */}
        <div className={styles.searchBox}>
          <input
            className={styles.input}
            placeholder="Szukaj ćwiczenia..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <div className={styles.searchResults}>
              {filtered.slice(0, 6).map((e) => (
                <button
                  key={e.id}
                  className={styles.searchItem}
                  onClick={() => {
                    setSelectedExercise(e);
                    setQuery("");
                  }}
                >
                  {e.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* FORM */}
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

        {/* SETS */}
        {sets.length > 0 && (
          <div className={styles.addedSets}>
            <h3 className={styles.sectionTitle}>Dodane serie</h3>
            {sets.map((s, i) => (
              <div key={i} className={styles.setItem}>
                {s.exercise.name} — {s.reps} × {s.weight} kg
              </div>
            ))}
          </div>
        )}

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

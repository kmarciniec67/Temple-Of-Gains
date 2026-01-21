import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Workout.module.css";

export default function ActiveWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [planExercises, setPlanExercises] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState([]);

  // Pobranie planu ćwiczeń przypisanego do treningu
  useEffect(() => {
    fetch(`/api/workouts/${id}/plan`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Błąd sieci: " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPlanExercises(data);
          setSelectedExercise(data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Pobranie wszystkich ćwiczeń do wyszukiwania
  useEffect(() => {
    fetch("/api/exercises", { credentials: "include" })
      .then((res) => res.json())
      .then(setExercises)
      .catch((err) => console.error(err));
  }, []);

  const filteredExercises = exercises.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );

  const addSet = async () => {
    if (!selectedExercise || !reps) return;

    const setNumber =
      sets.filter((s) => s.exercise.id === selectedExercise.id).length + 1;

    try {
      const res = await fetch(`/api/workouts/${id}/sets`, {
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

      if (!res.ok) throw new Error("Błąd przy dodawaniu serii");

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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.pageContent}>
      <div className={styles.cardCentered}>
        <h1 className={styles.cardTitle}>Trening #{id}</h1>

        {/* Plan ćwiczeń */}
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
                  onClick={() => {
                    setSelectedExercise(e);
                    setQuery("");
                  }}
                >
                  {e.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Wyszukiwarka */}
        <div className={styles.searchBox}>
          <input
            className={styles.input}
            placeholder="Szukaj ćwiczenia lub dodaj customowe..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <div className={styles.searchResults}>
              {filteredExercises.slice(0, 6).map((e) => (
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

        {/* Formularz dodawania serii */}
        {selectedExercise && (
          <div className={styles.setForm}>
            <div className={styles.exerciseName}>{selectedExercise.name}</div>
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

        {/* Wyświetlanie dodanych serii */}
        {sets.length > 0 && (
          <div className={styles.addedSets}>
            <h3 className={styles.sectionTitle}>Dodane serie</h3>
            {sets.map((s, i) => (
              <div key={i} className={styles.setItem}>
                <span className={styles.setExercise}>{s.exercise.name}</span>
                <span className={styles.setDetails}>
                  {s.set_number} seria • {s.reps} powt. • {s.weight} kg
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Zakończenie treningu */}
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

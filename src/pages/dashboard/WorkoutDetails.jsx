import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useWorkoutDetails from "../../hooks/useWorkoutsDetails";
import styles from "./history.module.css"; // możesz dać osobny plik, ale na start OK

export default function WorkoutDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const workoutId = Number(id);
  const { workout, loading, error } = useWorkoutDetails(workoutId);

  if (loading) return <p>Ładowanie treningu...</p>;
  if (error) return <p>Błąd: {error}</p>;
  if (!workout) return <p>Nie znaleziono treningu.</p>;

  // workout: { id, date, plan_name, summary, exercises: [{exercise_name, sets:[...]}] }
  return (
    <div className={styles.historyBackground}>
      <div className={styles.historyContainer}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ← Wróć
        </button>

        <h1>Trening</h1>
        <h2>{new Date(workout.date).toLocaleString("pl-PL")}</h2>
        <p>Plan: {workout.plan_name ?? `ID: ${workout.plan_id}`}</p>

        {workout.summary && (
          <div className={styles.historySummaryRow}>
            <span>Ćwiczeń: {workout.summary.exercises_count ?? 0}</span>
            <span>Serii: {workout.summary.sets_count ?? 0}</span>
            <span>
              Tonaż:{" "}
              {Math.round(workout.summary.total_volume ?? 0).toLocaleString(
                "pl-PL",
              )}{" "}
              kg
            </span>
          </div>
        )}

        <hr />

        {/* Lista ćwiczeń i serii */}
        {workout.exercises?.map((ex) => (
          <div key={ex.exercise_id} className={styles.historyCard}>
            <h3>{ex.exercise_name}</h3>

            {ex.sets?.length ? (
              <ul>
                {ex.sets.map((s) => (
                  <li key={s.id}>
                    Seria {s.set_number}: {s.reps ?? 0} x {s.weight ?? 0} kg
                  </li>
                ))}
              </ul>
            ) : (
              <p>Brak serii.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

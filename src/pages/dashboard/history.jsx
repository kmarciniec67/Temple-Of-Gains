import React, { useEffect, useState } from "react";
import styles from "./history.module.css";
import { useNavigate } from "react-router-dom"; // IMPORT
import useWorkoutsList from "../../hooks/useWorkoutsList";

const History = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const limit = 20;
  const offset = page * limit;

  const { workouts, loading, error } = useWorkoutsList({ limit, offset });

  const handleDelete = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten trening?")) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(`/api/workouts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload();
    } catch (err) {
      alert("Błąd usuwania treningu");
    }
  };

  if (loading) return <p>Ładowanie historii...</p>;
  if (error) return <p>Błąd: {error}</p>;
  if (!workouts.length) return <p>Brak historii treningów.</p>;

  return (
    <div className={styles.historyBackground}>
      <div className={styles.historyContainer}>
        <h1>Historia treningów</h1>

        {workouts.map((w) => (
          <div
            key={w.id}
            className={styles.historyCard}
            onClick={() => navigate(`${w.id}`)}
            style={{ cursor: "pointer" }}
          >
            <h2>
              Trening z dnia: {new Date(w.date).toLocaleDateString("pl-PL")}
            </h2>

            <p>Plan: {w.plan_name ?? `ID: ${w.plan_id}`}</p>

            <div className={styles.historySummaryRow}>
              <span>Ćwiczeń: {w.exercises_count ?? 0}</span>
              <span>Serii: {w.sets_count ?? 0}</span>
              <span>
                Tonaż: {Math.round(w.total_volume ?? 0).toLocaleString("pl-PL")}{" "}
                kg
              </span>
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(w.id);
                }}
              >
                Usuń
              </button>
            </div>
          </div>
        ))}

        <div className={styles.paginationRow}>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            Poprzednia
          </button>

          <span>Strona: {page + 1}</span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={workouts.length < limit}
          >
            Następna
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;

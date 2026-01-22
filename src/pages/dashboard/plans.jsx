import React, { useEffect, useState } from "react";
import styles from "./plans.module.css";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTrash, FaClipboardList, FaDumbbell } from "react-icons/fa";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch("/api/plans", { credentials: "include" });
      if (res.status === 401) {
        navigate("/login");
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setPlans(data);
        // Opcjonalnie: wybierz pierwszy plan na start, jeśli istnieje
        if (data.length > 0 && !selectedPlan) {
          setSelectedPlan(data[0]);
        }
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handleDeletePlan = async (id) => {
    if (
      !window.confirm(
        "Czy na pewno chcesz usunąć ten plan? Operacja jest nieodwracalna.",
      )
    )
      return;
    try {
      const res = await fetch(`/api/plans/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        const newPlans = plans.filter((p) => p.id !== id);
        setPlans(newPlans);
        // Jeśli usunięto aktualnie wybrany plan, przełącz na inny
        if (selectedPlan && selectedPlan.id === id) {
          setSelectedPlan(newPlans.length > 0 ? newPlans[0] : null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtrowanie planów
  const filteredPlans = plans.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) return <p style={{ padding: "2rem" }}>Ładowanie planów...</p>;

  return (
    <div className={styles.plansPage}>
      <div className={styles.layoutContainer}>
        <div className={styles.listColumn}>
        <div className={styles.listHeader}>
  <h1 className={styles.headerTitle}>Twoje Plany</h1>

  <button
    className={styles.createButton}
    onClick={() => navigate("/dashboard/plans/new")}
  >
    + Nowy plan
  </button>
</div>

          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Szukaj planu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.plansList}>
            {filteredPlans.length === 0 ? (
              <p className={styles.noResults}>
                Brak planów spełniających kryteria.
              </p>
            ) : (
              filteredPlans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`${styles.planCard} ${selectedPlan?.id === plan.id ? styles.activeCard : ""}`}
                >
                  <div className={styles.cardIconBox}>
                    <FaClipboardList />
                  </div>

                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{plan.name}</h3>
                    <p className={styles.cardSubtitle}>
                      {plan.exercises
                        ? `${plan.exercises.length} ćwiczeń`
                        : "Brak ćwiczeń"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.detailsColumn}>
          {selectedPlan ? (
            <>
              <div className={styles.detailsHeader}>
                <div>
                  <h2 className={styles.planTitleBig}>{selectedPlan.name}</h2>
                  <p className={styles.planDescription}>
                    {selectedPlan.description || "Brak opisu dla tego planu."}
                  </p>
                </div>
                <button
                  onClick={() => handleDeletePlan(selectedPlan.id)}
                  className={styles.deleteButton}
                  title="Usuń ten plan"
                >
                  <FaTrash /> Usuń Plan
                </button>
              </div>

              <h3 className={styles.sectionTitle}>
                <FaDumbbell /> Lista ćwiczeń
              </h3>

              {selectedPlan.exercises && selectedPlan.exercises.length > 0 ? (
                <div className={styles.exercisesGrid}>
                  {selectedPlan.exercises.map((ex, index) => (
                    <div
                      key={`${ex.id}-${index}`}
                      className={styles.exerciseItem}
                    >
                      <div className={styles.indexBadge}>{index + 1}</div>
                      <div className={styles.exerciseInfo}>
                        <span className={styles.exerciseName}>{ex.name}</span>
                        <span className={styles.exercisePart}>
                          Partia: {ex.body_part}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyExercises}>
                  <p>Ten plan nie ma jeszcze przypisanych żadnych ćwiczeń.</p>
                </div>
              )}
            </>
          ) : (
            <div className={styles.emptyState}>
              <FaClipboardList className={styles.emptyIcon} />
              <p style={{ fontSize: "1.2rem" }}>
                Wybierz plan z listy po lewej stronie, aby zobaczyć szczegóły.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plans;

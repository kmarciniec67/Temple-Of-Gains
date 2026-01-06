import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"; // IMPORTUJEMY useNavigate
import styles from "./Dashboard.module.css";
import Navbar from "./components/Navbar";
import * as fi from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import WeightChartFromApi from "./components/WeightChartFromApi";
import useWorkoutsList from "../../hooks/useWorkoutsList";
import useWorkoutStats from "../../hooks/useWorkoutStats";

export default function Dashboard() {
  const { pathname } = useLocation();
  const isHome = pathname === "/dashboard";
  const navigate = useNavigate(); // DODAJEMY HOOK NAWIGACJI

  const { workouts, loading, error } = useWorkoutsList({ limit: 3, offset: 0 }); // do treningow
  const { stats, loading: statsLoading, error: statsError } = useWorkoutStats(); // do statystyk

  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      console.log("Dashboard: Brak danych usera, przekierowanie do logowania.");
      navigate("/login");
      return;
    }
    const parsed = JSON.parse(userData);
    setUsername(parsed.username);

    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return null; // Możesz tu dać komponent <Spinner />
  }

  const today = new Date().toLocaleDateString("pl-PL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ==== FALLBACK HELPERS (żeby nie było undefined) ====
  const hasStats = !!stats && !statsLoading && !statsError;

  const safeText = (v, fallback = "Brak treningu") =>
    v === null || v === undefined || v === "" ? fallback : String(v);

  const safeNumber = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  // ==== VALUES FOR UI ====
  const lastWorkout = hasStats ? stats.last_workout : null;

  const lastWorkoutLabel = lastWorkout
    ? `${safeText(lastWorkout.plan_name, "Trening")} — ${new Date(lastWorkout.date).toLocaleDateString("pl-PL")}`
    : "Brak treningu";

  // treningi w tym tygodniu (tu właśnie miałeś undefined)
  const weekWorkoutsCount = hasStats
    ? safeNumber(stats.week_workouts_count)
    : null;

  const weekWorkoutsLabel =
    weekWorkoutsCount === null ? "Brak treningu" : String(weekWorkoutsCount);

  // średni tonaż z ostatnich 7 dni
  const last7dWorkoutsCount = hasStats
    ? safeNumber(stats.last7d_workouts_count)
    : null;

  const last7dAvgVolume = hasStats ? safeNumber(stats.last7d_avg_volume) : null;

  const last7dAvgLabel =
    last7dWorkoutsCount === null ||
    last7dWorkoutsCount === 0 ||
    last7dAvgVolume === null
      ? "Brak treningu"
      : `${Math.round(last7dAvgVolume).toLocaleString("pl-PL")} kg`;

  const lastWorkoutDaysAgo = lastWorkout
    ? Math.max(
        0,
        Math.floor(
          (Date.now() - new Date(lastWorkout.date).getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      )
    : null;

  const headerSubtitle = lastWorkout
    ? `Twój ostatni trening był ${lastWorkoutDaysAgo} dni temu.`
    : "Nie masz jeszcze zapisanych treningów.";

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />

      <main className={styles.pageContent}>
        {isHome ? (
          <>
            <div className={styles.headerRow}>
              <div>
                <h1 className={styles.greetingHeader}>
                  Witaj, {username ? username : "użytkowniku"}!
                </h1>
                <p className={styles.greeting}>{headerSubtitle}</p>
              </div>

              <div className={styles.dateBox}>
                <span className={styles.dateText}>{today}</span>
                <fi.FiCalendar className={styles.calendarIcon} />
              </div>
            </div>

            {/* tu Twoje karty/statystyki */}

            <div className={styles.statsContainer}>
              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <FaIcons.FaCalendar className={styles.statIcon} />
                  <div>
                    <div className={styles.statLabel}>Ostatni trening</div>
                    <div className={styles.statValue}>
                      {statsLoading
                        ? "Ładowanie..."
                        : statsError
                          ? "Błąd"
                          : lastWorkoutLabel}
                    </div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <FaIcons.FaFire className={styles.statIcon} />
                  <div>
                    <div className={styles.statLabel}>
                      Treningi w tym tygodniu
                    </div>
                    <div className={styles.statValue}>
                      {statsLoading
                        ? "Ładowanie..."
                        : statsError
                          ? "Błąd"
                          : weekWorkoutsLabel}
                    </div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <FaIcons.FaDumbbell className={styles.statIcon} />
                  <div>
                    <div className={styles.statLabel}>
                      Średni tonaż na trening (ostatnie 7 dni)
                    </div>
                    <div className={styles.statValue}>
                      {statsLoading
                        ? "Ładowanie..."
                        : statsError
                          ? "Błąd"
                          : last7dAvgLabel}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.mainGrid}>
                <section className={styles.card}>
                  <h2 className={styles.cardTitle}>Masa ciała</h2>
                  <div className={styles.chartPlaceholder}>
                    <WeightChartFromApi />
                  </div>
                </section>

                <section
                  className={`${styles.card} ${styles.cardLastTrainingWide}`}
                >
                  <h2 className={styles.cardTitle}>Ostatnie treningi</h2>

                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Trening</th>
                        <th>Ilość ćwiczeń</th>
                        <th>Ciężar łącznie</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading && (
                        <tr>
                          <td colSpan={4}>Ładowanie...</td>
                        </tr>
                      )}

                      {!loading && error && (
                        <tr>
                          <td colSpan={4}>Błąd: {error}</td>
                        </tr>
                      )}

                      {!loading && !error && workouts.length === 0 && (
                        <tr>
                          <td colSpan={4}>Brak treningów</td>
                        </tr>
                      )}

                      {!loading &&
                        !error &&
                        workouts.map((w) => (
                          <tr
                            key={w.id}
                            onClick={() => navigate(`history/${w.id}`)}
                            style={{ cursor: "pointer" }}
                          >
                            <td>
                              {new Date(w.date).toLocaleDateString("pl-PL")}
                            </td>
                            <td>{w.plan_name ?? `Plan ID: ${w.plan_id}`}</td>
                            <td>{w.exercises_count ?? 0}</td>
                            <td>
                              {Math.round(w.total_volume ?? 0).toLocaleString(
                                "pl-PL",
                              )}{" "}
                              kg
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <button
                    className={styles.primaryButton}
                    onClick={() => navigate("history")}
                  >
                    Zobacz całą historię
                  </button>
                </section>
              </div>

              {/* FAB – przycisk plusa i akcje */}
              <div className={styles.fabContainer}>
                <div className={styles.fabActions}>
                  <button className={styles.fabActionButton}>
                    zarejestruj trening
                  </button>
                  <button className={styles.fabActionButton}>
                    zarejestruj pomiary
                  </button>
                </div>
                <button className={styles.fabMainButton}>
                  <fi.FiPlus />
                </button>
              </div>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}

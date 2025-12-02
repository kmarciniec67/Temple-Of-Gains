import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"; // IMPORTUJEMY useNavigate
import styles from "./Dashboard.module.css";
import Navbar from "./components/Navbar";
import * as fi from "react-icons/fi"
import * as FaIcons from "react-icons/fa";

export default function Dashboard() {
    const { pathname } = useLocation();
    const isHome = pathname === "/dashboard";
    const navigate = useNavigate(); // DODAJEMY HOOK NAWIGACJI

    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            console.log("Dashboard: Brak danych usera, przekierowanie do logowania.");
            navigate('/login');
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

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />

      <main className={styles.pageContent}>
        {isHome ? (
          <>
            <div className={styles.headerRow}>
              <div>
                <h1 className={styles.greetingHeader}>Witaj, {username ? username : "użytkowniku"}!</h1>
                <p className={styles.greeting}>Twój ostatni trening był 3 dni temu.</p>
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
                    <div className={styles.statValue}>PUSH — 17.10.2025</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                <FaIcons.FaFire className={styles.statIcon} />
                  <div>
                    <div className={styles.statLabel}>Ilość treningów w tym tygodniu</div>
                    <div className={styles.statValue}>3</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                <FaIcons.FaDumbbell className={styles.statIcon} />
                  <div>
                    <div className={styles.statLabel}>Średnie obciążenie</div>
                    <div className={styles.statValue}>140000kg</div>
                  </div>
                </div>
              </div>

              <div className={styles.mainGrid}>
              <section className={styles.card}>
                <h2 className={styles.cardTitle}>Masa ciała</h2>
                <div className={styles.chartPlaceholder}>
                  {/* Tu kiedyś będzie wykres z Recharts */}
                  <span>Wkrótce wykres masy ciała</span>
                </div>
              </section>

              <section className={`${styles.card} ${styles.cardLastTrainingWide}`}>
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
                    <tr>
                      <td>04.10</td>
                      <td>PUSH</td>
                      <td>8</td>
                      <td>12 000 kg</td>
                    </tr>
                    <tr>
                      <td>11.10</td>
                      <td>nogi A</td>
                      <td>7</td>
                      <td>15 500 kg</td>
                    </tr>
                    <tr>
                      <td>18.10</td>
                      <td>góra B</td>
                      <td>6</td>
                      <td>10 200 kg</td>
                    </tr>
                  </tbody>
                </table>
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

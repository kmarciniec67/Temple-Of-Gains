import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"; // IMPORTUJEMY useNavigate
import styles from "./Dashboard.module.css";
import Navbar from "./components/Navbar";

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

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />

      <main className={styles.pageContent}>
        {isHome ? (
          <>
            <h1>Witaj, {username ? username : "użytkowniku"}!</h1>
            <p>Twój ostatni trening był 3 dni temu.</p>
            {/* tu Twoje karty/statystyki */}
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Navbar from "./components/Navbar";
import { SidebarData } from "./components/SidebarData";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { pathname } = useLocation();
  const isHome = pathname === "/dashboard";

  // Wyświetlanie nazwy użytkownika
  const [username, setUsername] = useState("");

  useEffect(() => {
    // pobierz dane z localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUsername(parsed.username);
    }
  }, []);

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

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Navbar from "./components/Navbar";
import { SidebarData } from "./components/SidebarData";

export default function Dashboard() {
  const { pathname } = useLocation();
  const isHome = pathname === "/dashboard";

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />

      <main className={styles.pageContent}>
        {isHome ? (
          <>
            <h1>Witaj, użytkowniku!</h1>
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

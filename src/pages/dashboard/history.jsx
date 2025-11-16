import React, { useEffect, useState } from "react";
import styles from './history.module.css';
import { useNavigate } from "react-router-dom"; // IMPORT

const History = () => {
    const [history, setHistory] = useState([]); // NOWY STAN
    const [loading, setLoading] = useState(true); // NOWY STAN
    const navigate = useNavigate(); // NOWY STAN

    // NOWA LOGIKA POBIERANIA DANYCH
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch('/api/history', { // ZMIANA ENDPOINTU
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
          }
        });

        if (res.status === 401 || res.status === 403) {
          console.error("Sesja wygasła");
          localStorage.removeItem('user');
          navigate('/login');
          return;
        }

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setHistory(data); // ZAPIS DANYCH DO STANU
      } catch (err) {
        console.error('Fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  // RENDEROWANIE WARUNKOWE
  if (loading) return <p>Ładowanie historii...</p>;
  if (!history.length) return <p>Brak historii treningów.</p>;

  return (
    <div className={styles.historyBackground}>
      <div className={styles.historyContainer}>
        <h1>My history</h1>
        {/* Przykładowe renderowanie listy */}
        {history.map(workout => (
          <div key={workout.id} className={styles.historyCard}> {/* Załóżmy, że masz styl .historyCard */}
            <h2>Trening z dnia: {new Date(workout.date).toLocaleString()}</h2>
            <p>ID Planu: {workout.plan_id || 'Brak'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
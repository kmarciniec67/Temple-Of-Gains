import React, { useEffect, useState } from "react";
import styles from './plans.module.css';
import { useNavigate } from "react-router-dom"; // IMPORT

const Plans = () => {
    const [plans, setPlans] = useState([]); // NOWY STAN
    const [loading, setLoading] = useState(true); // NOWY STAN
    const navigate = useNavigate(); // NOWY STAN

    // NOWA LOGIKA POBIERANIA DANYCH
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.warn('Brak tokena');
                    setLoading(false);
                    navigate('/login');
                    return;
                }

                const res = await fetch('/api/plans', { // ZMIANA ENDPOINTU
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // WYSYŁANIE TOKENA
          }
        });

        if (res.status === 401 || res.status === 403) {
          console.error("Sesja wygasła");
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          return;
        }

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setPlans(data); // ZAPIS DANYCH DO STANU
      } catch (err) {
        console.error('Fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [navigate]);

  // RENDEROWANIE WARUNKOWE
  if (loading) return <p>Ładowanie planów...</p>;
  if (!plans.length) return <p>Nie znaleziono żadnych planów.</p>;

  return (
    <div className={styles.PlansBackground}>
      <div className={styles.PlansContainer}>
        <h1>My Plans</h1>
        {/* Przykładowe renderowanie listy */}
        {plans.map(plan => (
          <div key={plan.id} className={styles.planCard}> {/* Załóżmy, że masz styl .planCard */}
            <h2>{plan.name}</h2>
            <p>{plan.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
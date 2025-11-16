import React, { useEffect, useState } from "react";
import styles from './exercises.module.css';
import { useNavigate } from "react-router-dom"; // IMPORT

const Exercises = () => {
    const [exercises, setExercises] = useState([]); // NOWY STAN
    const [loading, setLoading] = useState(true); // NOWY STAN
    const navigate = useNavigate(); // NOWY STAN

    // NOWA LOGIKA POBIERANIA DANYCH
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.warn('Brak tokena');
                    setLoading(false);
                    navigate('/login');
                    return;
                }

                const res = await fetch('/api/exercises', { // ZMIANA ENDPOINTU
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
        setExercises(data); // ZAPIS DANYCH DO STANU
      } catch (err) {
        console.error('Fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [navigate]);

  // RENDEROWANIE WARUNKOWE
  if (loading) return <p>Ładowanie ćwiczeń...</p>;
  if (!exercises.length) return <p>Nie znaleziono żadnych ćwiczeń.</p>;

  return (
    <div className={styles.exercisesBackground}>
      <div className={styles.exercisesContainer}>
        <h1>My Exercises</h1>
        {/* Przykładowe renderowanie listy */}
        {exercises.map(ex => (
          <div key={ex.id} className={styles.exerciseCard}> {/* Załóżmy, że masz styl .exerciseCard */}
            <h2>{ex.name}</h2>
            <p>Partia: {ex.body_part}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exercises;
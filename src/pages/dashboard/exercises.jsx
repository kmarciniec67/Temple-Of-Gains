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
                const res = await fetch('/api/exercises', { // ZMIANA ENDPOINTU
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
        setExercises(data);
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
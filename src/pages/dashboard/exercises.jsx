import React, { useEffect, useState } from "react";
import styles from './exercises.module.css';
import { useNavigate } from "react-router-dom"; // IMPORT

const Exercises = () => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    // Stan formularza
    const [newExercise, setNewExercise] = useState({ name: '', body_part: 'Chest', description: '', video_url: '' });
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();

    const fetchExercises = async () => {
        try {
            const res = await fetch('/api/exercises', {
                credentials: 'include',
            });
            if (res.status === 401) { navigate('/login'); return; }
            if (res.ok) {
                const data = await res.json();
                setExercises(data);
            }
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    useEffect(() => {
        fetchExercises();
    }, [navigate]);

    const handleAddExercise = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/exercises', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(newExercise)
            });
            const data = await res.json();
            if (res.ok) {
                setMsg('Dodano ćwiczenie!');
                setNewExercise({ name: '', body_part: 'Chest', description: '', video_url: '' });
                fetchExercises(); // odśwież listę
            } else {
                setMsg(data.error || 'Błąd dodawania.');
            }
        } catch (err) {
            console.error(err);
            setMsg('Błąd połączenia.');
        }
    };

    if (loading) return <p>Ładowanie...</p>;

    return (
        <div className={styles.exercisesBackground}>
            <div className={styles.exercisesContainer}>
                <h1>Baza Ćwiczeń</h1>

                {/* Formularz dodawania */}
                <div className={styles.exerciseCard} style={{border: '1px solid var(--accent-primary)'}}>
                    <h3>Dodaj nowe ćwiczenie</h3>
                    <form onSubmit={handleAddExercise} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                        <input
                            placeholder="Nazwa ćwiczenia"
                            value={newExercise.name}
                            onChange={e => setNewExercise({...newExercise, name: e.target.value})}
                            required
                            style={{padding: '8px'}}
                        />
                        <select
                            value={newExercise.body_part}
                            onChange={e => setNewExercise({...newExercise, body_part: e.target.value})}
                            style={{padding: '8px'}}
                        >
                            <option value="Chest">Klatka</option>
                            <option value="Back">Plecy</option>
                            <option value="Legs">Nogi</option>
                            <option value="Shoulders">Barki</option>
                            <option value="Arms">Ramiona</option>
                            <option value="Abs">Brzuch</option>
                            <option value="Full Body">Całe ciało</option>
                        </select>
                        <input
                            placeholder="Opis (opcjonalnie)"
                            value={newExercise.description}
                            onChange={e => setNewExercise({...newExercise, description: e.target.value})}
                            style={{padding: '8px'}}
                        />
                        <button type="submit" style={{padding: '10px', background: 'var(--btn-primary-bg)', color: '#fff', border: 'none', cursor: 'pointer'}}>
                            Dodaj
                        </button>
                    </form>
                    {msg && <p>{msg}</p>}
                </div>

                <div style={{display:'grid', gap:'1rem', marginTop: '2rem'}}>
                    {exercises.map(ex => (
                        <div key={ex.id} className={styles.exerciseCard}>
                            <h2 style={{margin: '0 0 5px 0'}}>{ex.name}</h2>
                            <span style={{background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem'}}>
                                {ex.body_part}
                            </span>
                            <p>{ex.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Exercises;
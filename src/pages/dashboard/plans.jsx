import React, { useEffect, useState } from "react";
import styles from './plans.module.css';
import { useNavigate } from "react-router-dom"; // IMPORT
import * as FaIcons from "react-icons/fa";

const Plans = () => {
    const [plans, setPlans] = useState([]); // NOWY STAN
    const [loading, setLoading] = useState(true); // NOWY STAN
    const navigate = useNavigate(); // NOWY STAN

    const Plans = () => {
        const [plans, setPlans] = useState([]);
        const [allExercises, setAllExercises] = useState([]);
        const [loading, setLoading] = useState(true);
        const [showCreator, setShowCreator] = useState(false);

        // Stan formularza kreatora
        const [newPlan, setNewPlan] = useState({name: '', description: ''});
        const [selectedExercises, setSelectedExercises] = useState([]); // tablica ID

        const navigate = useNavigate();

        // 1. Pobierz plany i ćwiczenia przy starcie
        const fetchData = async () => {
            try {
                const [plansRes, exRes] = await Promise.all([
                    fetch('/api/plans', {credentials: 'include'}),
                    fetch('/api/exercises', {credentials: 'include'})
                ]);

                if (plansRes.status === 401) {
                    navigate('/login');
                    return;
                }

                if (plansRes.ok) setPlans(await plansRes.json());
                if (exRes.ok) setAllExercises(await exRes.json());

            } catch (err) {
                console.error('Fetch failed:', err);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            fetchData();
        }, [navigate]);

        // 2. Obsługa tworzenia planu
        const handleCreatePlan = async (e) => {
            e.preventDefault();
            try {
                const res = await fetch('/api/plans', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify({
                        ...newPlan,
                        exercises: selectedExercises // Wyślij ID wybranych ćwiczeń
                    })
                });

                if (res.ok) {
                    alert("Plan utworzony!");
                    setShowCreator(false);
                    setNewPlan({name: '', description: ''});
                    setSelectedExercises([]);
                    fetchData(); // Odśwież listę
                } else {
                    const err = await res.json();
                    alert("Błąd: " + err.error);
                }
            } catch (err) {
                console.error(err);
            }
        };

        // 3. Obsługa usuwania planu
        const handleDeletePlan = async (id) => {
            if (!window.confirm("Czy na pewno chcesz usunąć ten plan?")) return;
            try {
                const res = await fetch(`/api/plans/${id}`, {method: 'DELETE', credentials: 'include'});
                if (res.ok) fetchData();
            } catch (err) {
                console.error(err);
            }
        };

        // Helper do checkboxów ćwiczeń
        const toggleExercise = (id) => {
            if (selectedExercises.includes(id)) {
                setSelectedExercises(prev => prev.filter(exId => exId !== id));
            } else {
                setSelectedExercises(prev => [...prev, id]);
            }
        };

        if (loading) return <p style={{padding: '2rem'}}>Ładowanie...</p>;

        return (
            <div className={styles.PlansBackground}>
                <div className={styles.PlansContainer}>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2rem'
                    }}>
                        <h1>Twoje Plany</h1>
                        <button
                            onClick={() => setShowCreator(!showCreator)}
                            style={{
                                padding: '10px 20px',
                                background: showCreator ? '#d32f2f' : 'var(--accent-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            {showCreator ? "Anuluj" : "+ Nowy Plan"}
                        </button>
                    </div>

                    {/* --- KREATOR PLANU --- */}
                    {showCreator && (
                        <div className={styles.planCard}
                             style={{border: '2px solid var(--accent-primary)', marginBottom: '2rem'}}>
                            <h2>Kreator Planu</h2>
                            <form onSubmit={handleCreatePlan}
                                  style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                                <input
                                    placeholder="Nazwa planu (np. Full Body A)"
                                    value={newPlan.name}
                                    onChange={e => setNewPlan({...newPlan, name: e.target.value})}
                                    required
                                    style={{padding: '10px', fontSize: '1rem'}}
                                />
                                <textarea
                                    placeholder="Opis planu..."
                                    value={newPlan.description}
                                    onChange={e => setNewPlan({...newPlan, description: e.target.value})}
                                    style={{padding: '10px', minHeight: '60px'}}
                                />

                                <h3>Wybierz ćwiczenia:</h3>
                                <div style={{
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    border: '1px solid var(--border-color)',
                                    padding: '10px',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '5px'
                                }}>
                                    {allExercises.map(ex => (
                                        <label key={ex.id} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            cursor: 'pointer',
                                            padding: '5px',
                                            background: 'var(--bg-primary)'
                                        }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedExercises.includes(ex.id)}
                                                onChange={() => toggleExercise(ex.id)}
                                            />
                                            <span>{ex.name} <small
                                                style={{color: 'grey'}}>({ex.body_part})</small></span>
                                        </label>
                                    ))}
                                </div>

                                <button type="submit" style={{
                                    padding: '12px',
                                    background: 'var(--btn-primary-bg)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                }}>
                                    Zapisz Plan
                                </button>
                            </form>
                        </div>
                    )}

                    {/* --- LISTA PLANÓW --- */}
                    <div style={{display: 'grid', gap: '1.5rem'}}>
                        {plans.length === 0 ? <p>Nie masz jeszcze żadnych planów.</p> :
                            plans.map(plan => (
                                <div key={plan.id} className={styles.planCard} style={{position: 'relative'}}>
                                    <button
                                        onClick={() => handleDeletePlan(plan.id)}
                                        style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            fontSize: '1.2rem'
                                        }}
                                        title="Usuń plan"
                                    >
                                        <FaIcons.FaTrash/>
                                    </button>
                                    <h2 style={{marginTop: 0}}>{plan.name}</h2>
                                    <p style={{color: 'var(--text-secondary)'}}>{plan.description}</p>
                                    {/* Opcjonalnie: można tu dodać przycisk "Pokaż szczegóły", aby pobrać listę ćwiczeń dla tego planu */}
                                </div>
                            ))}
                    </div>

                </div>
            </div>
        );
    }
}
    export default Plans;
import React, { useEffect, useState } from "react";
import styles from './plans.module.css';
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

const Plans = () => {
    const [plans, setPlans] = useState([]);
    const [allExercises, setAllExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showCreator, setShowCreator] = useState(false);
    const [editingPlanId, setEditingPlanId] = useState(null); // null = tryb tworzenia

    // Formularz
    const [planData, setPlanData] = useState({ name: '', description: '' });
    const [selectedExercises, setSelectedExercises] = useState([]); // tablica ID

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const [plansRes, exRes] = await Promise.all([
                fetch('/api/plans', { credentials: 'include' }),
                fetch('/api/exercises', { credentials: 'include' })
            ]);

            if (plansRes.status === 401) { navigate('/login'); return; }

            if (plansRes.ok) setPlans(await plansRes.json());
            if (exRes.ok) setAllExercises(await exRes.json());

        } catch (err) { console.error('Fetch failed:', err); } finally { setLoading(false); }
    };

    useEffect(() => {
        fetchData();
    }, [navigate]);

    // Zapisywanie (Tworzenie LUB Edycja)
    const handleSavePlan = async (e) => {
        e.preventDefault();

        const url = editingPlanId ? `/api/plans/${editingPlanId}` : '/api/plans';
        const method = editingPlanId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    ...planData,
                    exercises: selectedExercises
                })
            });

            if (res.ok) {
                alert(editingPlanId ? "Plan zaktualizowany!" : "Plan utworzony!");
                resetCreator();
                fetchData();
            } else {
                const err = await res.json();
                alert("Błąd: " + err.error);
            }
        } catch (err) { console.error(err); }
    };

    const handleDeletePlan = async (id) => {
        if (!window.confirm("Czy na pewno chcesz usunąć ten plan?")) return;
        try {
            const res = await fetch(`/api/plans/${id}`, { method: 'DELETE', credentials: 'include' });
            if (res.ok) fetchData();
        } catch (err) { console.error(err); }
    };

    // Rozpocznij edycję
    const startEditing = (plan) => {
        setPlanData({ name: plan.name, description: plan.description || '' });
        // Pobierz ID ćwiczeń z obiektu planu i ustaw jako wybrane
        const currentExerciseIds = plan.exercises ? plan.exercises.map(ex => ex.id) : [];
        setSelectedExercises(currentExerciseIds);

        setEditingPlanId(plan.id);
        setShowCreator(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetCreator = () => {
        setShowCreator(false);
        setEditingPlanId(null);
        setPlanData({ name: '', description: '' });
        setSelectedExercises([]);
    };

    const toggleExercise = (id) => {
        if (selectedExercises.includes(id)) {
            setSelectedExercises(prev => prev.filter(exId => exId !== id));
        } else {
            setSelectedExercises(prev => [...prev, id]);
        }
    };

    if (loading) return <p style={{ padding: '2rem' }}>Ładowanie...</p>;

    return (
        <div className={styles.PlansBackground}>
            <div className={styles.PlansContainer}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Twoje Plany</h1>
                    <button
                        onClick={showCreator ? resetCreator : () => setShowCreator(true)}
                        style={{
                            padding: '10px 20px',
                            background: showCreator ? '#d32f2f' : 'var(--accent-primary)',
                            color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
                        }}
                    >
                        {showCreator ? "Zamknij" : "+ Nowy Plan"}
                    </button>
                </div>

                {showCreator && (
                    <div className={styles.planCard} style={{ border: '2px solid var(--accent-primary)', marginBottom: '2rem' }}>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <h2>{editingPlanId ? "Edytuj Plan" : "Kreator Planu"}</h2>
                        </div>

                        <form onSubmit={handleSavePlan} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                placeholder="Nazwa planu (np. Full Body A)"
                                value={planData.name}
                                onChange={e => setPlanData({ ...planData, name: e.target.value })}
                                required
                                style={{ padding: '10px', fontSize: '1rem' }}
                            />
                            <textarea
                                placeholder="Opis planu..."
                                value={planData.description}
                                onChange={e => setPlanData({ ...planData, description: e.target.value })}
                                style={{ padding: '10px', minHeight: '60px' }}
                            />

                            <h3>Wybierz ćwiczenia:</h3>
                            <div style={{
                                maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--border-color)',
                                padding: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px'
                            }}>
                                {allExercises.map(ex => (
                                    <label key={ex.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '5px', background: 'var(--bg-primary)' }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedExercises.includes(ex.id)}
                                            onChange={() => toggleExercise(ex.id)}
                                        />
                                        <span>{ex.name} <small style={{ color: 'grey' }}>({ex.body_part})</small></span>
                                    </label>
                                ))}
                            </div>

                            <div style={{display:'flex', gap:'10px'}}>
                                <button type="submit" style={{ flex:1, padding: '12px', background: 'var(--btn-primary-bg)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}>
                                    {editingPlanId ? "Zapisz Zmiany" : "Utwórz Plan"}
                                </button>
                                {editingPlanId && (
                                    <button type="button" onClick={resetCreator} style={{ padding: '12px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--text-secondary)', borderRadius: '5px', cursor: 'pointer' }}>
                                        Anuluj
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                )}

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {plans.length === 0 ? <p>Nie masz jeszcze żadnych planów.</p> :
                        plans.map(plan => (
                            <div key={plan.id} className={styles.planCard} style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '15px', right: '15px', display:'flex', gap:'10px' }}>
                                    <button
                                        onClick={() => startEditing(plan)}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '1.2rem' }}
                                        title="Edytuj plan"
                                    >
                                        <FaIcons.FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDeletePlan(plan.id)}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}
                                        title="Usuń plan"
                                    >
                                        <FaIcons.FaTrash />
                                    </button>
                                </div>

                                <h2 style={{ marginTop: 0 }}>{plan.name}</h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{plan.description}</p>

                                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                                    <strong style={{ fontSize: '0.9rem' }}>Ćwiczenia:</strong>
                                    {plan.exercises && plan.exercises.length > 0 ? (
                                        <ul style={{ paddingLeft: '20px', marginTop: '5px', fontSize: '0.95rem' }}>
                                            {plan.exercises.map(ex => (
                                                <li key={ex.id} style={{ marginBottom: '3px' }}>
                                                    {ex.name} <span style={{ color: 'grey', fontSize: '0.8em' }}>({ex.body_part})</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'grey', margin: '5px 0' }}>Brak przypisanych ćwiczeń.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Plans;
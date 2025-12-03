import React, { useEffect, useState } from "react";
import styles from './exercises.module.css';
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

const Exercises = () => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    // Stan formularza
    const [formData, setFormData] = useState({ name: '', body_part: 'Chest', description: '', video_url: '' });
    const [editingId, setEditingId] = useState(null); // ID edytowanego ćwiczenia (null = tryb dodawania)
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();

    const fetchExercises = async () => {
        try {
            const res = await fetch('/api/exercises', { credentials: 'include' });
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

    // Obsługa formularza (Dodawanie LUB Edycja)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');

        const url = editingId ? `/api/exercises/${editingId}` : '/api/exercises';
        const method = editingId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                setMsg(editingId ? 'Zaktualizowano!' : 'Dodano ćwiczenie!');
                setFormData({ name: '', body_part: 'Chest', description: '', video_url: '' });
                setEditingId(null); // Wyjście z trybu edycji
                fetchExercises();
            } else {
                setMsg(data.error || 'Błąd zapisu.');
            }
        } catch (err) {
            console.error(err);
            setMsg('Błąd połączenia.');
        }
    };

    const handleDeleteExercise = async (id) => {
        if(!window.confirm("Czy na pewno chcesz usunąć to ćwiczenie? Zostanie ono usunięte również ze wszystkich planów treningowych!")) return;
        try {
            const res = await fetch(`/api/exercises/${id}`, { method: 'DELETE', credentials: 'include' });
            if (res.ok) setExercises(prev => prev.filter(ex => ex.id !== id));
            else alert("Błąd usuwania");
        } catch (err) { console.error(err); }
    };

    // Włączenie trybu edycji
    const startEditing = (ex) => {
        setFormData({
            name: ex.name,
            body_part: ex.body_part,
            description: ex.description || '',
            video_url: ex.video_url || ''
        });
        setEditingId(ex.id);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Przewiń do formularza
    };

    // Anulowanie edycji
    const cancelEditing = () => {
        setFormData({ name: '', body_part: 'Chest', description: '', video_url: '' });
        setEditingId(null);
        setMsg('');
    };

    if (loading) return <p style={{padding: '2rem'}}>Ładowanie...</p>;

    return (
        <div className={styles.exercisesBackground}>
            <div className={styles.exercisesContainer}>
                <h1>Baza Ćwiczeń</h1>

                {/* Formularz */}
                <div className={styles.exerciseCard} style={{border: editingId ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)'}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <h3>{editingId ? 'Edytuj ćwiczenie' : 'Dodaj nowe ćwiczenie'}</h3>
                        {editingId && <button onClick={cancelEditing} style={{background:'transparent', border:'none', cursor:'pointer', color:'red'}}>Anuluj</button>}
                    </div>

                    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                        <input
                            placeholder="Nazwa ćwiczenia"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            required
                            style={{padding: '8px'}}
                        />
                        <select
                            value={formData.body_part}
                            onChange={e => setFormData({...formData, body_part: e.target.value})}
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
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                            style={{padding: '8px'}}
                        />
                        <button type="submit" style={{padding: '10px', background: 'var(--btn-primary-bg)', color: '#fff', border: 'none', cursor: 'pointer'}}>
                            {editingId ? 'Zapisz zmiany' : 'Dodaj'}
                        </button>
                    </form>
                    {msg && <p style={{marginTop:'10px'}}>{msg}</p>}
                </div>

                <div style={{display:'grid', gap:'1rem', marginTop: '2rem'}}>
                    {exercises.map(ex => (
                        <div key={ex.id} className={styles.exerciseCard} style={{position: 'relative'}}>
                            <div style={{position: 'absolute', top: '15px', right: '15px', display:'flex', gap:'10px'}}>
                                <button
                                    onClick={() => startEditing(ex)}
                                    style={{background: 'transparent', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '1.1rem'}}
                                    title="Edytuj"
                                >
                                    <FaIcons.FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDeleteExercise(ex.id)}
                                    style={{background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.1rem'}}
                                    title="Usuń"
                                >
                                    <FaIcons.FaTrash />
                                </button>
                            </div>

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
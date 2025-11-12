import React, { useEffect, useState } from "react";
import styles from './measurement.module.css';
// import { Link } from "react-router-dom"; 

// Fetchowanie z bazy danych z tabeli 'measurements'
const Measurement = () => {
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        // TYLKO relative path! Vite proxy przekieruje na backend
        const res = await fetch('/api/measurements');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        console.log('Fetched measurements:', data); // debug
        setMeasurements(data);
      } catch (err) {
        console.error('Fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeasurements();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!measurements.length) return <p>No measurements found.</p>;

  // Można zmienić (stricte frontend)
  return (
    <div className={styles.measurementBackground}>
      <div className={styles.measurementContainer}>
        <h1>My Measurements</h1>
        {/* Previous (mozna usunąć)
        <h1>Measurement Page</h1>
        <p>Measurement page content</p>
        */}
        {measurements.map(m => (
          <div key={m.id} className={styles.measurementCard}>
            <p><strong>Date:</strong> {new Date(m.date).toLocaleDateString()}</p>
            <p><strong>Weight:</strong> {m.body_weight} kg</p>
            <p><strong>Body Fat:</strong> {m.body_fat_perc} %</p>
            <p><strong>Chest:</strong> {m.chest} cm</p>
            <p><strong>Waist:</strong> {m.waist} cm</p>
            <p><strong>Hips:</strong> {m.hips} cm</p>
            <p><strong>Biceps:</strong> {m.biceps} cm</p>
            <p><strong>Thighs:</strong> {m.thighs} cm</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Measurement;

import React, { useEffect, useState } from "react";
import styles from './settings.module.css';
import { useNavigate } from "react-router-dom"; // IMPORT

const Settings = () => {
    // Stan może przechowywać obiekt z danymi usera
    const [settings, setSettings] = useState(null); // NOWY STAN
    const [loading, setLoading] = useState(true); // NOWY STAN
    const navigate = useNavigate(); // NOWY STAN

    // NOWA LOGIKA POBIERANIA DANYCH
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/user-settings', { // ZMIANA ENDPOINTU
                    method: 'GET',
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
        setSettings(data); // ZAPIS DANYCH DO STANU
      } catch (err) {
        console.error('Fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [navigate]);

  // RENDEROWANIE WARUNKOWE
  if (loading) return <p>Ładowanie ustawień...</p>;
  if (!settings) return <p>Nie udało się wczytać ustawień.</p>;

  return (
    <div className={styles.settingsBackground}>
      <div className={styles.settingsContainer}>
        <h1>My Settings</h1>
        {/* Przykładowy formularz (na razie tylko do odczytu) */}
        <form className={styles.settingsForm}>
          <div>
            <label htmlFor="username">Nazwa użytkownika</label>
            <input id="username" type="text" value={settings.username} readOnly />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={settings.email} readOnly />
          </div>
          {/* Tutaj możesz dodać logikę zmiany hasła itp. */}
        </form>
      </div>
    </div>
  );
}

export default Settings;
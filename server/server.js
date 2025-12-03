// server.js (ES modules)
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {dirname} from 'path';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// mysql database
import mysql from 'mysql2/promise';

// Ładowanie zmiennych środowiskowych z .env
dotenv.config();

// Inicjalizacja Express i ustawienia ścieżek
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);
console.log(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // Pozwalamy na zapytania z zewnątrz
app.use(cookieParser());

// Konfiguracja bazy danych z pliku .env
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'temple_of_gains'
});

// Statyczne pliki Reacta
app.use(express.static(path.join(__dirname, '../dist')));

// --- MIDDLEWARE (BRAMKARZ) ---
function authenticateToken(req, res, next) {
    const token = req.cookies.token; // <<< ODCZYTAJ TOKEN Z CIASTECZKA

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Błąd weryfikacji tokena:", err);
            return res.sendStatus(403);
        }
        req.user = user;
        console.log("Middleware: Zidentyfikowano użytkownika:", user);
        next();
    });
}

// API test
app.get('/api', (_req, res) => res.json({ ok: true }));


// -- endpoints --

// Endpoint logowania
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', username);

    if (!username || !password) {
        return res.status(400).json({ error: 'Please fill in the form' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Incorrect username or password' });
        }

        const user = rows[0];

        // hashowanie hasła SHA256
        const hash = crypto.createHash('sha256').update(password).digest('hex');

        if (hash !== user.password_hash) {
            return res.status(401).json({ error: 'Incorrect username or password' });
        }

        // Generowanie tokena
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Zalogowano poprawnie
        console.log(`Użytkownik ${username} zalogowany`);

        // Odsyłamy token do frontendu razem z danymi użytkownika
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });
        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Endpoint rejestracji
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing data' });
    }

    // sprawdzanie czy jest juz taki uzytkownik o takim username lub emailu
    const [existsUser] = await pool.query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    const [existsEmail] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existsUser.length > 0)  {
      return res.status(409).json({ error: 'Nazwa użytkownika jest już zajęta.' });
    }

    if (existsEmail.length > 0)  {
      return res.status(409).json({ error: 'E-mail jest już użyty przez innego użytkownika. Jeśli nie pamiętasz hasła, skontaktuj się z administratorem.' });
    }

    // HASHOWANIE SHA256 
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    // zapis do bazy
    await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hash]
    );

    console.log(`Użytkownik ${username} zarejestrowany`);
    return res.status(201).json({ success: true });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// endpoint do sprawdzania nazwy uzytkownika podczas rejestracji
app.post('/api/check-username', async (req, res) => {
    
    console.log(req.body);
    const [existsUser] = await pool.query(
      'SELECT id FROM users WHERE username = ?',
      [req.body.username]
    );

    if (existsUser.length > 0)  {
      return res.status(409).json({ error: 'Nazwa użytkownika jest już zajęta.' });
    }

    return res.status(200).json({info: "Nazwa wolna."})
});

// Endpoint zwracający pomiary użytkownika
// POPRAWIONY: Pobiera ID z tokena (req.user.id), a nie z URL
app.get('/api/measurements', authenticateToken, async (req, res) => {
    // TU BYŁ BŁĄD: const userId = req.query.user_id;
    // POPRAWKA:
    const userId = req.user.id;

    console.log(`DEBUG: Endpoint measurements widzi User ID: ${userId}`);

    try {
        const [rows] = await pool.query(
            'SELECT * FROM measurements WHERE user_id = ? ORDER BY date DESC',
            [userId]
        );

        console.log(`DEBUG: Znaleziono ${rows.length} pomiarów`); // DEBUG
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Endpoint zwracający plany treningowe użytkownika
app.get('/api/plans', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM workoutplans WHERE user_id = ?',
            [userId]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});
// Tworzenie planu (POST) - uwzględnia przypisanie ćwiczeń
app.post('/api/plans', authenticateToken, async (req, res) => {
    const { name, description, exercises } = req.body; // exercises to tablica ID ćwiczeń, np. [1, 5, 10]
    const userId = req.user.id;

    // Walidacja
    if (!name) {
        return res.status(400).json({ error: 'Nazwa planu jest wymagana.' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Utwórz plan
        const [planResult] = await connection.query(
            'INSERT INTO workoutplans (user_id, name, description) VALUES (?, ?, ?)',
            [userId, name, description]
        );
        const planId = planResult.insertId;

        // 2. Jeśli wybrano ćwiczenia, przypisz je do planu
        if (exercises && Array.isArray(exercises) && exercises.length > 0) {
            const values = exercises.map((exId, index) => [planId, exId, index + 1]);
            await connection.query(
                'INSERT INTO planexercises (plan_id, exercise_id, order_index) VALUES ?',
                [values]
            );
        }

        await connection.commit();
        res.status(201).json({ success: true, id: planId, message: 'Plan został utworzony.' });

    } catch (err) {
        await connection.rollback();
        console.error('Create Plan Error:', err);
        res.status(500).json({ error: 'Błąd podczas tworzenia planu.' });
    } finally {
        connection.release();
    }
});
// Usuwanie planu (DELETE)
app.delete('/api/plans/:id', authenticateToken, async (req, res) => {
    const planId = req.params.id;
    const userId = req.user.id;

    try {
        // Sprawdź, czy plan należy do użytkownika
        const [result] = await pool.query(
            'DELETE FROM workoutplans WHERE id = ? AND user_id = ?',
            [planId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Plan nie istnieje lub brak uprawnień.' });
        }

        res.json({ success: true, message: 'Plan usunięty.' });
    } catch (err) {
        console.error('Delete Plan Error:', err);
        res.status(500).json({ error: 'Błąd bazy danych.' });
    }
});

// Edycja planu (PUT) - prosta edycja nazwy/opisu (bez edycji listy ćwiczeń dla uproszczenia)
app.put('/api/plans/:id', authenticateToken, async (req, res) => {
    const planId = req.params.id;
    const userId = req.user.id;
    const { name, description } = req.body;

    if (!name) return res.status(400).json({ error: 'Nazwa jest wymagana.' });

    try {
        const [result] = await pool.query(
            'UPDATE workoutplans SET name = ?, description = ? WHERE id = ? AND user_id = ?',
            [name, description, planId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nie znaleziono planu.' });
        }

        res.json({ success: true, message: 'Plan zaktualizowany.' });
    } catch (err) {
        console.error('Update Plan Error:', err);
        res.status(500).json({ error: 'Błąd bazy danych.' });
    }
});

// Endpoint dodający nowe ćwiczenie do bazy (chroniony)
app.post('/api/exercises', authenticateToken, async (req, res) => {
    const { name, description, body_part, video_url } = req.body;

    // Walidacja
    if (!name || !body_part) {
        return res.status(400).json({ error: 'Nazwa i partia mięśniowa są wymagane.' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO exercises (name, description, body_part, video_url) VALUES (?, ?, ?, ?)',
            [name, description, body_part, video_url]
        );
        res.status(201).json({ success: true, id: result.insertId, message: 'Dodano ćwiczenie.' });
    } catch (err) {
        console.error('Add Exercise Error:', err);
        res.status(500).json({ error: 'Błąd bazy danych.' });
    }
});

// Endpoint zwracający bazę wszystkich ćwiczeń (publiczny, ale chroniony)
app.get('/api/exercises', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM exercises ORDER BY body_part, name');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});
// Endpoint zwracający historię treningów użytkownika
app.get('/api/history', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC',
            [userId]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});
// Endpoint zwracający dane usera (do ustawień)
app.get('/api/user-settings', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const [rows] = await pool.query(
            'SELECT id, username, email FROM users WHERE id = ?',
            [userId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(rows[0]); // Zwracamy tylko obiekt użytkownika, nie tablicę
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Endpoint wylogowania
app.post('/api/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
    res.json({ success: true, message: "Wylogowano" });
});



// załadowanie strony z pliku (obsługa routingu Reacta)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Test połączenia z bazą
(async () => {
    try {
        console.log('Połączono z bazą MySQL!');
    } catch (err) {
        console.error('Błąd połączenia z bazą:', err.message);
    }
})();
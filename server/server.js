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

// -- endpoints --
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
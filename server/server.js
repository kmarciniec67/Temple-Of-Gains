// server.js (ES modules)
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {dirname} from 'path';

// mysql database
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);
console.log(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API test
app.get('/api', (_req, res) => res.json({ ok: true }));

// statyczne pliki Reacta
app.use(express.static(path.join(__dirname, '../dist')));

// -- endpoints --
// Note: Endpoint'y powinny się znajdować nad załadowaniem pliku
// inaczej express złapie żądanie i wyśle plik strony jako odpowiedź

// Endpoint logowania
// Note: Testowe (konto:haslo) -> admin:admin123, janek:janek123, ania:ania123
import crypto from 'crypto';

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

    // Zalogowano poprawnie
    console.log(`Użytkownik ${username} zalogowany`);
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

// Endpoint zwracający pomiary użytkownika
// Note: brane są dane z kwerendy logowania i przechowywane w localStorage, nie wiem czy to dobrze, 
// ewneutalnie będzie można zmienić na pobieranie ich z tokena JWT lub sesji, zamiast 'userId'
app.get('/api/measurements', async (req, res) => {
  const userId = req.query.user_id;

  if (!userId) {
    return res.status(400).json({ error: 'No user_id in query' }); // Tak powinno być przy deployu
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM measurements WHERE user_id = ? ORDER BY date DESC',
      [userId] 
    );
    // console.log('Rows from DB:', rows); // DEBUG
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// -- endpoints --

// załadowanie strony z pliku
app.use('/',(req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Mysql connection 
// TODO: Zmienić hardcoded dane i zaimplementować .env
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'temple_of_gains'
});

/*
// Note: Przykładowa implementajca .env
// npm install dotenv 
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
*/

// Database connection test
// Note: Async jest tu lepszy od 'app.get', bo nie ma doczynienia z zapytaniem od przeglądarki
(async () => { 
  try {
    //const [rows] = await pool.query('SELECT * FROM users'); // DEBUG
    console.log('Połączono z bazą MySQL!'); // Test query:', rows[0]);
  } catch (err) {
    console.error('Błąd połączenia z bazą:', err.message);
  }
})();
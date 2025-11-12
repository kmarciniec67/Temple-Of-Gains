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
// Note: Ważne: Endpoint'y powinny się znajdować nad załadowaniem pliku
// inaczej express złapie żądanie i wyśle plik strony jako odpowiedź

/*
  TODO: później podpiąć prawdziwe logowanie i przekazywać user_id
  z tokena JWT lub sesji, zamiast DEFAULT_USER_ID
*/
const DEFAULT_USER_ID = 1; // hardcoded admin as logged in user

// Endpoint zwracający pomiary użytkownika
app.get('/api/measurements', async (_req, res) => {
  console.log('test1');
  try {
    const [rows] = await pool.query(
      'SELECT * FROM measurements WHERE user_id = ? ORDER BY date DESC',
      [DEFAULT_USER_ID] // <- na razie hardcoded
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
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

// załadowanie strony z pliku
app.use('/',(req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Mysql connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  pasword: '', // Na razie git, ale trzeba będzie pomyśleć nad .env
  database: 'temple_of_gains'
});

// npm install dotenv (na czas developmentu niepotrzebne)
/*
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
*/

// database test dziala :D
// async jest lepszy od app.get, jak nie potrzeba pracować na endpointach HTTP
// (czyli gdy zapytanie przychodzi od przeglądarki dopiero to wtedy app.get...)
(async () => { 
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    console.log('Połączono z bazą MySQL! Test query:', rows[0]);
  } catch (err) {
    console.error('Błąd połączenia z bazą:', err.message);
  }
})();

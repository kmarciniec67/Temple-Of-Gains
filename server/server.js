// server.js (ES modules)
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {dirname} from 'path';

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

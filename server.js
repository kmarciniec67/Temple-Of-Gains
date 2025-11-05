// server.js
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Temple of Gains backend działa!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

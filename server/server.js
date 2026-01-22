// server.js (ES modules)
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import process from "process";

// mysql database
import mysql from "mysql2/promise";

// Ładowanie zmiennych środowiskowych z .env
dotenv.config();

console.log("CWD:", process.cwd());
console.log("Loaded JWT_SECRET?", Boolean(process.env.JWT_SECRET));
console.log("JWT_SECRET:", JSON.stringify(process.env.JWT_SECRET));

if (!process.env.JWT_SECRET) {
  throw new Error(
    "Missing JWT_SECRET in environment. Check .env loading. .env should be in root folder.",
  );
}

// Inicjalizacja Express i ustawienia ścieżek
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);
console.log(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
); // Pozwalamy na zapytania z zewnątrz
app.use(cookieParser());

// Konfiguracja bazy danych z pliku .env
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "temple_of_gains",
});

// Statyczne pliki Reacta
app.use(express.static(path.join(__dirname, "../dist")));

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

function toCSV(rows) {
  if (!rows || rows.length === 0) return "no_data\n";
  const headers = Object.keys(rows[0]);
  const esc = (v) => {
    if (v === null || v === undefined) return "";
    const s = String(v).replaceAll('"', '""');
    return `"${s}"`;
  };
  return [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => esc(r[h])).join(",")),
  ].join("\n");
}

// API test
app.get("/api", (_req, res) => res.json({ ok: true }));

// -- endpoints --

// Endpoint logowania
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username);

  if (!username || !password) {
    return res.status(400).json({ error: "Please fill in the form" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    const user = rows[0];

    // hashowanie hasła SHA256
    const hash = crypto.createHash("sha256").update(password).digest("hex");

    if (hash !== user.password_hash) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    // Generowanie tokena
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // Zalogowano poprawnie
    console.log(`Użytkownik ${username} zalogowany`);

    // Odsyłamy token do frontendu razem z danymi użytkownika
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Endpoint rejestracji
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing data" });
    }

    // sprawdzanie czy jest juz taki uzytkownik o takim username lub emailu
    const [existsUser] = await pool.query(
      "SELECT id FROM users WHERE username = ?",
      [username],
    );

    const [existsEmail] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );

    if (existsUser.length > 0) {
      return res
        .status(409)
        .json({ error: "Nazwa użytkownika jest już zajęta." });
    }

    if (existsEmail.length > 0) {
      return res.status(409).json({
        error:
          "E-mail jest już użyty przez innego użytkownika. Jeśli nie pamiętasz hasła, skontaktuj się z administratorem.",
      });
    }

    // HASHOWANIE SHA256
    const hash = crypto.createHash("sha256").update(password).digest("hex");

    // zapis do bazy
    await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, hash],
    );

    console.log(`Użytkownik ${username} zarejestrowany`);
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// endpoint do sprawdzania nazwy uzytkownika podczas rejestracji
app.post("/api/check-username", async (req, res) => {
  console.log(req.body);
  const [existsUser] = await pool.query(
    "SELECT id FROM users WHERE username = ?",
    [req.body.username],
  );

  if (existsUser.length > 0) {
    return res
      .status(409)
      .json({ error: "Nazwa użytkownika jest już zajęta." });
  }

  return res.status(200).json({ info: "Nazwa wolna." });
});

//Endpoint do stats w dashboard
app.get("/api/workouts/stats", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // 1) Ostatni trening + nazwa planu
    const [lastRows] = await pool.query(
      `
      SELECT w.id, w.date, w.plan_id, wp.name AS plan_name
      FROM workouts w
      LEFT JOIN workoutplans wp ON wp.id = w.plan_id
      WHERE w.user_id = ?
      ORDER BY w.date DESC
      LIMIT 1
      `,
      [userId],
    );

    const lastWorkout = lastRows[0] || null;

    // 2) Treningi w tym tygodniu (ISO week) + tonaż tygodnia (w tym tygodniu)
    const [last7dRows] = await pool.query(
      `
  SELECT
    COUNT(DISTINCT w.id) AS last7d_workouts_count,
    COALESCE(SUM(COALESCE(wd.reps,0) * COALESCE(wd.weight,0)), 0) AS last7d_total_volume
  FROM workouts w
  LEFT JOIN workoutdetails wd ON wd.workout_id = w.id
  WHERE w.user_id = ?
    AND w.date >= (NOW() - INTERVAL 7 DAY)
  `,
      [userId],
    );

    const last7dWorkoutsCount = Number(
      last7dRows[0]?.last7d_workouts_count || 0,
    );
    const last7dTotalVolume = Number(last7dRows[0]?.last7d_total_volume || 0);
    const last7dAvgVolume =
      last7dWorkoutsCount > 0 ? last7dTotalVolume / last7dWorkoutsCount : 0;

    res.json({
      last_workout: lastWorkout,
      last7d_workouts_count: last7dWorkoutsCount,
      last7d_total_volume: last7dTotalVolume,
      last7d_avg_volume: last7dAvgVolume,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Endpoint zwracający pomiary użytkownika
// POPRAWIONY: Pobiera ID z tokena (req.user.id), a nie z URL
app.get("/api/measurements", authenticateToken, async (req, res) => {
  // TU BYŁ BŁĄD: const userId = req.query.user_id;
  // POPRAWKA:
  const userId = req.user.id;

  console.log(`DEBUG: Endpoint measurements widzi User ID: ${userId}`);

  try {
    const [rows] = await pool.query(
      "SELECT * FROM measurements WHERE user_id = ? ORDER BY date DESC",
      [userId],
    );

    console.log(`DEBUG: Znaleziono ${rows.length} pomiarów`); // DEBUG
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Endpoint dodający nowy pomiar
app.post("/api/measurements", authenticateToken, async (req, res) => {
  const {
    date,
    height,
    body_weight,
    body_fat_perc,
    chest,
    waist,
    hips,
    biceps,
    thighs,
  } = req.body;

  const userId = req.user.id;

  // Walidacja podstawowa
  if (!date || !body_weight) {
    return res.status(400).json({ error: "Data i waga ciała są wymagane." });
  }

  const toNumOrNull = (v) => {
    if (v === "" || v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const isISODate = /^\d{4}-\d{2}-\d{2}$/.test(date);
  if (!isISODate) {
    return res
      .status(400)
      .json({ error: "Niepoprawny format daty (wymagane YYYY-MM-DD)." });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = new Date(date);
  selected.setHours(0, 0, 0, 0);

  if (Number.isNaN(selected.getTime())) {
    return res.status(400).json({ error: "Niepoprawna data." });
  }

  if (selected > today) {
    return res
      .status(400)
      .json({ error: "Data pomiaru nie może być z przyszłości." });
  }

  let finalHeight = toNumOrNull(height);

  if (finalHeight === null) {
    const [[last]] = await pool.query(
      `
      SELECT height
      FROM measurements
      WHERE user_id = ? AND height IS NOT NULL
      ORDER BY date DESC, id DESC
      LIMIT 1
      `,
      [userId],
    );
    finalHeight = last?.height ?? null;
  }

  if (finalHeight === null) {
    return res
      .status(400)
      .json({ error: "Wzrost jest wymagany przy pierwszym pomiarze." });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO measurements 
            (user_id, date, height, body_weight, body_fat_perc, chest, waist, hips, biceps, thighs) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        date,
        finalHeight,
        toNumOrNull(body_weight),
        toNumOrNull(body_fat_perc),
        toNumOrNull(chest),
        toNumOrNull(waist),
        toNumOrNull(hips),
        toNumOrNull(biceps),
        toNumOrNull(thighs),
      ],
    );

    res.status(201).json({
      success: true,
      id: result.insertId,
      message: "Pomyślnie dodano pomiar.",
    });
  } catch (err) {
    console.error("Add Measurement Error:", err);
    res.status(500).json({ error: "Błąd bazy danych." });
  }
});

// ENDPOINT Usuń pomiar (tylko właściciel)
app.delete("/api/measurements/:id", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  if (!id || Number.isNaN(Number(id))) {
    return res.status(400).json({ error: "Niepoprawne ID pomiaru." });
  }

  try {
    const [result] = await pool.query(
      "DELETE FROM measurements WHERE id = ? AND user_id = ?",
      [id, userId],
    );

    if (result.affectedRows === 0) {
      // albo nie istnieje, albo nie należy do użytkownika
      return res.status(404).json({ error: "Nie znaleziono pomiaru." });
    }

    return res.json({ success: true, id: Number(id) });
  } catch (err) {
    console.error("Delete Measurement Error:", err);
    return res.status(500).json({ error: "Błąd bazy danych." });
  }
});

// Endpoint edytujący pomiar (tylko właściciel)
app.put("/api/measurements/:id", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const {
    date,
    height,
    body_weight,
    body_fat_perc,
    chest,
    waist,
    hips,
    biceps,
    thighs,
  } = req.body;

  if (!id || Number.isNaN(Number(id))) {
    return res.status(400).json({ error: "Niepoprawne ID pomiaru." });
  }
  if (!date) {
    return res.status(400).json({ error: "Data pomiaru jest wymagana." });
  }

  // Akceptujemy tylko YYYY-MM-DD
  const isISODate = /^\d{4}-\d{2}-\d{2}$/.test(date);
  if (!isISODate) {
    return res
      .status(400)
      .json({ error: "Niepoprawny format daty (wymagane YYYY-MM-DD)." });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = new Date(date);
  selected.setHours(0, 0, 0, 0);

  if (Number.isNaN(selected.getTime())) {
    return res.status(400).json({ error: "Niepoprawna data." });
  }

  if (selected > today) {
    return res
      .status(400)
      .json({ error: "Data pomiaru nie może być z przyszłości." });
  }

  const toNumOrNull = (v) => {
    if (v === "" || v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  try {
    const [result] = await pool.query(
      `UPDATE measurements
       SET date = ?,  height = ?, body_weight = ?, body_fat_perc = ?, chest = ?, waist = ?, hips = ?, biceps = ?, thighs = ?
       WHERE id = ? AND user_id = ?`,
      [
        date,
        toNumOrNull(height),
        toNumOrNull(body_weight),
        toNumOrNull(body_fat_perc),
        toNumOrNull(chest),
        toNumOrNull(waist),
        toNumOrNull(hips),
        toNumOrNull(biceps),
        toNumOrNull(thighs),
        id,
        userId,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Nie znaleziono pomiaru." });
    }

    const [rows] = await pool.query(
      "SELECT * FROM measurements WHERE id = ? AND user_id = ?",
      [id, userId],
    );

    return res.json(rows[0]);
  } catch (err) {
    console.error("Update Measurement Error:", err);
    return res.status(500).json({ error: "Błąd bazy danych." });
  }
});

// Endpoint zwracający plany treningowe użytkownika
app.get("/api/plans", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    // Zapytanie łączące plany (workoutplans) z ćwiczeniami (exercises) poprzez tabelę łączącą (planexercises)
    const query = `
            SELECT wp.id as plan_id, wp.name as plan_name, wp.description as plan_desc,
                   e.id as exercise_id, e.name as exercise_name, e.body_part
            FROM workoutplans wp
            LEFT JOIN planexercises pe ON wp.id = pe.plan_id
            LEFT JOIN exercises e ON pe.exercise_id = e.id
            WHERE wp.user_id = ?
            ORDER BY wp.id DESC, pe.order_index ASC
        `;

    const [rows] = await pool.query(query, [userId]);

    // Grupujemy płaskie wyniki z bazy danych w obiekty planów zawierające tablice ćwiczeń
    const plansMap = new Map();

    rows.forEach((row) => {
      if (!plansMap.has(row.plan_id)) {
        plansMap.set(row.plan_id, {
          id: row.plan_id,
          name: row.plan_name,
          description: row.plan_desc,
          exercises: [], // Pusta tablica na start
        });
      }

      if (row.exercise_id) {
        // Jeśli plan ma przypisane ćwiczenie, dodajemy je do listy
        plansMap.get(row.plan_id).exercises.push({
          id: row.exercise_id,
          name: row.exercise_name,
          body_part: row.body_part,
        });
      }
    });

    // Zamieniamy mapę z powrotem na tablicę, którą wyślemy do frontendu
    const result = Array.from(plansMap.values());
    res.json(result);
  } catch (err) {
    console.error("Błąd pobierania planów:", err);
    res.status(500).json({ error: "Database error" });
  }
});
// Endpoint do tworzenia planow
app.post("/api/plans", authenticateToken, async (req, res) => {
  const { name, description, exercises } = req.body;
  const userId = req.user.id;

  // Walidacja
  if (!name) {
    return res.status(400).json({ error: "Nazwa planu jest wymagana." });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Utwórz plan
    const [planResult] = await connection.query(
      "INSERT INTO workoutplans (user_id, name, description) VALUES (?, ?, ?)",
      [userId, name, description],
    );
    const planId = planResult.insertId;

    // 2. Jeśli wybrano ćwiczenia, przypisz je do planu
    if (exercises && Array.isArray(exercises) && exercises.length > 0) {
      const values = exercises.map((exId, index) => [planId, exId, index + 1]);
      await connection.query(
        "INSERT INTO planexercises (plan_id, exercise_id, order_index) VALUES ?",
        [values],
      );
    }

    await connection.commit();
    res
      .status(201)
      .json({ success: true, id: planId, message: "Plan został utworzony." });
  } catch (err) {
    await connection.rollback();
    console.error("Create Plan Error:", err);
    res.status(500).json({ error: "Błąd podczas tworzenia planu." });
  } finally {
    connection.release();
  }
});
// Endpoint do usuwania planów (DELETE)
app.delete("/api/plans/:id", authenticateToken, async (req, res) => {
  const planId = req.params.id;
  const userId = req.user.id;

  try {
    // Sprawdź, czy plan należy do użytkownika
    const [result] = await pool.query(
      "DELETE FROM workoutplans WHERE id = ? AND user_id = ?",
      [planId, userId],
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Plan nie istnieje lub brak uprawnień." });
    }

    res.json({ success: true, message: "Plan usunięty." });
  } catch (err) {
    console.error("Delete Plan Error:", err);
    res.status(500).json({ error: "Błąd bazy danych." });
  }
});

// Endpoint do edycji planow (PUT)
app.put("/api/plans/:id", authenticateToken, async (req, res) => {
  const planId = req.params.id;
  const userId = req.user.id;
  const { name, description, exercises } = req.body; // exercises = tablica ID wybranych ćwiczeń

  if (!name) return res.status(400).json({ error: "Nazwa jest wymagana." });

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Aktualizacja nazwy i opisu planu
    const [updateResult] = await connection.query(
      "UPDATE workoutplans SET name = ?, description = ? WHERE id = ? AND user_id = ?",
      [name, description, planId, userId],
    );

    if (updateResult.affectedRows === 0) {
      await connection.rollback();
      return res
        .status(404)
        .json({ error: "Plan nie istnieje lub brak uprawnień." });
    }

    // 2. Aktualizacja ćwiczeń
    await connection.query("DELETE FROM planexercises WHERE plan_id = ?", [
      planId,
    ]);

    // 3. Dodaj nowe ćwiczenia, jeśli jakieś zaznaczono
    if (exercises && Array.isArray(exercises) && exercises.length > 0) {
      const values = exercises.map((exId, index) => [planId, exId, index + 1]);
      await connection.query(
        "INSERT INTO planexercises (plan_id, exercise_id, order_index) VALUES ?",
        [values],
      );
    }

    await connection.commit();
    res.json({ success: true, message: "Plan zaktualizowany." });
  } catch (err) {
    await connection.rollback();
    console.error("Update Plan Error:", err);
    res.status(500).json({ error: "Błąd podczas edycji planu." });
  } finally {
    connection.release();
  }
});

// Endpoint dodający nowe ćwiczenie do bazy
app.post("/api/exercises", authenticateToken, async (req, res) => {
  const { name, description, body_part, video_url } = req.body;

  // Walidacja
  if (!name || !body_part) {
    return res
      .status(400)
      .json({ error: "Nazwa i partia mięśniowa są wymagane." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO exercises (name, description, body_part, video_url) VALUES (?, ?, ?, ?)",
      [name, description, body_part, video_url],
    );
    res.status(201).json({
      success: true,
      id: result.insertId,
      message: "Dodano ćwiczenie.",
    });
  } catch (err) {
    console.error("Add Exercise Error:", err);
    res.status(500).json({ error: "Błąd bazy danych." });
  }
});

// Endpoint zwracający bazę wszystkich ćwiczeń
app.get("/api/exercises", authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM exercises ORDER BY body_part, name",
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Endpoint usuwanie ćwiczen (DELETE)
app.delete("/api/exercises/:id", authenticateToken, async (req, res) => {
  const exerciseId = req.params.id;

  try {
    // Uwaga: Baza danych jest skonfigurowana z "ON DELETE CASCADE" dla planów i historii,
    // więc usunięcie ćwiczenia usunie je również z wszystkich planów treningowych!
    const [result] = await pool.query("DELETE FROM exercises WHERE id = ?", [
      exerciseId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Ćwiczenie nie istnieje." });
    }

    res.json({ success: true, message: "Ćwiczenie usunięte." });
  } catch (err) {
    console.error("Delete Exercise Error:", err);
    res.status(500).json({ error: "Błąd bazy danych." });
  }
});

// Endpoint pozwalajacy edytowac cwiczenia
app.put("/api/exercises/:id", authenticateToken, async (req, res) => {
  const exerciseId = req.params.id;
  const { name, description, body_part, video_url } = req.body;

  if (!name || !body_part) {
    return res
      .status(400)
      .json({ error: "Nazwa i partia mięśniowa są wymagane." });
  }

  try {
    const [result] = await pool.query(
      "UPDATE exercises SET name = ?, description = ?, body_part = ?, video_url = ? WHERE id = ?",
      [name, description, body_part, video_url, exerciseId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Ćwiczenie nie istnieje." });
    }

    res.json({ success: true, message: "Ćwiczenie zaktualizowane." });
  } catch (err) {
    console.error("Update Exercise Error:", err);
    res.status(500).json({ error: "Błąd bazy danych." });
  }
});

// Endpoint zwracający historię treningów użytkownika
app.get("/api/history", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC",
      [userId],
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});  

// add Workout endpoint
app.post("/api/workouts", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { plan_id, date } = req.body;
  
    if (!date) {
      return res.status(400).json({ error: "Data jest wymagana" });
    }
  
    try {
      const [result] = await pool.query(
        "INSERT INTO workouts (user_id, plan_id, date) VALUES (?, ?, ?)",
        [userId, plan_id ?? null, date]
      );
  
      res.status(201).json({
        success: true,
        workout_id: result.insertId,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  });

// add workout set endpoint
app.post("/api/workouts/:id/sets", authenticateToken, async (req, res) => {
    const workoutId = Number(req.params.id);
    const { exercise_id, set_number, reps, weight } = req.body;
  
    if (!exercise_id || !set_number) {
      return res.status(400).json({ error: "Brak danych serii" });
    }
  
    try {
      await pool.query(
        `INSERT INTO workoutdetails
         (workout_id, exercise_id, set_number, reps, weight)
         VALUES (?, ?, ?, ?, ?)`,
        [workoutId, exercise_id, set_number, reps, weight]
      );
  
      res.status(201).json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  });

  app.get("/api/workouts/:id/plan", authenticateToken, async (req, res) => {
    const workoutId = Number(req.params.id);
    if (!Number.isFinite(workoutId)) return res.status(400).json({ error: "Invalid workout id" });
  
    try {
      // Pobranie planu ćwiczeń przypisanego do tego treningu
      const [rows] = await pool.query(
        `SELECT e.id, e.name
         FROM exercises e
         JOIN planexercises pe ON e.id = pe.exercise_id
         JOIN workouts w ON w.plan_id = pe.plan_id
         WHERE w.id = ?`,
        [workoutId]
      );
  
      res.json(rows); // Zwracamy tablicę ćwiczeń
    } catch (err) {
      console.error("Błąd pobierania planu treningu:", err);
      res.status(500).json({ error: "Database error" });
    }
  });
  
  

// Endpoint zwraca workouts details
app.get("/api/workouts", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  const limit = Math.min(parseInt(req.query.limit ?? "20", 10), 100);
  const offset = Math.max(parseInt(req.query.offset ?? "0", 10), 0);

  try {
    const [rows] = await pool.query(
      `
      SELECT
        w.id,
        w.plan_id,
        w.date,
        wp.name AS plan_name,

        COUNT(wd.id) AS sets_count,
        COUNT(DISTINCT wd.exercise_id) AS exercises_count,

        COALESCE(SUM(COALESCE(wd.reps, 0) * COALESCE(wd.weight, 0)), 0) AS total_volume,
        COALESCE(SUM(COALESCE(wd.weight, 0)), 0) AS total_weight_sum

      FROM workouts w
      LEFT JOIN workoutplans wp ON wp.id = w.plan_id
      LEFT JOIN workoutdetails wd ON wd.workout_id = w.id
      WHERE w.user_id = ?
      GROUP BY w.id
      ORDER BY w.date DESC
      LIMIT ? OFFSET ?
      `,
      [userId, limit, offset],
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Endpoint zwracający jeden treningowe
app.get("/api/workouts/:id", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const workoutId = Number(req.params.id);

  if (!Number.isFinite(workoutId)) {
    return res.status(400).json({ error: "Invalid workout id" });
  }

  try {
    const [[workout]] = await pool.query(
      `
      SELECT
        w.id, w.plan_id, w.date,
        wp.name AS plan_name,
        wp.description AS plan_description
      FROM workouts w
      LEFT JOIN workoutplans wp ON wp.id = w.plan_id
      WHERE w.id = ? AND w.user_id = ?
      `,
      [workoutId, userId],
    );

    if (!workout) return res.status(404).json({ error: "Workout not found" });

    const [details] = await pool.query(
      `
      SELECT
        wd.id,
        wd.exercise_id,
        e.name AS exercise_name,
        wd.set_number,
        wd.reps,
        wd.weight
      FROM workoutdetails wd
      JOIN exercises e ON e.id = wd.exercise_id
      WHERE wd.workout_id = ?
      ORDER BY wd.exercise_id ASC, wd.set_number ASC, wd.id ASC
      `,
      [workoutId],
    );

    // Zagnieżdżenie: ćwiczenie -> serie
    const map = new Map();
    for (const row of details) {
      if (!map.has(row.exercise_id)) {
        map.set(row.exercise_id, {
          exercise_id: row.exercise_id,
          exercise_name: row.exercise_name,
          sets: [],
        });
      }
      map.get(row.exercise_id).sets.push({
        id: row.id,
        set_number: row.set_number,
        reps: row.reps,
        weight: row.weight,
      });
    }

    const exercises = Array.from(map.values());

    // Możesz też policzyć podsumowanie w backendzie (opcjonalnie)
    const summary = {
      exercises_count: exercises.length,
      sets_count: details.length,
      total_volume: details.reduce(
        (acc, s) => acc + Number(s.reps ?? 0) * Number(s.weight ?? 0),
        0,
      ),
    };

    res.json({ ...workout, summary, exercises });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Endpoint zakończenia treningu (podsumowanie)
app.post("/api/workouts/:id/finish", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const workoutId = Number(req.params.id);

  try {
    // Pobierz wszystkie serie tego treningu
    const [details] = await pool.query(
      `SELECT wd.reps, wd.weight, wd.exercise_id
       FROM workoutdetails wd
       JOIN workouts w ON w.id = wd.workout_id
       WHERE w.id = ? AND w.user_id = ?`,
      [workoutId, userId]
    );

    if (!details.length) {
      return res.status(400).json({ error: "Brak dodanych serii" });
    }

    const totalVolume = details.reduce(
      (acc, s) => acc + (Number(s.reps) || 0) * (Number(s.weight) || 0),
      0
    );
    const exercisesCount = new Set(details.map((s) => s.exercise_id)).size;

    res.json({
      success: true,
      workout_summary: {
        workout_id: workoutId,
        exercises_count: exercisesCount,
        total_volume: totalVolume,
      },
    });
  } catch (err) {
    console.error("Finish workout error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Endpoint zwracający dane usera (do ustawień)
app.get("/api/user-settings", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await pool.query(
      "SELECT id, username, email FROM users WHERE id = ?",
      [userId],
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(rows[0]); // Zwracamy tylko obiekt użytkownika, nie tablicę
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Zmiana nazwy użytkownika
app.put("/api/user/username", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { username } = req.body;

  if (!username || String(username).trim().length < 3) {
    return res
      .status(400)
      .json({ error: "Nazwa użytkownika musi mieć min. 3 znaki." });
  }

  try {
    // sprawdź czy zajęta
    const [rows] = await pool.query(
      "SELECT id FROM users WHERE username = ? AND id <> ?",
      [username, userId],
    );

    if (rows.length > 0) {
      return res
        .status(409)
        .json({ error: "Nazwa użytkownika jest już zajęta." });
    }

    await pool.query("UPDATE users SET username = ? WHERE id = ?", [
      username,
      userId,
    ]);

    const token = jwt.sign({ id: userId, username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    return res.json({ success: true, username });
  } catch (err) {
    console.error("Update username error:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/export/measurements.csv", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await pool.query(
      `SELECT date, height, body_weight, body_fat_perc, chest, waist, hips, biceps, thighs
       FROM measurements
       WHERE user_id = ?
       ORDER BY date ASC`,
      [userId],
    );

    const csv = toCSV(rows);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="measurements.csv"',
    );
    return res.send("\uFEFF" + csv);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/export/workouts.csv", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await pool.query(
      `SELECT w.id, w.date, wp.name AS plan_name
       FROM workouts w
       LEFT JOIN workoutplans wp ON wp.id = w.plan_id
       WHERE w.user_id = ?
       ORDER BY w.date ASC`,
      [userId],
    );

    const csv = toCSV(rows);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="workouts.csv"');
    return res.send("\uFEFF" + csv);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
});

app.delete("/api/user", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;

  if (!password) return res.status(400).json({ error: "Podaj hasło." });

  try {
    const [[user]] = await pool.query(
      "SELECT password_hash FROM users WHERE id = ?",
      [userId],
    );
    if (!user) return res.status(404).json({ error: "User not found" });

    const hash = crypto.createHash("sha256").update(password).digest("hex");
    if (hash !== user.password_hash) {
      return res.status(401).json({ error: "Nieprawidłowe hasło." });
    }

    await pool.query("DELETE FROM users WHERE id = ?", [userId]);

    res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
    return res.json({ success: true });
  } catch (err) {
    console.error("Delete user error:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

// Zmiana hasła użytkownika (w ustawieniach)
app.put("/api/user-settings/password", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Uzupełnij obecne i nowe hasło." });
  }

  // możesz tu wkleić swój regex "strongPasswordRegex" jak w rejestracji
  if (newPassword.length < 8) {
    return res
      .status(400)
      .json({ error: "Nowe hasło musi mieć min. 8 znaków." });
  }

  try {
    const [rows] = await pool.query(
      "SELECT password_hash FROM users WHERE id = ? LIMIT 1",
      [userId],
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    const currentHash = crypto
      .createHash("sha256")
      .update(currentPassword)
      .digest("hex");
    if (currentHash !== rows[0].password_hash) {
      // TO NIE JEST 401. To zwykły błąd walidacji.
      return res
        .status(400)
        .json({ error: "Obecne hasło jest nieprawidłowe." });
    }

    const newHash = crypto
      .createHash("sha256")
      .update(newPassword)
      .digest("hex");
    await pool.query("UPDATE users SET password_hash = ? WHERE id = ?", [
      newHash,
      userId,
    ]);

    // NIE ruszaj cookie token – nie wylogowuj
    return res.json({ success: true, message: "Hasło zostało zmienione." });
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

// Endpoint wylogowania
app.post("/api/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
  res.json({ success: true, message: "Wylogowano" });
});

// załadowanie strony z pliku (obsługa routingu Reacta)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Test połączenia z bazą
(async () => {
  try {
    console.log("Połączono z bazą MySQL!");
  } catch (err) {
    console.error("Błąd połączenia z bazą:", err.message);
  }
})();

import React, { useEffect, useState } from "react";
import styles from "./exercises.module.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Upewnij się, że masz react-icons

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  // Stany do filtrowania
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

  // Lista kategorii zgodna z Twoim ENUM w bazie
  const categories = [
    "All",
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Arms",
    "Abs",
    "Full Body",
  ];

  const fetchExercises = async () => {
    try {
      const res = await fetch("/api/exercises", { credentials: "include" });
      if (res.status === 401) {
        navigate("/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setExercises(data);
        if (data.length > 0) setSelectedExercise(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [navigate]);

  // LOGIKA FILTROWANIA
  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = ex.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || ex.body_part === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading)
    return (
      <p style={{ padding: "2rem", color: "white" }}>
        Ładowanie bazy ćwiczeń...
      </p>
    );

  return (
    <div className={styles.exercisesPage}>
      <div className={styles.layoutContainer}>
        {/* --- LEWA KOLUMNA: Wyszukiwanie, Filtry i Lista --- */}
        <div className={styles.listColumn}>
          <h1 className={styles.headerTitle}>Baza Ćwiczeń</h1>

          {/* Sekcja Szukania i Filtrów */}
          <div className={styles.filterSection}>
            {/* Wyszukiwarka */}
            <div className={styles.searchWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Szukaj ćwiczenia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            {/* Filtry Kategorii */}
            <div className={styles.categoriesContainer}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.categoryChip} ${selectedCategory === cat ? styles.activeChip : ""}`}
                >
                  {cat === "All" ? "Wszystkie" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Lista Kafelków */}
          <div className={styles.gridContainer}>
            {filteredExercises.length > 0 ? (
              filteredExercises.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => {
                    setSelectedExercise(ex);
                    // Na mobile warto przewinąć, na desktopie nie trzeba
                    if (window.innerWidth < 900)
                      window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`${styles.exerciseCard} ${selectedExercise?.id === ex.id ? styles.activeCard : ""}`}
                >
                  <img
                    src={
                      ex.image_path
                        ? `/${ex.image_path}`
                        : "/exercises/default_exercise.png"
                    }
                    alt={ex.name}
                    className={styles.cardImage}
                    onError={(e) => {
                      e.target.src = "/exercises/default_exercise.png";
                    }}
                  />
                  <div className={styles.cardTitleOverlay}>
                    <h3>{ex.name}</h3>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noResults}>
                Nie znaleziono ćwiczeń dla tych filtrów.
              </p>
            )}
          </div>
        </div>

        {/* --- PRAWA KOLUMNA: Szczegóły (bez zmian w logice) --- */}
        <div className={styles.detailsColumn}>
          {selectedExercise ? (
            <div className={styles.detailsPanel}>
              <img
                src={
                  selectedExercise.image_path
                    ? `/${selectedExercise.image_path}`
                    : "/exercises/default_exercise.png"
                }
                alt={selectedExercise.name}
                className={styles.detailsImage}
                onError={(e) => {
                  e.target.src = "/exercises/default_exercise.png";
                }}
              />

              <div className={styles.detailsContent}>
                <div className={styles.detailsHeader}>
                  <h2>{selectedExercise.name}</h2>
                  <span className={styles.bodyPartTag}>
                    {selectedExercise.body_part}
                  </span>
                </div>

                <div className={styles.section}>
                  <h4>Opis</h4>
                  <p>{selectedExercise.description || "Brak opisu."}</p>
                </div>

                {selectedExercise.steps && (
                  <div className={styles.section}>
                    <h4>Jak wykonać?</h4>
                    <p className={styles.textWithLines}>
                      {selectedExercise.steps}
                    </p>
                  </div>
                )}

                {selectedExercise.tips && (
                  <div className={`${styles.section} ${styles.tipsSection}`}>
                    <h4>💡 Porady Eksperta</h4>
                    <p className={styles.textWithLines}>
                      {selectedExercise.tips}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Wybierz ćwiczenie z listy, aby zobaczyć szczegóły.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercises;

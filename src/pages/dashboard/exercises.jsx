import React, { useEffect, useState } from "react";
import styles from "./exercises.module.css";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaTimes } from "react-icons/fa"; // Dodano FaPlus i FaTimes

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  // Stany do filtrowania
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // --- NOWE STANY DLA MODALA ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: "",
    body_part: "Chest", // Domyślna wartość
    description: "",
    video_url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

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

  // Filtrowanie kategorii do selecta (bez "All")
  const formCategories = categories.filter((c) => c !== "All");

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
        if (data.length > 0 && !selectedExercise) setSelectedExercise(data[0]);
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

  // --- OBSŁUGA DODAWANIA ĆWICZENIA ---
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newExercise.name || !newExercise.body_part) {
      alert("Nazwa i partia mięśniowa są wymagane!");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newExercise),
      });

      if (res.ok) {
        await res.json();

        // Odśwież listę ćwiczeń
        await fetchExercises();

        // Reset formularza i zamknięcie modala
        setNewExercise({
          name: "",
          body_part: "Chest",
          description: "",
          video_url: "",
        });
        setShowAddModal(false);

        // Opcjonalnie: ustaw nowo dodane ćwiczenie jako aktywne
        // (Wymagałoby znalezienia go na liście, tutaj upraszczamy)
      } else {
        const err = await res.json();
        alert(err.error || "Błąd dodawania ćwiczenia");
      }
    } catch (error) {
      console.error("Błąd:", error);
      alert("Wystąpił błąd połączenia.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className={styles.listColumn}>
          {/* Header z przyciskiem dodawania */}
          <div className={styles.headerRow}>
            <h1 className={styles.headerTitle}>Baza Ćwiczeń</h1>
            <button
              className={styles.addButton}
              onClick={() => setShowAddModal(true)}
            >
              <FaPlus /> Dodaj
            </button>
          </div>

          <div className={styles.filterSection}>
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

          <div className={styles.gridContainer}>
            {filteredExercises.length > 0 ? (
              filteredExercises.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => {
                    setSelectedExercise(ex);
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

                {selectedExercise.video_url && (
                  <div className={styles.section}>
                    <h4>Wideo</h4>
                    <a
                      href={selectedExercise.video_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "var(--accent-color)" }}
                    >
                      Zobacz instrukcję wideo
                    </a>
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

      {/* --- MODAL DODAWANIA ĆWICZENIA --- */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Nowe Ćwiczenie</h2>
              <button
                className={styles.closeButton}
                onClick={() => setShowAddModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Nazwa ćwiczenia *</label>
                <input
                  type="text"
                  value={newExercise.name}
                  onChange={(e) =>
                    setNewExercise({ ...newExercise, name: e.target.value })
                  }
                  required
                  placeholder="np. Wyciskanie sztangi"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Partia mięśniowa *</label>
                <select
                  value={newExercise.body_part}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      body_part: e.target.value,
                    })
                  }
                >
                  {formCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Opis</label>
                <textarea
                  rows="4"
                  value={newExercise.description}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      description: e.target.value,
                    })
                  }
                  placeholder="Opisz jak wykonać ćwiczenie..."
                />
              </div>

              <div className={styles.formGroup}>
                <label>Link do wideo (opcjonalnie)</label>
                <input
                  type="text"
                  value={newExercise.video_url}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      video_url: e.target.value,
                    })
                  }
                  placeholder="https://youtube.com/..."
                />
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowAddModal(false)}
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Zapisywanie..." : "Zapisz"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;

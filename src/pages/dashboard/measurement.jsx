import React, { useEffect, useState } from "react";
import styles from "./measurement.module.css";
import { useNavigate } from "react-router-dom";
import useMeasurements from "../../hooks/useMeasurements";
import WeightChart from "./components/WeightChart";

// import { Link } from "react-router-dom";

// Fetchowanie z bazy danych z tabeli 'measurements' po zalogowaniu się
const Measurement = () => {
  const navigate = useNavigate(); // Hook do nawigacji
  const { measurements, loading, refetch } = useMeasurements();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const todayISO = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    date: todayISO,
    body_weight: "",
    body_fat_perc: "",
    chest: "",
    waist: "",
    hips: "",
    biceps: "",
    thighs: "",
  });

  const [mode, setMode] = useState("add"); // "add" | "edit"
  const [selectedId, setSelectedId] = useState("");

  const formatDate = (d) => {
    if (!d) return "";
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return String(d);
    return dt.toLocaleDateString("pl-PL");
  };

  const openAddModal = () => {
    setMode("add");
    setSelectedId("");
    setFormError("");
    setForm({
      date: todayISO,
      body_weight: "",
      body_fat_perc: "",
      chest: "",
      waist: "",
      hips: "",
      biceps: "",
      thighs: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = () => {
    setMode("edit");
    setFormError("");
    // domyślnie wybierz pierwszy pomiar (najnowszy), jeśli istnieje
    const first = measurements[0];
    if (first) {
      setSelectedId(String(first.id));
      setForm({
        date: first.date
          ? new Date(first.date).toISOString().slice(0, 10)
          : todayISO,
        body_weight: first.body_weight ?? "",
        body_fat_perc: first.body_fat_perc ?? "",
        chest: first.chest ?? "",
        waist: first.waist ?? "",
        hips: first.hips ?? "",
        biceps: first.biceps ?? "",
        thighs: first.thighs ?? "",
      });
    } else {
      setSelectedId("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectMeasurement = (e) => {
    const id = e.target.value;
    setSelectedId(id);

    const m = measurements.find((x) => String(x.id) === String(id));
    if (!m) return;

    setForm({
      date: m.date ? new Date(m.date).toISOString().slice(0, 10) : todayISO,
      body_weight: m.body_weight ?? "",
      body_fat_perc: m.body_fat_perc ?? "",
      chest: m.chest ?? "",
      waist: m.waist ?? "",
      hips: m.hips ?? "",
      biceps: m.biceps ?? "",
      thighs: m.thighs ?? "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");

    try {
      const hasAnyValue = Object.entries(form).some(
        ([k, v]) => k !== "date" && String(v).trim() !== "",
      );

      if (!form.date) {
        setFormError("Uzupełnij datę.");
        setSubmitting(false);
        return;
      }

      const selected = new Date(form.date);
      const today = new Date(todayISO);

      // wyzeruj czas, żeby porównanie było tylko po dacie
      selected.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (selected > today) {
        setFormError("Nie możesz dodać pomiaru z datą w przyszłości.");
        setSubmitting(false);
        return;
      }

      if (!hasAnyValue) {
        setFormError("Uzupełnij przynajmniej jeden pomiar.");
        setSubmitting(false);
        return;
      }

      const url =
        mode === "add"
          ? "/api/measurements"
          : `/api/measurements/${selectedId}`;
      const method = mode === "add" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg.error || `HTTP ${res.status}`);
      }

      await refetch();

      // reset formularza (opcjonalnie)
      setForm({
        date: todayISO,
        body_weight: "",
        body_fat_perc: "",
        chest: "",
        waist: "",
        hips: "",
        biceps: "",
        thighs: "",
      });

      closeModal();
    } catch (err) {
      setFormError(`Nie udało się zapisać pomiaru: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    const ok = window.confirm("Na pewno usunąć ten pomiar?");
    if (!ok) return;

    try {
      setSubmitting(true);
      setFormError("");

      const res = await fetch(`/api/measurements/${selectedId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg.error || `HTTP ${res.status}`);
      }

      await refetch();
      closeModal();
    } catch (err) {
      setFormError(`Nie udało się usunąć pomiaru: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div className={styles.measurementBackground}>
      <div className={styles.measurementContainer}>
        <div className={styles.headerContainer}>
          <h1>Moje pomiary</h1>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.addMeasurement}
              onClick={openAddModal}
            >
              Dodaj pomiar
            </button>

            <button
              type="button"
              className={styles.editMeasurement}
              onClick={openEditModal}
              disabled={!measurements.length}
              title={!measurements.length ? "Brak pomiarów do edycji" : ""}
            >
              Edytuj pomiar
            </button>
          </div>
        </div>
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Wykres masy ciała</h2>

          <WeightChart measurements={measurements} formatDate={formatDate} />
        </div>
        {!measurements.length ? (
          <p>Brak znalezionych pomiarów.</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.measurementsTable}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Waga [kg]</th>
                  <th>Procent tkanki tłuszczowej [%]</th>
                  <th>Klatka piersiowa [cm]</th>
                  <th>Talia [cm]</th>
                  <th>Biodra [cm]</th>
                  <th>Biceps [cm]</th>
                  <th>Uda [cm]</th>
                </tr>
              </thead>

              <tbody>
                {measurements.map((m) => (
                  <tr key={m.id}>
                    <td data-label="Data">
                      <span className={styles.cellValue}>
                        {formatDate(m.date)}
                      </span>
                    </td>
                    <td data-label="Weight [kg]">
                      <span className={styles.cellValue}>
                        {m.body_weight ?? ""}
                      </span>
                    </td>
                    <td data-label="Procent tkanki tłuszczowej [%]">
                      <span className={styles.cellValue}>
                        {m.body_fat_perc ?? ""}
                      </span>
                    </td>
                    <td data-label="Klatka piersiowa [cm]">
                      <span className={styles.cellValue}>{m.chest ?? ""}</span>
                    </td>
                    <td data-label="Talia [cm]">
                      <span className={styles.cellValue}>{m.waist ?? ""}</span>
                    </td>
                    <td data-label="Biodra [cm]">
                      <span className={styles.cellValue}>{m.hips ?? ""}</span>
                    </td>
                    <td data-label="Biceps [cm]">
                      <span className={styles.cellValue}>{m.biceps ?? ""}</span>
                    </td>
                    <td data-label="Uda [cm]">
                      <span className={styles.cellValue}>{m.thighs ?? ""}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h2>{mode === "add" ? "Dodaj pomiar" : "Edytuj pomiar"}</h2>
              {mode === "edit" && (
                <label>
                  Wybierz pomiar
                  <select
                    value={selectedId}
                    onChange={handleSelectMeasurement}
                    disabled={submitting}
                  >
                    {measurements.map((m) => (
                      <option key={m.id} value={m.id}>
                        {formatDate(m.date)} (ID: {m.id})
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {formError && <p className={styles.formError}>{formError}</p>}

              <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                  Data
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    max={todayISO}
                    required
                  />
                </label>

                <div className={styles.grid}>
                  <label>
                    Waga [kg]
                    <input
                      type="number"
                      step="0.1"
                      name="body_weight"
                      value={form.body_weight}
                      onChange={handleChange}
                    />
                  </label>

                  <label>
                    Tkanka tłuszczowa [%]
                    <input
                      type="number"
                      step="0.1"
                      name="body_fat_perc"
                      value={form.body_fat_perc}
                      onChange={handleChange}
                    />
                  </label>

                  <label>
                    Klatka [cm]
                    <input
                      type="number"
                      step="0.1"
                      name="chest"
                      value={form.chest}
                      onChange={handleChange}
                    />
                  </label>

                  <label>
                    Talia [cm]
                    <input
                      type="number"
                      step="0.1"
                      name="waist"
                      value={form.waist}
                      onChange={handleChange}
                    />
                  </label>

                  <label>
                    Biodra [cm]
                    <input
                      type="number"
                      step="0.1"
                      name="hips"
                      value={form.hips}
                      onChange={handleChange}
                    />
                  </label>

                  <label>
                    Biceps [cm]
                    <input
                      type="number"
                      step="0.1"
                      name="biceps"
                      value={form.biceps}
                      onChange={handleChange}
                    />
                  </label>

                  <label>
                    Uda [cm]
                    <input
                      type="number"
                      step="0.1"
                      name="thighs"
                      value={form.thighs}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className={styles.actions}>
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                  >
                    Anuluj
                  </button>

                  {mode === "edit" && (
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={handleDelete}
                      disabled={submitting || !selectedId}
                    >
                      Usuń
                    </button>
                  )}

                  <button type="submit" disabled={submitting}>
                    {submitting
                      ? "Zapisywanie..."
                      : mode === "add"
                        ? "Zapisz"
                        : "Zapisz zmiany"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Measurement;

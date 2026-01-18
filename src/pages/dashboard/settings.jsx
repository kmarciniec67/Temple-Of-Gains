import React, { useEffect, useMemo, useState } from "react";
import styles from "./settings.module.css";
import { useNavigate } from "react-router-dom";

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?]).{8,}$/;

const Settings = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const [values, setValues] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [passwordTouched, setPasswordTouched] = useState(false);

  const [usernameTaken, setUsernameTaken] = useState(false);
  const [typingTimer, setTypingTimer] = useState(null);

  const [submittingUsername, setSubmittingUsername] = useState(false);
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [exporting, setExporting] = useState(false);

  const clearMessages = () => {
    setGeneralError("");
    setSuccessMsg("");
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/user-settings", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setSettings(data);

        setValues((prev) => ({
          ...prev,
          username: data?.username ?? "",
          email: data?.email ?? "",
        }));
      } catch (err) {
        console.error("Fetch settings failed:", err);
        setGeneralError("Nie udało się wczytać ustawień.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [navigate]);

  const checkUsernameAvailability = async (username) => {
    const u = String(username || "").trim();
    if (!u || u.length < 5) {
      setUsernameTaken(false);
      return;
    }

    if (settings?.username && u === settings.username) {
      setUsernameTaken(false);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.username;
        return next;
      });
      return;
    }

    try {
      const res = await fetch("/api/check-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u }),
      });

      if (res.status === 409) {
        const data = await res.json().catch(() => ({}));
        setUsernameTaken(true);
        setErrors((prev) => ({
          ...prev,
          username: data?.error || "Nazwa użytkownika jest już zajęta.",
        }));
        return;
      }

      if (res.ok) {
        setUsernameTaken(false);
        setErrors((prev) => {
          const next = { ...prev };
          delete next.username;
          return next;
        });
      }
    } catch (err) {
      console.error("Error checking username:", err);
      setUsernameTaken(false);
    }
  };

  const validateField = (name, value, allValues) => {
    setErrors((prev) => {
      const temp = { ...prev };

      if (name === "username") {
        const v = String(value || "").trim();
        if (!v) temp.username = "Nazwa użytkownika jest wymagana.";
        else if (v.length < 5)
          temp.username = "Nazwa użytkownika musi mieć co najmniej 5 znaków.";
        else if (!/^[a-zA-Z0-9_]+$/.test(v))
          temp.username = "Dozwolone: litery, cyfry i znak _";
        else delete temp.username;
      }

      if (name === "currentPassword") {
        if (!value && (allValues.newPassword || allValues.confirmNewPassword)) {
          temp.currentPassword = "Wpisz obecne hasło.";
        } else {
          delete temp.currentPassword;
        }
      }

      if (name === "newPassword") {
        if (value && !strongPasswordRegex.test(value)) {
          temp.newPassword =
            "Hasło musi mieć min. 8 znaków, wielką literę, cyfrę i znak specjalny.";
        } else {
          delete temp.newPassword;
        }

        if (
          allValues.confirmNewPassword &&
          allValues.confirmNewPassword !== value
        ) {
          temp.confirmNewPassword = "Hasła muszą być identyczne.";
        } else if (allValues.confirmNewPassword) {
          delete temp.confirmNewPassword;
        }
      }

      if (name === "confirmNewPassword") {
        if (value && value !== allValues.newPassword) {
          temp.confirmNewPassword = "Hasła muszą być identyczne.";
        } else {
          delete temp.confirmNewPassword;
        }
      }

      return temp;
    });
  };

  const validateUsernameForm = () => {
    const temp = {};
    const u = String(values.username || "").trim();

    if (!u) temp.username = "Nazwa użytkownika jest wymagana.";
    else if (u.length < 5)
      temp.username = "Nazwa użytkownika musi mieć co najmniej 5 znaków.";
    else if (!/^[a-zA-Z0-9_]+$/.test(u))
      temp.username = "Dozwolone: litery, cyfry i znak _";

    if (usernameTaken) temp.username = "Nazwa użytkownika jest już zajęta.";

    setErrors((prev) => ({ ...prev, ...temp }));
    return Object.keys(temp).length === 0;
  };

  const validatePasswordForm = () => {
    const temp = {};
    const { currentPassword, newPassword, confirmNewPassword } = values;

    if (!currentPassword) temp.currentPassword = "Wpisz obecne hasło.";
    if (!newPassword) temp.newPassword = "Wpisz nowe hasło.";
    else if (!strongPasswordRegex.test(newPassword)) {
      temp.newPassword =
        "Hasło musi mieć min. 8 znaków, wielką literę, cyfrę i znak specjalny.";
    }

    if (!confirmNewPassword) temp.confirmNewPassword = "Potwierdź nowe hasło.";
    else if (confirmNewPassword !== newPassword)
      temp.confirmNewPassword = "Hasła muszą być identyczne.";

    setErrors((prev) => ({ ...prev, ...temp }));
    return Object.keys(temp).length === 0;
  };

  const passwordChecks = useMemo(() => {
    const p = values.newPassword || "";
    return {
      length: p.length >= 8,
      upper: /[A-Z]/.test(p),
      lower: /[a-z]/.test(p),
      digit: /\d/.test(p),
      special: /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?]/.test(p),
    };
  }, [values.newPassword]);

  const isPasswordStrong = useMemo(
    () => Object.values(passwordChecks).every(Boolean),
    [passwordChecks],
  );

  const canSubmitUsername = useMemo(() => {
    const u = String(values.username || "").trim();
    if (!settings) return false;
    if (!u || u.length < 5) return false;
    if (u === settings.username) return false;
    if (usernameTaken) return false;
    if (errors.username) return false;
    return true;
  }, [values.username, settings, usernameTaken, errors.username]);

  const canSubmitPassword = useMemo(() => {
    const { currentPassword, newPassword, confirmNewPassword } = values;
    if (!currentPassword || !newPassword || !confirmNewPassword) return false;
    if (newPassword !== confirmNewPassword) return false;
    if (!strongPasswordRegex.test(newPassword)) return false;
    if (
      errors.currentPassword ||
      errors.newPassword ||
      errors.confirmNewPassword
    )
      return false;
    return true;
  }, [
    values.currentPassword,
    values.newPassword,
    values.confirmNewPassword,
    errors.currentPassword,
    errors.newPassword,
    errors.confirmNewPassword,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    clearMessages();

    setValues((prev) => {
      const newValues = { ...prev, [name]: value };
      validateField(name, value, newValues);

      if (name === "username") {
        if (typingTimer) clearTimeout(typingTimer);
        const timer = setTimeout(() => checkUsernameAvailability(value), 500);
        setTypingTimer(timer);
      }

      return newValues;
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value, values);

    if (name === "username") checkUsernameAvailability(value);
  };

  const handleSaveUsername = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!validateUsernameForm()) {
      setGeneralError("Popraw nazwę użytkownika.");
      return;
    }

    setSubmittingUsername(true);
    try {
      const res = await fetch("/api/user/username", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: values.username.trim() }),
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setGeneralError(
          data?.error || "Nie udało się zmienić nazwy użytkownika.",
        );
        return;
      }

      const newUsername = data?.username ?? values.username.trim();
      setSettings((prev) => ({ ...prev, username: newUsername }));
      setValues((prev) => ({ ...prev, username: newUsername }));
      setUsernameTaken(false);

      setSuccessMsg("Nazwa użytkownika została zmieniona.");
    } catch (err) {
      console.error(err);
      setGeneralError("Błąd połączenia z serwerem.");
    } finally {
      setSubmittingUsername(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!validatePasswordForm()) {
      setGeneralError("Popraw pola zmiany hasła.");
      return;
    }

    setSubmittingPassword(true);
    try {
      const res = await fetch("/api/user-settings/password", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setGeneralError(data?.error || "Nie udało się zmienić hasła.");
        return;
      }

      setSuccessMsg("Hasło zostało zmienione.");
      setValues((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
      setPasswordTouched(false);

      setErrors((prev) => {
        const next = { ...prev };
        delete next.currentPassword;
        delete next.newPassword;
        delete next.confirmNewPassword;
        return next;
      });
    } catch (err) {
      console.error(err);
      setGeneralError("Błąd połączenia z serwerem.");
    } finally {
      setSubmittingPassword(false);
    }
  };

  const downloadCsv = async (url, filename) => {
    clearMessages();
    setExporting(true);
    try {
      const res = await fetch(url, { method: "GET", credentials: "include" });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        setGeneralError("Nie udało się pobrać pliku CSV.");
        return;
      }

      const blob = await res.blob();
      const href = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = href;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(href);
    } catch (err) {
      console.error(err);
      setGeneralError("Błąd pobierania CSV.");
    } finally {
      setExporting(false);
    }
  };

  if (loading) return <p>Ładowanie ustawień...</p>;
  if (!settings) return <p>Nie udało się wczytać ustawień.</p>;

  return (
    <div className={styles.settingsBackground}>
      <div className={styles.settingsContainer}>
        <h1>Ustawienia</h1>

        {generalError && <div className={styles.formError}>{generalError}</div>}
        {successMsg && <div className={styles.formSuccess}>{successMsg}</div>}

        <div className={styles.settingsForm}>
          <h2 className={styles.sectionTitle}>Profil</h2>

          <form onSubmit={handleSaveUsername} autoComplete="off">
            <div className={styles.field}>
              <label htmlFor="username">Nazwa użytkownika</label>
              <input
                id="username"
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.username ? styles.inputError : ""}
              />
              {errors.username && (
                <div className={styles.hint}>{errors.username}</div>
              )}
              {!errors.username && (
                <div className={styles.hint}>
                  Min. 5 znaków. Dozwolone: litery, cyfry, _.
                </div>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                readOnly
              />
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                disabled={!canSubmitUsername || submittingUsername}
              >
                {submittingUsername
                  ? "Zapisywanie..."
                  : "Zmień nazwę użytkownika"}
              </button>
            </div>
          </form>
        </div>

        <div className={styles.settingsForm}>
          <h2 className={styles.sectionTitle}>Zmiana hasła</h2>

          <form onSubmit={handleChangePassword} autoComplete="off">
            <div className={styles.field}>
              <label htmlFor="currentPassword">Obecne hasło</label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.currentPassword ? styles.inputError : ""}
              />
              {errors.currentPassword && (
                <div className={styles.hint}>{errors.currentPassword}</div>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="newPassword">Nowe hasło</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={() => setPasswordTouched(true)}
                className={errors.newPassword ? styles.inputError : ""}
              />
              {errors.newPassword && (
                <div className={styles.hint}>{errors.newPassword}</div>
              )}

              {passwordTouched && values.newPassword && !isPasswordStrong && (
                <ul
                  className={styles.hint}
                  style={{ margin: "6px 0 0", paddingLeft: 18 }}
                >
                  <li>{passwordChecks.length ? "✓" : "✗"} min. 8 znaków</li>
                  <li>{passwordChecks.upper ? "✓" : "✗"} wielka litera</li>
                  <li>{passwordChecks.lower ? "✓" : "✗"} mała litera</li>
                  <li>{passwordChecks.digit ? "✓" : "✗"} cyfra</li>
                  <li>{passwordChecks.special ? "✓" : "✗"} znak specjalny</li>
                </ul>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="confirmNewPassword">Powtórz nowe hasło</label>
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                value={values.confirmNewPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.confirmNewPassword ? styles.inputError : ""}
              />
              {errors.confirmNewPassword && (
                <div className={styles.hint}>{errors.confirmNewPassword}</div>
              )}
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                disabled={!canSubmitPassword || submittingPassword}
              >
                {submittingPassword ? "Zmieniam..." : "Zmień hasło"}
              </button>
            </div>
          </form>
        </div>

        <div className={styles.settingsForm}>
          <h2 className={styles.sectionTitle}>Eksport danych (CSV)</h2>

          <div className={styles.exportRow}>
            <button
              type="button"
              className={styles.exportLink}
              disabled={exporting}
              onClick={() =>
                downloadCsv("/api/export/measurements.csv", "measurements.csv")
              }
            >
              Pomiary
            </button>

            <button
              type="button"
              className={styles.exportLink}
              disabled={exporting}
              onClick={() =>
                downloadCsv("/api/export/workouts.csv", "workouts.csv")
              }
            >
              Treningi
            </button>
          </div>

          <div className={styles.hint} style={{ marginTop: 10 }}>
            Pliki pobiorą się jako CSV z Twoimi danymi.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

// src/utils/authHeaders.jsx
export function authHeaders() {
  const raw = localStorage.getItem("user");
  if (!raw) return {};

  try {
    const user = JSON.parse(raw);
    const token = user?.token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

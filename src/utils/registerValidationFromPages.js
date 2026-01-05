export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?]).{8,}$/;

export function validateEmail(email) {
  if (!email || !email.trim()) return "E-mail jest wymagany.";
  if (!emailRegex.test(email)) return "Nieprawidłowy format e-mail.";
  return null;
}

export function validateUsername(username) {
  if (!username || !username.trim()) return "Nazwa użytkownika jest wymagana.";
  if (username.length < 5) return "Nazwa użytkownika musi mieć co najmniej 5 znaków.";
  return null;
}

export function validatePassword(password) {
  if (!password) return "Hasło jest wymagane.";
  if (!strongPasswordRegex.test(password)) {
    return "Hasło musi mieć min. 8 znaków, zawierać co najmniej jedną wielką literę, jedną cyfrę i jeden znak specjalny.";
  }
  return null;
}

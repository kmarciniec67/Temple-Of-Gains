// src/__tests__/registerValidationFromPages.test.jsx - test jednostkowy walidacji formularza rejestracji /src/pages/register_page.jsx

import { describe, it, expect } from "vitest";
import { validateEmail, validateUsername, validatePassword } from "../utils/registerValidationFromPages";

describe("Rejestracja - walidacja adresu e-mail", () => {
  it("pusty = \"E-mail jest wymagany.\"", () => {
    expect(validateEmail("")).toBe("E-mail jest wymagany.");
    expect(validateEmail("   ")).toBe("E-mail jest wymagany.");
    expect(validateEmail(null)).toBe("E-mail jest wymagany.");
    expect(validateEmail(undefined)).toBe("E-mail jest wymagany.");
  });

  it("zły format = \"Nieprawidłowy format e-mail.\"", () => {
    expect(validateEmail("abc")).toBe("Nieprawidłowy format e-mail.");
    expect(validateEmail("abc@")).toBe("Nieprawidłowy format e-mail.");
    expect(validateEmail("abc@x")).toBe("Nieprawidłowy format e-mail.");
    expect(validateEmail("abc@x.")).toBe("Nieprawidłowy format e-mail.");
    expect(validateEmail("abc x@x.pl")).toBe("Nieprawidłowy format e-mail.");
  });

  it("dobry format = brak błędu (null)", () => {
    expect(validateEmail("test@example.com")).toBe(null);
    expect(validateEmail("a.b-c_d+1@sub.domain.pl")).toBe(null);
  });
});

describe("Rejestracja - walidacja username", () => {
  it("pusty = wymagany", () => {
    expect(validateUsername("")).toBe("Nazwa użytkownika jest wymagana.");
    expect(validateUsername("   ")).toBe("Nazwa użytkownika jest wymagana.");
    expect(validateUsername(null)).toBe("Nazwa użytkownika jest wymagana.");
  });

  it("< 5 znaków = nazwa musi mieć co najmniej 5 znaków", () => {
    expect(validateUsername("abcd")).toBe("Nazwa użytkownika musi mieć co najmniej 5 znaków.");
    expect(validateUsername("a")).toBe("Nazwa użytkownika musi mieć co najmniej 5 znaków.");
  });

  it("= 5 znaków = brak błędu (null)", () => {
    expect(validateUsername("abcde")).toBe(null);
  });
});

describe("Rejestracja - walidacja hasła (strongPasswordRegex)", () => {
  const msg =
    "Hasło musi mieć min. 8 znaków, zawierać co najmniej jedną wielką literę, jedną cyfrę i jeden znak specjalny.";

  it("puste = hasło jest wymagane", () => {
    expect(validatePassword("")).toBe("Hasło jest wymagane.");
    expect(validatePassword(null)).toBe("Hasło jest wymagane.");
    expect(validatePassword(undefined)).toBe("Hasło jest wymagane.");
  });

  it("brak wielkiej litery = błąd", () => {
    expect(validatePassword("abcd1234!")).toBe(msg);
  });

  it("brak cyfry = błąd", () => {
    expect(validatePassword("Abcdefg!")).toBe(msg);
  });

  it("brak znaku specjalnego = błąd", () => {
    expect(validatePassword("Abcd1234")).toBe(msg);
  });

  it("poprawne = brak błędu (null)", () => {
    expect(validatePassword("Abcd1234!")).toBe(null);
    expect(validatePassword("Strong1@Pass")).toBe(null);
  });
});

# Testowanie aplikacji Temple of Gains
Przy testowaniu skupimy się na stronie register_page.jsx.

## Wymagania projektowe dotyczące testowania:
- Testy jednostkowe
- Testy komponentów
- Testy wydajności
- Fuzz testing (fuzzing)
- Testy akceptacyjne UAT (wykorzystujące UI).

## Przebieg testów
### 1. Testy jednostkowe i testy komponentów
W naszych testach skorzystamy z vitest. Podręcznik użytkowania znajduje się na stronie: [vitest.dev](https://vitest.dev/guide/)

W katalogu projektu instalujemy zależności:
```bash
npm i -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```
W `package-json` dopisujemy:
```bash
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
```
W vite.congif.js po ustawieniach serwera:
```bash
test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    globals: true
}
```

W folderze `src` tworzymy plik setupTest.js i importujemy bibliotekę:
```bash
import '@testing-library/jest-dom';
```
Następnie tworzymy w `src` folder `tests` i pierwszy test, aby sprawdzić poprawność działania:
```bash
import { describe, it, expect } from "vitest";

describe("smoke", () => {
  it("works", () => {
    expect(1 + 1).toBe(2);
  });
});
```
Tworzymy folder `utils`, w którym będziemy wyciągać funkcje do testów. Walidacja w komponencie jest powiązana ze stanem React (useState, setErrors, timery, fetch), daltego wyciągamy ją stamtąd.

Przechodzimy do pisania własnych testów. Testy jakie zostały przeprowadzone znajdują się niżej w sekcji *"Testy użyte w naszym projekcie i ich wyniki"*.

### 2. Testy wydajności
**Rejestracja - dodawanie użytkowników do bazy danych**

Test próbuje zarejestrować 20 użytkowników w czasie 20 sekund.
Do testów wydajności utworzyć należy kopię bazy danych i dać jej inną nazwę (u nas: `temple_og_gains_k6`). W pliku `.env` należy zmienić pole `DB_NAME` na `DB_NAME=temple_of_gains_k6`.
Aby uruchomić test należy użyć komendy:
```bash
k6 run k6-register.js
```

**Rejestracja - szybkie wpisywanie nazwy użytkownika**

Inny proponowany test to test, czy przy szybkim wpisuwaniu nazwy użytkownika nie generujemy zbyt wiele requestów do bazy danych.

### 3. Fuzz testing

### 4. Testy akceptacyjne UAT (wykorzystujące UI)
Test polegał na przetestowaniu całej aplikacji przez osobę, która nie uczestniczyła w projekcie i nie zna błędów lub zachowań strony. Miała za zadanie zarejestrować się, zalogować i dodać jakieś dane. Test wykazał, że:
- console.log po zarejestrowaniu wyświetlał problem, że użytkownik nie jest zalogowany i przerzuca go do panelu logowania - błąd ten nalezy wykasować, bo tak miało być
- coś tam dalej

<hr></hr>

# Testy użyte w naszym projekcie i ich wyniki

## Jednostkowe

**Rejestracja**

- Walidacja email: 
  - pusty = "E-mail jest wymagany."
  - zły format = "Nieprawidłowy format e-mail."
  - dobry format = brak błędu

- Walidacja username
  - pusty = username wymagany
  - < 5 znaków = wymagane min. 5 znaków
  - => 5 znaków = brak błędu

- Walidacja hasła (regex strongPasswordRegex)
  - puste = wymagane
  - brak wielkiej litery = błąd
  - brak cyfry = błąd
  - brak znaku specjalnego = błąd
  - poprawne = brak błędu

![Zrzut ekranu z testów jednostkowych rejestracji](\src\assets\tests\validateRegisterTest.png "Podgląd wyników testu")

**Inna strona**
[testy innej strony]

## Komponentów (React Testing Library)

**Rejestracja** 

- Render i podstawowy układ strony. Czy strona:
  - renderuje nagłówek "REJESTRACJA"
  - renderuje pola: username, email, password, confirmPassword
  - renderuje przycisk "Zarejestruj się!"
- Walidacja formualrza:
  - Kliknięcie "Zarejestruj się!" przy pustych polach: pokazuje błędy:
    - username/email/password/confirmPassword
    - pokazuje błąd ogólny: "Aby utworzyć konto…"
- Po focus na password i wpisaniu słabego hasła:
  - pojawia się lista hintów (ul.passwordHints)
  - część pozycji ma klasę bad, a po spełnieniu warunków przechodzi na ok

![Zrzut ekranu z testów komponentów rejestracji](\src\assets\tests\componentRegisterPageTest.png "Podgląd wyników testu")

**Inna strona**
[testy innej strony]

## Testy inegracyjne:

**Rejestracja**
przepływy z `fetch("/api/check-username")` i `fetch("/api/register")`

- Dostępność nazwy użytkownika (debounce i blur)
  - Dla username < 3:
    - request do `/api/check-username` nie jest wysyłany
    - `usernameTaken` pozostaje false
  - Dla username >= 3:
    - po około 500 ms od wpisania nazwy użytkownika jest wysyłany request POST `/api/check-username`
    - gdy API zwróci `{ available: true }` to `usernameTaken false`
    - gdy `{ available: false }` to `usernameTaken true`
- Gdy walidacja przebigła pomyślnie i `/api/register` zwraca 200 + { user: {...} }:
  - zapisuje `localStorage.setItem('user', ...)`
  - następuje nawigacja do /dashboard
- Gdy `/api/register` zwraca 400 + { error: "Email zajęty" }:
  - pokazuje `errors.general` i nie nawiguje do /dashboard
- Gdy fetch rzuci wyjątek (brak połączenia):
  - pokazuje `errors.general = 'Błąd połączenia z serwerem'`

![Zrzut ekranu z testów integracyjnych rejestracji](\src\assets\tests\integrationRegisterPageTest.png "Podgląd wyników testu")

## Testy wydajności:
Wyniki testów wydajności pokazały, że ....

## Fuzzing
**Rejestracja**
- bardzo długie username/email (np. 10k znaków)
- unicode/emoji w username
- password ze znakami spoza regex (np. nowe linie, znaki łączące)
- confirmPassword puste / bardzo długie
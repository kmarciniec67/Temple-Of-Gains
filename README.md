# Temple-Of-Gains

**Temple_of_gains** to nowoczesna aplikacja webowa wspierająca użytkowników w planowaniu, rejestrowaniu i analizowaniu treningów siłowych.

---

## 🚀 Funkcje

- 📊 Dashboard z podsumowaniem treningów i wykresami postępów  
- ⚖️ Sekcja „Pomiary” — śledzenie wagi, obwodów i poziomu tkanki tłuszczowej oraz BMI
- 🏋️‍♂️ Baza ćwiczeń — pogrupowany według partii mięśniowych  
- 📅 Kreator planów treningowych — twórz własne plany lub korzystaj z gotowych  
- ⏱️ Rejestracja treningu — wybór z planu lub ręczne dodawanie ćwiczeń  
- 💪 Kalkulator Wilksa i kalkulator całkowitego dziennego zapotrzebowania kalorycznego
- 🌙 Ciemny / jasny motyw

---

## 🧰 Stack technologiczny

| Warstwa | Technologia |
| - | - |
| **front** | React, CSS, CSS Modules |
| **backend** | Express, Node.js, JWT, bcrypt, dotenv |
| **baza danych** | MySQL |
| **testy** | k6 - testy wydajności, Jest - testy jednostkowe i integracyjne, React Testing Library - testy komponentów [Szczegóły przeprowadzonych testów](testing-guide.md) |
| **jakość kodu** | ESLint - statyczna analiza kodu, Prettier - automatyczne formatowanie kodu przed commitem |

---

## ⚙️ Wymagania

Przed uruchomieniem upewnij się, że masz zainstalowane:

- [Node.js](https://nodejs.org) **(>= 18.x, zalecane LTS)** (instalacja zawiera także `npm`)
- [Git](https://git-scm.com/install/)  

W terminalu/Powershell sprawdź wersje:

``` bash
node -v
npm -v
git --version
```

Jeśli nie posiadasz Node.js i npm, skorzystaj z poniższych instrukcji:

- Windows/macOS/Linux: pobierz instalator z oficjalnej strony Node.js:
[https://nodejs.org](https://nodejs.org) (wybierz wersję LTS)

- Po instalacji zamknij i otwórz ponownie terminal, a następnie ponownie wykonaj:

```bash
node -v
npm -v
```

Jeśli nie posiadasz Git:

- pobierz instalator z oficjalnej strony: [https://git-scm.com/downloads](https://git-scm.com/downloads)

- po instalacji sprawdź:

```bash
git --version
```

---

## 💻 Instalacja i uruchomienie

### Konfiguracja środowiska

1. Sklonuj repozytorium
```bash
git clone https://github.com/kmarciniec67/Temple-Of-Gains.git
cd Temple-Of-Gains
```

2. Skonfiguruj środowisko
W katalogu głównym projetu utwórz plik .env:

``` bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=temple_of_gains # tu wpisz nazwę bazy danych (taką samą jak w panelu XAMPP)
JWT_SECRET=super_tajny_klucz # tu wpisz swój klucz
```

3. Zainstaluj zależności
W katalogu głównym projektu:

```bash
npm install

# Instalacja ikon oraz mysql'a (w przypadku braku tych zależności)
npm install react-icons
npm install mysql2
npm i recharts

# W przypadku zablokowania skryptu przez PowerShell'a
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

4. Zaimportuj bazę danych w panelu administracyjnym XAMPP.

#### Wariant A — import z pliku .sql w phpMyAdmin (najprostszy)

1. Uruchom XAMPP:

- Apache → Start
- MySQL → Start
- Otwórz phpMyAdmin: http://localhost/phpmyadmin

2. Utwórz bazę danych (jeśli nie istnieje):

- zakładka Databases
- nazwa: temple_of_gains
- kodowanie: utf8mb4_general_ci (lub utf8mb4_unicode_ci)

3. Wejdź w nowo utworzoną bazę temple_of_gains.

Import:

- zakładka Import
- wybierz plik .sql (folder mysql_backups/[najnowsza-data].sql)
- kliknij Go

4. Sprawdź, czy tabele się pojawiły (np. users, measurements, workouts, itd.).

#### Wariant B — import przez konsolę MySQL

1. Uruchom XAMPP:

- Apache → Start
- MySQL → Start

1. Kliknij Shell
2. Wpisz komendy:

``` bash
mysql -u root -p
CREATE DATABASE temple_of_gains CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
exit;
# zamiast temple_of_gains.sql, użyj bazy danych z najnowszą datą
mysql -u root -p temple_of_gains < mysql_backups/temple_of_gains.sql  
```

### Uruchamianie projektu w trybie deweloperskim 

1. Terminal 1 - frontend (Vite)

```bash
# Aby uruchomić frontend (w trybie deweloperskim)
npm run dev
```

2. Terminal 2 - backend

```bash
# Aby uruchomić backend
cd server
npm start
```

### Build i uruchomienie w trybie produkcyjnym

1. Zbuduj projekt 

W katalogu głównym:

```bash
npm run build
``` 

2. Uruchom backend - terminal 1:

``` bash
node server/server.js
```

3. Otwórz projekt w trybie produkcyjnym - terminal 2:

``` bash
npm run preview
```

---

## Dostępne skrypty

| komenda | opis |
| - | - |
| **`npm run dev`** | Uruchamia środowisko deweloperskie (Vite) |
| **`npm run build`** | Buduje produkcyjny bundle aplikacji |
| **`npm run preview`** | Podgląd zbudowamej aplikacji |
| **`npm test`** | runs unit, integration and components test |
| **`node server/server.js`, `cd server, npm start`** | uruchamia server.js |

---

## 👥 Autorzy i współpraca

Poniższa tabela przedstawia podział ról i odpowiedzialności w projekcie. Zakresy obejmują zarówno implementację (backend/frontend), jak i obszary jakości (testy), UX oraz koordynację prac. Podział ma charakter funkcjonalny — jedna osoba może pełnić kilka ról w zależności od etapu projektu.

| username | rola | zakres |
| - | - | - |
| [@comros](https://github.com/comros) | Database Master, Backend | - Stworzenie bazy danych i relacji<br>- Rozwój struktury danych<br>- Rozwój sekcji rejestracji treningu |
| [@kmarciniec67](https://github.com/kmarciniec67) | Authorization Master, Backend | - Autoryzacja JWT w Cookies<br>- Obsługa sesji użytkownika<br>- Rozwój sekcji: Baza ćwiczeń i Plany treningowe |
| [@knocek](https://github.com/knocek) | Project Manager, UI Designer, Backend, QA Specialist | - Stworzenie panelu logowania i rejestracji<br>- Rozwój Dashboardu i sekcji pomiarów z wykresami <br>- Sekcja kalkulatorów<br>- Testy + weryfikacja jakości (rejestracja, podstawowe scenariusze)<br>- Prototyp wizualny i spójność UI<br>- Nadzór nad przebiegiem projektu |

## Informacja dotycząca jakości kodu

Użyto Prettiera + Husky przed każdym commitem.
Jeśli automatycznie nie zadziała, należy postępować krok po kroku:

1. Zainstaluj zależności w katalogu głównym

```bash
npm i -D prettier husky lint-staged
npx husky init
```

2. Dodaj skrypty i konfigurację lint-sraged do package.json

```bash
{
  "scripts": {
    "prepare": "husky install",
    "format": "prettier . --write",
    "format:check": "prettier . --check"
  },
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx,json,css,scss,md,html}": "prettier --write"
  }
}
```

3. Dodaj hook pre-commit

Utwórz plik .husky/pre-commit i wklej zawartość:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

4. Dodaj `.prettierignore` w root:

```bash
node_modules
dist
build
coverage
*.min.*
package-lock.json
```

5. Test - zmień format w jakimś pliku i zrób commit.

---

## Licencja

Projekt stworzony w ramach kursu Inżynieria Oprogramowania (AGH, Informatyka Techniczna, 3 semestr). Do użytku edukacyjnego.

# Temple-Of-Gains

**Temple_of_gains** to nowoczesna aplikacja webowa wspierająca użytkowników w planowaniu, rejestrowaniu i analizowaniu treningów siłowych. 

---

## 🚀 Funkcje

- 📊 Dashboard z podsumowaniem treningów i wykresami postępów  
- ⚖️ Sekcja „Pomiary” — śledzenie wagi, obwodów i poziomu tkanki tłuszczowej  
- 🏋️‍♂️ Atlas ćwiczeń — pogrupowany według partii mięśniowych  
- 📅 Kreator planów treningowych — twórz własne plany lub korzystaj z gotowych  
- ⏱️ Rejestracja treningu — wybór z planu lub ręczne dodawanie ćwiczeń  
- 💪 Kalkulator Wilksa i analiza postępów w bojach trójbojowych  
- 🌙 Ciemny / jasny motyw (w planie)

---

## 🧰 Stack technologiczny

| Warstwa | Technologia |
|----------|--------------|
| **front** | React, CSS, CSS Modules |
| **backend** | Express, Node.js, JWT, bcrypt, dotenv |
| **baza danych** | MySQL |
| **testy** | k6 - testy wydajności, Jest - testy jednostkowe i integracyjne, React Testing Library - testy komponentów |
| **jakość kodu** | ESLint - statyczna analiza kodu, Prettier - automatyczne formatowanie kodu przed commitem

---

## ⚙️ Wymagania

Przed uruchomieniem upewnij się, że masz zainstalowane:
- [Node.js](https://nodejs.org) **(>= 18.x, zalecane LTS)** (instalacja zawiera także `npm`)
- [Git](https://git-scm.com/install/)  

W terminalu/Powershell sprawdź wersje:
```bash
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

1. Sklonuj repozytorium
```bash
git clone <>
cd Temple-Of-Gains
```
2. Zainstaluj zależności
```bash
npm install

# Instalacja ikon oraz mysql'a (w przypadku braku tych zależności)
npm install react-icons
npm install mysql2
npm i recharts

# W przypadku zablokowania skryptu przez PowerShell'a
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

3. Uruchom zbudowany projekt
```bash
# Aby uruchomić zbudowany projekt
npm run preview
``` 

4. Uruchom projekt w trybie deweloperskim
```bash
# Aby uruchomić frontend (w trybie deweloperskim)
npm run dev

# Aby uruchomić backend
node server/server.js
```

### Dostępne skrypty
| komenda | opis |
|----------|--------------|
| **`npm run dev`** | Uruchamia środowisko deweloperskie (Vite) |
| **`npm run build`** | Buduje produkcyjny bundle aplikacji |
| **`npm run preview`** | Podgląd zbudowamej aplikacji |
| **`npm test`** | runs unit, integration and components test |
| **`cd server`, `node server.js`** | uruchamia server.js |
---

## 👥 Autorzy i współpraca
| username | rola | zakres |
|----------|--------------| ----------------|
| [@comros](https://github.com/comros) | Database Master, Backend |  |
| [@kmarciniec67](https://github.com/kmarciniec67) | Authorization Master, Backend |  |
| [@knocek](https://github.com/knocek) | Project Manager, UI Designer, Backend, QA Specialist |  |


## Informacja dotycząca jakości kodu
Użyto Prettiera + Husky przed każdym commitem.
Aby działał w projekcie należy postępować krok po kroku:
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

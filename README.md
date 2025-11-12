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
| front | |

---

## ⚙️ Wymagania

Przed uruchomieniem upewnij się, że masz zainstalowane:
- [Node.js](https://nodejs.org) **(>= 18.x, zalecane LTS)** (instalacja zawiera także `npm`)
- [Git](https://git-scm.com/install/)  

W terminalu/Powershell sprawdź wersje:
```bash
node -v
npm -v
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

# W przypadku zablokowania skryptu przez PowerShell'a
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```
3. Uruchom projekt w trybie deweloperskim
```bash
# Aby uruchomić frontend (w trybie deweloperskim)
npm run dev

# Aby uruchomić backend
node server/server.js
```

### Dostępne skrypty
| komenda | opis |
|----------|--------------|
| npm run dev | Uruchamia środowisko deweloperskie (Vite) |
| npm run build | Buduje produkcyjny bundle aplikacji |
| npm run preview | Podgląd zbudowamej aplikacji |
---

## 👥 Autorzy i współpraca
| username | rola | zakres |
|----------|--------------| ----------------|
| @comros | |
| @kmarciniec67 | |
| @knocek | |

---

## Licencja

Projekt stworzony w ramach kursu Inżynieria Oprogramowania. Do użytku edukacyjnego.

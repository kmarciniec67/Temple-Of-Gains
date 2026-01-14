-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sty 14, 2026 at 06:00 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `temple_of_gains`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `exercises`
--

CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `steps` text DEFAULT NULL,
  `tips` text DEFAULT NULL,
  `body_part` enum('Chest','Back','Legs','Shoulders','Arms','Abs','Full Body') DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT 'default_exercise.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `exercises`
--

INSERT INTO `exercises` (`id`, `name`, `description`, `steps`, `tips`, `body_part`, `video_url`, `image_path`) VALUES
(1, 'Bench Press', 'Cwiczenie na klatke piersiowa z uzyciem sztangi.', '1. Połóż się na ławce płaskiej, stopy trzymaj stabilnie na podłodze.\n2. Chwyć sztangę nieco szerzej niż szerokość barków.\n3. Zdejmij sztangę ze stojaków i zablokuj ramiona nad klatką piersiową.\n4. Powoli opuść sztangę do środkowej części mostka.\n5. Wyciśnij sztangę dynamicznie do pozycji wyjściowej.', '- Nie odrywaj pośladków od ławki.\n- Trzymaj łopatki ściągnięte do siebie.\n- Prowadź łokcie pod kątem około 45-75 stopni względem tułowia, nie 90.', 'Chest', 'https://www.youtube.com/watch?v=rT7DgCr-3pg', 'exercises/bench_press.png'),
(2, 'Squat', 'Przysiad ze sztanga, angazujacy nogi i posladki.', '1. Ustaw sztangę na górnej części pleców (kapturach).\n2. Rozstaw stopy na szerokość barków, palce lekko na zewnątrz.\n3. Wypchnij biodra w tył i ugnij kolana, schodząc w dół.\n4. Zejdź tak nisko, jak pozwala Ci mobilność (najlepiej poniżej kąta prostego).\n5. Wstań dynamicznie, odpychając się całymi stopami.', '- Trzymaj plecy proste, nie garb się.\n- Kolana prowadź w kierunku palców stóp.\n- Nie odrywaj pięt od podłoża.', 'Legs', 'https://www.youtube.com/watch?v=aclHkVaku9U', 'exercises/squat.png'),
(3, 'Deadlift', 'Martwy ciag - cwiczenie na plecy i posladki.', '1. Stań przed sztangą, stopy na szerokość bioder.\n2. Złap sztangę nachwytem lub chwytem mieszanym.\n3. Obniż biodra, wyprostuj plecy i napnij brzuch.\n4. Unieś sztangę prowadząc ją blisko nóg, prostując biodra i kolana.\n5. W pełnym wyproście ściągnij łopatki, a następnie odłóż ciężar.', '- Nie rób \"kociego grzbietu\".\n- Głowa powinna być przedłużeniem kręgosłupa.\n- Ruch inicjuj z biodra, nie z samych pleców.', 'Back', 'https://www.youtube.com/watch?v=op9kVnSso6Q', 'exercises/deadlift.png'),
(4, 'Overhead Press', 'Wyciskanie nad glowe na barki.', '1. Stań w lekkim rozkroku, sztangę trzymaj na górnej części klatki.\n2. Napnij pośladki i brzuch dla stabilizacji.\n3. Wyciśnij sztangę pionowo nad głowę.\n4. W końcowej fazie lekko wychyl głowę w przód (okno między ramionami).\n5. Powoli opuść sztangę do pozycji startowej.', '- Nie odchylaj się mocno w tył.\n- Łokcie prowadź lekko przed sztangą.\n- Nie używaj nóg do wybicia (chyba że robisz Push Press).', 'Shoulders', 'https://www.youtube.com/watch?v=qEwKCR5JCog', 'exercises/overhead_press.png'),
(5, 'Pull-up', 'Podciaganie na drazku - klasyka na plecy i biceps.', '1. Złap drążek nachwytem szerzej niż barki.\n2. Zwisając, ściągnij łopatki w dół (aktywny zwis).\n3. Podciągnij się, celując klatką piersiową w drążek.\n4. Broda powinna znaleźć się nad drążkiem.\n5. Opuść się powoli do pełnego wyprostu ramion.', '- Unikaj bujania ciałem.\n- Nie przyciągaj ramion do uszu.\n- Skup się na pracy pleców, a nie tylko rąk.', 'Back', 'https://www.youtube.com/watch?v=eGo4IYlbE5g', 'exercises/pull-up.png'),
(7, 'Incline Bench Press', 'Wyciskanie sztangi na lawce skosnej dodatniej.', '1. Ustaw ławkę pod kątem 30-45 stopni.\n2. Połóż się i chwyć sztangę szerzej niż barki.\n3. Opuść sztangę do górnej części klatki piersiowej.\n4. Wyciśnij ciężar do góry, nie blokując całkowicie łokci.\n5. Wróć do pozycji wyjściowej kontrolując ruch.', '- Nie odrywaj bioder od ławki.\n- Łokcie prowadź pod kątem, nie prostopadle do ciała.\n- Skup się na górnej części klatki.', 'Chest', 'https://www.youtube.com/watch?v=SrqOu55lrYU', 'exercises/incline_bench_press.png'),
(8, 'Dumbbell Bench Press', 'Wyciskanie hantli na lawce plaskiej.', '1. Usiądź na ławce z hantlami na kolanach.\n2. Połóż się, zarzucając hantle nad klatkę.\n3. Opuszczaj hantle szeroko, aż poczujesz rozciągnięcie w klatce.\n4. Wyciśnij hantle w górę, zbliżając je do siebie.\n5. Nie zderzaj hantli w górnej fazie ruchu.', '- Nadgarstki proste, w linii z przedramieniem.\n- Stałe napięcie mięśni, bez odpoczynku na górze.\n- Stabilne stopy na ziemi.', 'Chest', 'https://www.youtube.com/watch?v=VmB1G1K7v94', 'exercises/dumbbell_bench_press.png'),
(9, 'Chest Fly Machine', 'Rozpietki na maszynie.', '1. Usiądź stabilnie, plecy dociśnięte do oparcia.\n2. Chwyć uchwyty tak, by ramiona były równolegle do podłogi.\n3. Złącz dłonie przed sobą, napinając klatkę piersiową.\n4. Przytrzymaj moment szczytowego napięcia.\n5. Wróć powoli do pozycji startowej, nie upuszczając ciężaru.', '- Nie prostuj łokci całkowicie (lekko ugięte).\n- Nie odrywaj pleców od oparcia.\n- Ruch powrotny wykonuj wolniej niż złączenie.', 'Chest', 'https://www.youtube.com/watch?v=eozdVDA78K0', 'exercises/chest_fly_machine.png'),
(10, 'Cable Fly', 'Rozpietki na bramie.', '1. Stań pośrodku bramy, chwyć linki wyciągu górnego.\n2. Pochyl tułów lekko do przodu, jedną nogę wystaw dla stabilizacji.\n3. Ściągnij linki przed siebie po łuku, napinając klatkę.\n4. Zatrzymaj ruch na sekundę, gdy dłonie są blisko siebie.\n5. Powoli rozciągnij ramiona do boku.', '- Łokcie cały czas w tej samej pozycji (lekko ugięte).\n- Nie garb się, klatka wypięta.\n- Kontroluj ciężar w drodze powrotnej.', 'Chest', 'https://www.youtube.com/watch?v=taI4XduLpTk', 'exercises/cable_fly.png'),
(11, 'Push-ups', 'Pompki klasyczne na klatke.', '1. Przyjmij pozycję podporu przodem (deski).\n2. Dłonie ustaw nieco szerzej niż barki.\n3. Opuść ciało, aż klatka znajdzie się tuż nad ziemią.\n4. Utrzymuj ciało w jednej linii (biodra nie wiszą).\n5. Wypchnij się dynamicznie w górę.', '- Nie zadzieraj głowy, patrz w podłogę.\n- Napnij brzuch i pośladki.\n- Łokcie prowadź blisko ciała (ok. 45 stopni).', 'Chest', 'https://www.youtube.com/watch?v=_l3ySVKYVJ8', 'exercises/push-ups.png'),
(13, 'Pull-up', 'Podciaganie nachwytem.', '1. Złap drążek nachwytem (kciuki skierowane do wewnątrz).\n2. Zwisając, złącz łopatki i napnij brzuch.\n3. Podciągnij ciało w górę siłą pleców.\n4. Postaraj się dotknąć drążka górną częścią klatki.\n5. Opuść się powoli do pełnego zwisu.', '- Unikaj \"szarpania\" nogami.\n- Skup się na ruchu łokci w dół.\n- Pełny zakres ruchu jest kluczowy.', 'Back', 'https://www.youtube.com/watch?v=eGo4IYlbE5g', 'exercises/pull-up.png'),
(14, 'Lat Pulldown', 'Sciaganie drazka wyciagu gornego.', '1. Usiądź i zablokuj kolana pod wałkami.\n2. Chwyć drążek szerokim nachwytem.\n3. Odchyl się minimalnie w tył i ściągnij drążek do górnej części klatki.\n4. Zatrzymaj ruch na dole, ściągając łopatki.\n5. Powoli wyprostuj ręce w górę.', '- Nie ciągnij drążka za kark.\n- Nie bujaj tułowiem, by wygenerować pęd.\n- Barki trzymaj nisko (z dala od uszu).', 'Back', 'https://www.youtube.com/watch?v=CAwf7n6Luuc', 'exercises/lat_pulldown.png'),
(15, 'Barbell Row', 'Wioslowanie sztanga.', '1. Stań w lekkim rozkroku, chwyć sztangę nachwytem.\n2. Pochyl tułów do przodu (prawie równolegle do podłogi), plecy proste.\n3. Przyciągnij sztangę do dolnej części brzucha.\n4. Ściągnij łopatki w szczytowej fazie.\n5. Opuść sztangę, kontrolując rozciągnięcie pleców.', '- Nie prostuj tułowia w trakcie ruchu.\n- Nie szarp ciężarem.\n- Głowa w linii z kręgosłupem.', 'Back', 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ', 'exercises/barbell_row.png'),
(16, 'Dumbbell Row', 'Wioslowanie hantlem.', '1. Oprzyj jedno kolano i rękę na ławce płaskiej.\n2. Drugą ręką chwyć hantel, plecy trzymaj proste.\n3. Przyciągnij hantel do biodra, prowadząc łokieć blisko ciała.\n4. W górnej fazie mocno napnij mięsień najszerszy.\n5. Opuść hantel do pełnego wyprostu ręki.', '- Nie skręcaj tułowia przy podnoszeniu.\n- Ruch powinien przypominać piłowanie drewna.\n- Skup się na pracy pleców, nie bicepsa.', 'Back', 'https://www.youtube.com/watch?v=pYcpY20QaE8', 'exercises/dumbbell_row.png'),
(17, 'Seated Cable Row', 'Wioslowanie na maszynie.', '1. Usiądź na maszynie, zaprzyj stopy o platformy.\n2. Chwyć uchwyt, wyprostuj plecy, kolana lekko ugięte.\n3. Przyciągnij uchwyt do brzucha, ściągając łopatki.\n4. Klatka piersiowa wypięta w przód.\n5. Wróć do pozycji wyjściowej, lekko rozciągając plecy.', '- Nie odchylaj się zbyt mocno w tył.\n- Nie garb się w fazie powrotnej.\n- Barki trzymaj nisko.', 'Back', 'https://www.youtube.com/watch?v=HJSVR_oaD1g', 'exercises/seated_cable_row.png'),
(18, 'Hyperextensions', 'Prostowniki grzbietu.', '1. Ustaw ławkę tak, by biodra swobodnie wystawały poza oparcie.\n2. Skrzyżuj ręce na klatce lub trzymaj przy głowie.\n3. Opuść tułów w dół, zachowując proste plecy.\n4. Unieś tułów do linii nóg (nie wyżej).\n5. Napnij pośladki i prostowniki grzbietu.', '- Unikaj przeprostów (wyginania się w tył).\n- Ruch wykonuj płynnie, bez szarpania.\n- Głowa przedłużeniem tułowia.', 'Back', 'https://www.youtube.com/watch?v=qCbxFAJuA6I', 'exercises/hyperextensions.png'),
(19, 'T-Bar Row', 'Wioslowanie T-bar.', '1. Stań nad sztangą, chwyć specjalny uchwyt lub samą sztangę.\n2. Pochyl się, utrzymując naturalną krzywiznę kręgosłupa.\n3. Przyciągnij ciężar do klatki piersiowej.\n4. Zatrzymaj na chwilę przy ciele.\n5. Opuść do wyprostu ramion.', '- Utrzymuj stabilną pozycję nóg.\n- Nie pomagaj sobie ruchem tułowia.\n- Zabezpiecz drugi koniec sztangi przed przesuwaniem.', 'Back', 'https://www.youtube.com/watch?v=GDlMirFgbhs', 'exercises/t-bar_row.png'),
(21, 'Leg Press', 'Wyciskanie nogami.', '1. Usiądź na maszynie, całe plecy i głowa oparte.\n2. Stopy ustaw na platformie na szerokość bioder.\n3. Zwolnij blokadę i powoli opuść ciężar, uginając kolana.\n4. Zatrzymaj, gdy kolana będą blisko klatki (bez odrywania lędźwi).\n5. Wypchnij ciężar, nie blokując kolan na końcu.', '- Nie odrywaj lędźwi od oparcia (groźne dla kręgosłupa!).\n- Nie prostuj nóg do \"trzasku\" w kolanach.\n- Nie spychaj kolan do środka.', 'Legs', 'https://www.youtube.com/watch?v=IZxyjW7MPJQ', 'exercises/leg_press.png'),
(22, 'Lunges', 'Wykroki.', '1. Stań prosto, hantle w dłoniach wzdłuż tułowia.\n2. Zrób duży krok w przód jedną nogą.\n3. Obniż biodra, aż tylne kolano prawie dotknie ziemi.\n4. Przednie kolano nie powinno wychodzić przed palce stopy.\n5. Wróć do pozycji startowej, odpychając się z przedniej nogi.', '- Tułów trzymaj pionowo.\n- Nie uderzaj kolanem o podłogę.\n- Patrz przed siebie dla równowagi.', 'Legs', 'https://www.youtube.com/watch?v=QOVaaWnUJ2s', 'exercises/lunges.png'),
(23, 'Romanian Deadlift', 'RDL na tyl uda.', '1. Stopy na szerokość bioder, sztanga w dłoniach.\n2. Lekko ugnij kolana (utrzymaj to zgięcie przez cały ruch).\n3. Wypychaj biodra w tył, opuszczając sztangę po nogach.\n4. Opuść do momentu odczucia mocnego rozciągania z tyłu uda.\n5. Wróć do pionu, pracując biodrami.', '- Nie garb się w odcinku lędźwiowym.\n- Sztanga musi mieć kontakt z nogami cały czas.\n- Nie zginaj mocniej kolan podczas opuszczania.', 'Legs', 'https://www.youtube.com/watch?v=JCXUYuzwNrM', 'exercises/romanian_deadlift.png'),
(24, 'Leg Curl', 'Uginanie nog na maszynie.', '1. Połóż się na maszynie, wałek ustaw nad piętami.\n2. Chwyć uchwyty dla stabilizacji.\n3. Ugnij nogi, przyciągając wałek do pośladków.\n4. Przytrzymaj napięcie w szczytowej fazie.\n5. Powoli opuść ciężar do wyprostu.', '- Nie odrywaj bioder od ławki.\n- Kontroluj fazę negatywną (opuszczanie).\n- Stopy ustaw neutralnie lub na \"flex\".', 'Legs', 'https://www.youtube.com/watch?v=1Tq3QdYUuHs', 'exercises/leg_curl.png'),
(25, 'Leg Extension', 'Prostowanie nog.', '1. Usiądź na maszynie, wałek na dolnej części piszczeli.\n2. Ustaw oparcie tak, by kolana były w osi obrotu maszyny.\n3. Wyprostuj nogi, napinając mięśnie czworogłowe.\n4. Przytrzymaj chwilę w pełnym wyproście.\n5. Powoli wróć do pozycji wyjściowej.', '- Nie kop ciężarem, rób to płynnie.\n- Trzymaj się uchwytów, by nie odrywać pośladków.\n- Nie blokuj kolan na siłę.', 'Legs', 'https://www.youtube.com/watch?v=YyvSfVjQeL0', 'exercises/leg_extension.png'),
(26, 'Calf Raise', 'Wspiecia na lydki.', '1. Stań palcami stóp na podwyższeniu/maszynie.\n2. Opuść pięty jak najniżej (rozciągnięcie).\n3. Dynamicznie wespnij się na palce jak najwyżej.\n4. Zatrzymaj na sekundę w górze.\n5. Powoli wróć do dołu.', '- Pełny zakres ruchu jest najważniejszy.\n- Nie uginaj kolan podczas ruchu.\n- Wykonuj ćwiczenie powoli i dokładnie.', 'Legs', 'https://www.youtube.com/watch?v=YMmgqO8Jo-k', 'exercises/calf_raise.png'),
(27, 'Front Squat', 'Przysiad przedni.', '1. Ułóż sztangę na przedniej części barków, łokcie wysoko.\n2. Stopy na szerokość barków.\n3. Wykonaj przysiad, trzymając tułów bardzo pionowo.\n4. Kolana mogą wyjść przed palce stóp.\n5. Wstań dynamicznie w górę.', '- Łokcie muszą być wysoko przez cały czas.\n- Jeśli sztanga spada, popraw chwyt lub mobilność nadgarstków.\n- Nie pochylaj się do przodu.', 'Legs', 'https://www.youtube.com/watch?v=UMq8o5YnG1E', 'exercises/front_squat.png'),
(28, 'Bulgarian Split Squat', 'Bulgarskie przysiady.', '1. Stań tyłem do ławki, jedną stopę oprzyj o nią grzbietem.\n2. Drugą nogę wysuń w przód.\n3. Wykonaj przysiad na nodze wykrocznej.\n4. Zejdź nisko, aż tylne kolano będzie tuż nad ziemią.\n5. Wróć do góry.', '- Większe pochylenie tułowia angażuje pośladek.\n- Pionowy tułów angażuje czwórkę.\n- Trzymaj stabilność, patrz w jeden punkt.', 'Legs', 'https://www.youtube.com/watch?v=2C-uNgKwPLE', 'exercises/bulgarian_split_squat.png'),
(30, 'Lateral Raises', 'Unoszenia bokiem.', '1. Stań w lekkim rozkroku, hantle w dłoniach.\n2. Lekko pochyl tułów w przód.\n3. Unieś hantle na boki do wysokości barków.\n4. Łokcie minimalnie ugięte, nadgarstki prosto.\n5. Powoli opuść hantle, nie dotykając ud (stałe napięcie).', '- Nie bujaj tułowiem.\n- Wyobraź sobie, że wylewasz wodę z dzbanów (mały palec wyżej).\n- Nie unoś barków do uszu.', 'Shoulders', 'https://www.youtube.com/watch?v=kDqklk1ZESo', 'exercises/lateral_raises.png'),
(31, 'Front Raises', 'Unoszenia przodem.', '1. Chwyć hantle lub talerz oburącz.\n2. Stań stabilnie, brzuch napięty.\n3. Unieś proste ramiona przed siebie do poziomu oczu.\n4. Chwilę przytrzymaj.\n5. Opuść powoli w dół.', '- Nie zarzucaj ciężaru plecami.\n- Nie unoś rąk zbyt wysoko (ponad głowę).\n- Kontroluj ruch w obu kierunkach.', 'Shoulders', 'https://www.youtube.com/watch?v=8QWbvzdf4Rk', 'exercises/front_raises.png'),
(32, 'Rear Delt Fly', 'Odwodzenie ramion na tylny bark.', '1. Pochyl tułów mocno do przodu (prawie kąt prosty).\n2. Hantle trzymaj w zwisających rękach.\n3. Unieś ramiona szeroko na boki, celując w sufit.\n4. Skup się na tylnej części barku, nie na łopatkach.\n5. Powoli opuść hantle.', '- Nie łącz łopatek (to nie jest ćwiczenie na plecy).\n- Głowa nieruchomo.\n- Ruch powinien przypominać odwrotne rozpiętki.', 'Shoulders', 'https://www.youtube.com/watch?v=ttvfGg9d76c', 'exercises/rear_delt_fly.png'),
(34, 'Machine Shoulder Press', 'Wyciskanie na barki na maszynie.', '1. Ustaw wysokość siedziska tak, by rączki były na poziomie barków.\n2. Usiądź, plecy dociśnij do oparcia.\n3. Wyciśnij uchwyty w górę.\n4. Nie blokuj łokci w pełnym wyproście.\n5. Opuść powoli do poziomu uszu.', '- Nie odrywaj lędźwi od oparcia.\n- Pamiętaj o równomiernym oddechu.\n- Ruch płynny, bez szarpania.', 'Shoulders', 'https://www.youtube.com/watch?v=4AzB8Hu-1DE', 'exercises/machine_shoulder_press.png'),
(35, 'Shrugs', 'Wzruszanie barkami.', '1. Stań prosto z ciężkimi hantlami lub sztangą w dłoniach.\n2. Ramiona luźno wzdłuż tułowia.\n3. Unieś same barki jak najwyżej w stronę uszu.\n4. Zatrzymaj na sekundę w górze.\n5. Opuść do pełnego rozciągnięcia.', '- Nie kręć barkami (ruch tylko góra-dół).\n- Nie zginaj łokci.\n- Głowa prosto, nie wysuwaj jej w przód.', 'Shoulders', 'https://www.youtube.com/watch?v=3UWi44yN-wE', 'exercises/shrugs.png'),
(36, 'Barbell Curl', 'Uginanie ramion ze sztanga.', '1. Stań prosto, chwyć sztangę podchwytem.\n2. Łokcie przyklej do tułowia.\n3. Ugnij ramiona, unosząc sztangę do klatki.\n4. Dopnij biceps w górnej fazie.\n5. Opuść powoli do prawie pełnego wyprostu.', '- Nie bujaj tułowiem (cheating tylko dla zaawansowanych).\n- Łokcie nie mogą uciekać w tył ani w przód.\n- Nadgarstki sztywne.', 'Arms', 'https://www.youtube.com/watch?v=kwG2ipFRgfo', 'exercises/barbell_curl.png'),
(37, 'Hammer Curl', 'Uginanie mlotkowe.', '1. Chwyć hantle chwytem neutralnym (kciuki w górę).\n2. Ramiona wzdłuż tułowia.\n3. Ugnij ręce naprzemiennie lub razem, nie rotując nadgarstka.\n4. Hantel prowadź w stronę barku.\n5. Opuść powoli.', '- Ćwiczenie angażuje mięsień ramienny.\n- Nie odchylaj się w tył.\n- Łokcie stabilnie w jednym miejscu.', 'Arms', 'https://www.youtube.com/watch?v=zC3nLlEvin4', 'exercises/hammer_curl.png'),
(38, 'Triceps Pushdown', 'Prostowanie ramienia na wyciagu.', '1. Stań przodem do wyciągu, chwyć drążek lub linę.\n2. Pochyl się lekko, łokcie przyklej do boków ciała.\n3. Wyprostuj ramiona w dół, napinając triceps.\n4. Na dole zrób krótki ruch na zewnątrz (przy linie).\n5. Wróć do ugięcia ok. 90 stopni.', '- Łokcie muszą być przyklejone do ciała.\n- Nie pomagaj sobie masą ciała.\n- Pełny wyprost jest kluczowy.', 'Arms', 'https://www.youtube.com/watch?v=2-LAMcpzODU', 'exercises/triceps_pushdown.png'),
(39, 'Skull Crusher', 'Wyciskanie francuskie lezac.', '1. Połóż się na ławce, sztanga w wyprostowanych rękach nad klatką.\n2. Przesuń ramiona lekko w stronę głowy (za pion).\n3. Zgnij łokcie, opuszczając sztangę do czubka głowy.\n4. Łokcie trzymaj wąsko, nie rozszerzaj ich.\n5. Wyprostuj ramiona siłą tricepsów.', '- Uważaj na głowę!\n- Ramiona (część od barku do łokcia) nieruchome.\n- Możesz robić hantlami dla mniejszego obciążenia nadgarstków.', 'Arms', 'https://www.youtube.com/watch?v=d_KZxkY_0cM', 'exercises/skull_crusher.png'),
(40, 'Preacher Curl', 'Uginanie na modlitewniku.', '1. Ustaw wysokość modlitewnika pod pachy.\n2. Oprzyj ramiona, chwyć sztangę łamaną.\n3. Ugnij ramiona do maksymalnego skurczu.\n4. Opuść powoli, ale nie do pełnego przeprostu (chroń łokcie).\n5. Cały czas dociskaj pachy do oparcia.', '- Nie odrywaj się od ławki.\n- Nie szarp ciężarem z dołu.\n- Skup się na izolacji bicepsa.', 'Arms', 'https://www.youtube.com/watch?v=fIWP-FRFNU0', 'exercises/preacher_curl.png'),
(41, 'Concentration Curl', 'Uginanie hantli siedzac.', '1. Usiądź na brzegu ławki w rozkroku.\n2. Oprzyj łokieć o wewnętrzną część uda.\n3. Ugnij ramię z hantlem, nie ruszając nogą.\n4. W szczycie dopnij biceps i lekko zrotuj nadgarstek.\n5. Opuść powoli do dołu.', '- Nie pomagaj sobie bujaniem.\n- To ćwiczenie izolowane, nie używaj dużych ciężarów.\n- Skup się na czuciu mięśniowym.', 'Arms', 'https://www.youtube.com/watch?v=8OA1f1pGfG0', 'exercises/concentration_curl.png'),
(42, 'Dips', 'Pompki na poreczach.', '1. Wskocz na poręcze, ramiona wyprostowane.\n2. Pochyl się lekko w przód (klatka) lub bądź prosto (triceps).\n3. Opuść się, uginając łokcie do kąta 90 stopni.\n4. Nie schodź zbyt nisko (stres dla barków).\n5. Wypchnij się do góry.', '- Nie garb się, łopatki ściągnięte.\n- Jeśli za łatwo - dołóż pas z ciężarem.\n- Nogi możesz ugiąć w kolanach.', 'Arms', 'https://www.youtube.com/watch?v=2z8JmcrW-As', 'exercises/dips.png'),
(43, 'Close-Grip Bench Press', 'Wyciskanie waskim chwytem.', '1. Połóż się jak do wyciskania, ale chwyć sztangę na szerokość barków.\n2. Zdejmij sztangę, łokcie prowadź blisko tułowia.\n3. Opuść sztangę do dolnej części klatki.\n4. Wyciśnij dynamicznie, skupiając się na tricepsie.\n5. Zablokuj ramiona na górze.', '- Nie chwytaj zbyt wąsko (nadgarstki!).\n- Łokcie nie mogą uciekać na boki.\n- To głównie ćwiczenie na triceps, nie klatkę.', 'Arms', 'https://www.youtube.com/watch?v=EVQOE8Dr95I', 'exercises/close-grip_bench_press.png'),
(44, 'Crunches', 'Brzuszki.', '1. Połóż się na plecach, nogi ugięte w kolanach.\n2. Dłonie przy skroniach lub na klatce (nie ciągnij głowy).\n3. Oderwij tylko łopatki od podłogi, napinając brzuch.\n4. Wypuść powietrze w momencie spięcia.\n5. Wróć, nie kładąc głowy na ziemi.', '- Nie odrywaj odcinka lędźwiowego.\n- Ruch jest krótki, to jest spięcie, a nie siad.\n- Wzrok skieruj w sufit.', 'Abs', 'https://www.youtube.com/watch?v=Xyd_fa5zoEU', 'exercises/crunches.png'),
(45, 'Hanging Leg Raises', 'Unoszenie n?g wiszac.', '1. Zwis na drążku, ciało wyprostowane.\n2. Napnij brzuch i unieś nogi (proste lub ugięte) w górę.\n3. Spróbuj podwinąć miednicę (pokazać pośladki przodem).\n4. Opuść nogi powoli, nie bujając ciałem.\n5. Zatrzymaj na dole i powtórz.', '- Unikaj huśtania.\n- Jeśli za trudno, ugnij nogi w kolanach.\n- Praca polega na podwijaniu miednicy, nie tylko zgięciu biodra.', 'Abs', 'https://www.youtube.com/watch?v=0g2_Hf3ZBG0', 'exercises/hanging_leg_raises.png'),
(46, 'Plank', 'Deska.', '1. Podpór przodem na przedramionach.\n2. Łokcie pod barkami, stopy na palcach.\n3. Napnij mocno brzuch i pośladki.\n4. Ciało tworzy linię prostą od głowy do pięt.\n5. Oddychaj spokojnie, trzymając pozycję.', '- Nie pozwól biodrom opaść (ból lędźwi).\n- Nie wypinaj pośladków w górę.\n- Głowa w linii kręgosłupa, patrz w dłonie.', 'Abs', 'https://www.youtube.com/watch?v=pSHjTRCQxIw', 'exercises/plank.png'),
(47, 'Russian Twist', 'Skrety tulowia.', '1. Usiądź na podłodze, ugnij nogi, stopy lekko nad ziemią.\n2. Odchyl tułów w tył (ok. 45 stopni), plecy proste.\n3. Trzymając dłonie razem (lub ciężarek), skręcaj tułów lewo-prawo.\n4. Dotykaj dłońmi podłogi obok bioder.\n5. Utrzymuj równowagę.', '- Nie machaj samymi rękami, skręcaj barki.\n- Jeśli za trudno, postaw pięty na ziemi.\n- Oddychaj przy każdym skręcie.', 'Abs', 'https://www.youtube.com/watch?v=wkD8rjkodUI', 'exercises/russian_twist.png'),
(49, 'Bicycle Crunches', 'Rowerki.', '1. Leżenie tyłem, ręce za głową, nogi uniesione ugięte.\n2. Przyciągaj prawy łokieć do lewego kolana, prostując prawą nogę.\n3. Zmień stronę: lewy łokieć do prawego kolana.\n4. Ruch powinien być płynny i ciągły.\n5. Lędźwia dociśnięte do maty.', '- Nie ciągnij rękami za szyję.\n- Skup się na skręcie tułowia.\n- Wolniej znaczy lepiej.', 'Abs', 'https://www.youtube.com/watch?v=9FGilxCbdz8', 'exercises/bicycle_crunches.png'),
(50, 'Mountain Climbers', 'Bieg w podporze.', '1. Przyjmij pozycję do pompki (wysoki podpór).\n2. Ciało w linii prostej, brzuch napięty.\n3. Dynamicznie przyciągnij jedno kolano do klatki.\n4. Wróć i od razu przyciągnij drugie.\n5. Wykonuj ruch naprzemiennie w szybkim tempie.', '- Nie podskakuj biodrami góra-dół.\n- Dłonie cały czas pod barkami.\n- Utrzymuj stałe tempo.', 'Abs', 'https://www.youtube.com/watch?v=nmwgirgXLYM', 'exercises/mountain_climbers.png'),
(51, 'Kettlebell Swing', 'Swing z kettlem.', '1. Stań szerzej niż biodra, kettlebell przed sobą.\n2. Cofnij biodra, chwyć odważnik, plecy proste.\n3. Zamachnij się do tyłu między nogi.\n4. Dynamicznie wyprostuj biodra, wyrzucając kettlebell przed siebie.\n5. Pozwól mu opaść swobodnie i powtórz zamach.', '- To ruch bioder, a nie przysiad.\n- Nie unoś rąk siłą barków, one są tylko \"sznurkami\".\n- W górze mocno zepnij pośladki i brzuch.', 'Full Body', 'https://www.youtube.com/watch?v=YSx0h0Mf0Eg', 'exercises/kettlebell_swing.png'),
(55, 'Farmer Walk', 'Spacer farmera.', '1. Weź ciężkie hantle lub kettle w obie dłonie.\n2. Wyprostuj się, ściągnij łopatki, napnij brzuch.\n3. Idź przed siebie małymi, szybkimi krokami.\n4. Nie pozwól ciężarowi obijać się o uda.\n5. Oddychaj płytko, utrzymując napięcie (bracing).', '- Nie garb się, klatka wypięta.\n- Głowa prosto, patrz przed siebie.\n- To świetne ćwiczenie na chwyt i stabilizację.', 'Full Body', 'https://www.youtube.com/watch?v=moH1XMGx4UA', 'exercises/farmer_walk.png');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `measurements`
--

CREATE TABLE `measurements` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `body_weight` float DEFAULT NULL,
  `body_fat_perc` float DEFAULT NULL,
  `chest` float DEFAULT NULL,
  `waist` float DEFAULT NULL,
  `hips` float DEFAULT NULL,
  `biceps` float DEFAULT NULL,
  `thighs` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `measurements`
--

INSERT INTO `measurements` (`id`, `user_id`, `date`, `body_weight`, `body_fat_perc`, `chest`, `waist`, `hips`, `biceps`, `thighs`) VALUES
(1, 1, '2025-11-01', 80.5, 12.3, 105, 83, 95, 37, 56),
(2, 2, '2025-11-02', 68.2, 18.1, 90, 76, 92, 31, 50),
(3, 3, '2025-11-03', 74, 15.4, 98, 81, 94, 34, 52);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `personalrecords`
--

CREATE TABLE `personalrecords` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lift_name` varchar(100) NOT NULL,
  `weight` float NOT NULL,
  `date` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `personalrecords`
--

INSERT INTO `personalrecords` (`id`, `user_id`, `lift_name`, `weight`, `date`) VALUES
(1, 1, 'Bench Press', 100, '2025-10-20'),
(2, 1, 'Squat', 140, '2025-10-22'),
(3, 2, 'Deadlift', 160, '2025-10-25'),
(4, 3, 'Overhead Press', 45, '2025-10-18');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `planexercises`
--

CREATE TABLE `planexercises` (
  `id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `order_index` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `planexercises`
--

INSERT INTO `planexercises` (`id`, `plan_id`, `exercise_id`, `order_index`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 3, 3),
(4, 2, 4, 1),
(5, 2, 5, 2),
(6, 3, 2, 1),
(7, 3, 5, 2),
(69, 14, 1, 1),
(70, 14, 2, 2),
(71, 14, 3, 3),
(72, 14, 4, 4),
(73, 14, 14, 5),
(74, 14, 30, 6),
(75, 15, 9, 1),
(76, 15, 10, 2),
(77, 15, 11, 3),
(78, 15, 31, 4),
(79, 15, 45, 5),
(80, 15, 50, 6),
(81, 16, 1, 1),
(82, 16, 4, 2),
(83, 16, 5, 3),
(85, 16, 28, 5),
(86, 16, 34, 6),
(87, 17, 7, 1),
(88, 17, 8, 2),
(89, 17, 9, 3),
(90, 17, 10, 4),
(91, 17, 11, 5),
(93, 18, 2, 1),
(94, 18, 13, 2),
(95, 18, 15, 3),
(96, 18, 16, 4),
(97, 18, 17, 5),
(98, 18, 18, 6),
(99, 19, 1, 1),
(100, 19, 4, 2),
(101, 19, 7, 3),
(102, 19, 8, 4),
(103, 19, 34, 5),
(104, 19, 32, 6),
(105, 20, 2, 1),
(106, 20, 13, 2),
(107, 20, 14, 3),
(108, 20, 15, 4),
(109, 20, 17, 5),
(110, 20, 19, 6),
(111, 21, 7, 1),
(112, 21, 8, 2),
(113, 21, 10, 3),
(115, 21, 21, 5),
(116, 21, 22, 6),
(117, 22, 1, 1),
(118, 22, 3, 2),
(119, 22, 4, 3),
(120, 22, 28, 4),
(122, 22, 30, 6),
(123, 23, 1, 1),
(124, 23, 7, 2),
(125, 23, 2, 3),
(126, 23, 4, 4),
(127, 23, 8, 5),
(128, 23, 13, 6),
(129, 23, 28, 7);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`) VALUES
(1, 'admin', 'admin@temple.com', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', '2025-11-11 17:36:54'),
(2, 'janek', 'janek@example.com', '0adb33d9bcae1423c3f5a7652d44062007c91cffd506681aa0f258e0888d18a3', '2025-11-11 17:36:54'),
(3, 'ania', 'ania@example.com', 'ba72941c2cef34c0d1363382e5061332a6e6023dd7947554891374aba93e6db7', '2025-11-11 17:36:54'),
(4, 'test1', 'test1@example.com', '2db22adf093fc4a5cda4e42e0f9259a26a655561c88181443541b4654ed91294', '2025-11-16 15:54:27');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `workoutdetails`
--

CREATE TABLE `workoutdetails` (
  `id` int(11) NOT NULL,
  `workout_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `set_number` int(11) NOT NULL,
  `reps` int(11) DEFAULT NULL,
  `weight` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `workoutdetails`
--

INSERT INTO `workoutdetails` (`id`, `workout_id`, `exercise_id`, `set_number`, `reps`, `weight`) VALUES
(1, 1, 1, 1, 10, 80),
(2, 1, 1, 2, 8, 85),
(3, 1, 2, 1, 10, 100),
(4, 2, 4, 1, 12, 30),
(5, 2, 5, 1, 8, NULL),
(6, 3, 2, 1, 15, 60),
(7, 3, 5, 1, 10, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `workoutplans`
--

CREATE TABLE `workoutplans` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `workoutplans`
--

INSERT INTO `workoutplans` (`id`, `user_id`, `name`, `description`, `is_default`) VALUES
(1, 1, 'Plan Silowy', 'Trening og?lnorozwojowy 3x w tygodniu.', 0),
(2, 2, 'Plan Redukcyjny', 'Plan nastawiony na spalanie tluszczu.', 0),
(3, 3, 'Plan Poczatkujacego', 'Lekki plan treningowy dla poczatkujacych.', 0),
(14, NULL, 'Full Body A', 'Trening calego ciala - wariant A', 0),
(15, NULL, 'Full Body B', 'Trening calego ciala - wariant B', 0),
(16, NULL, 'Push', 'Klatka, barki, triceps', 0),
(17, NULL, 'Pull', 'Plecy, biceps', 0),
(18, NULL, 'Legs', 'Nogi i brzuch', 0),
(19, NULL, 'Upper Body', 'Trening g?rnych partii', 0),
(20, NULL, 'Lower Body', 'Trening dolnych partii', 0),
(21, NULL, 'Back & Shoulders', 'Plecy + barki', 0),
(22, NULL, 'Chest & Arms', 'Klatka + ramiona', 0),
(23, NULL, 'Hypertrophy Split', 'Plan 5-dniowy pod rozbudowe masy', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `workouts`
--

CREATE TABLE `workouts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `workouts`
--

INSERT INTO `workouts` (`id`, `user_id`, `plan_id`, `date`) VALUES
(1, 1, 1, '2025-11-01 10:00:00'),
(2, 2, 2, '2025-11-02 11:00:00'),
(3, 3, 3, '2025-11-03 09:30:00');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `measurements`
--
ALTER TABLE `measurements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `personalrecords`
--
ALTER TABLE `personalrecords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `planexercises`
--
ALTER TABLE `planexercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pe_plan` (`plan_id`),
  ADD KEY `fk_pe_ex` (`exercise_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeksy dla tabeli `workoutdetails`
--
ALTER TABLE `workoutdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workout_id` (`workout_id`),
  ADD KEY `exercise_id` (`exercise_id`);

--
-- Indeksy dla tabeli `workoutplans`
--
ALTER TABLE `workoutplans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_wp_user` (`user_id`);

--
-- Indeksy dla tabeli `workouts`
--
ALTER TABLE `workouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `plan_id` (`plan_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `measurements`
--
ALTER TABLE `measurements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `personalrecords`
--
ALTER TABLE `personalrecords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `planexercises`
--
ALTER TABLE `planexercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `workoutdetails`
--
ALTER TABLE `workoutdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `workoutplans`
--
ALTER TABLE `workoutplans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `workouts`
--
ALTER TABLE `workouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `measurements`
--
ALTER TABLE `measurements`
    ADD CONSTRAINT `measurements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `personalrecords`
--
ALTER TABLE `personalrecords`
    ADD CONSTRAINT `personalrecords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `planexercises`
--
ALTER TABLE `planexercises`
    ADD CONSTRAINT `planexercises_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `workoutplans` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `planexercises_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workoutdetails`
--
ALTER TABLE `workoutdetails`
    ADD CONSTRAINT `workoutdetails_ibfk_1` FOREIGN KEY (`workout_id`) REFERENCES `workouts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `workoutdetails_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workoutplans`
--
ALTER TABLE `workoutplans`
    ADD CONSTRAINT `fk_wp_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `workoutplans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workouts`
--
ALTER TABLE `workouts`
    ADD CONSTRAINT `workouts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `workouts_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `workoutplans` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

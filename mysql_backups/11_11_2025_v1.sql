-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2025 at 05:38 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edziennik`
--
CREATE DATABASE IF NOT EXISTS `edziennik` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `edziennik`;

-- --------------------------------------------------------

--
-- Table structure for table `bazaocen`
--

CREATE TABLE `bazaocen` (
  `Id` int(11) NOT NULL,
  `IdUcznia` int(11) DEFAULT NULL,
  `IdNauczyciela` int(11) DEFAULT NULL,
  `IdPrzedmiotu` int(11) DEFAULT NULL,
  `Ocena` int(11) DEFAULT NULL,
  `DataWystawienia` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bazaocen`
--

INSERT INTO `bazaocen` (`Id`, `IdUcznia`, `IdNauczyciela`, `IdPrzedmiotu`, `Ocena`, `DataWystawienia`) VALUES
(1, 1, 2, 3, 5, '2016-11-03'),
(2, 1, 2, 3, 5, '2023-05-24');

--
-- Triggers `bazaocen`
--
DELIMITER $$
CREATE TRIGGER `nowa_data` BEFORE INSERT ON `bazaocen` FOR EACH ROW SET new.datawystawienia=curdate()
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `klasa`
--

CREATE TABLE `klasa` (
  `IdKlasy` int(11) NOT NULL,
  `Nazwa` varchar(6) DEFAULT NULL,
  `RokSzkolny` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `klasa`
--

INSERT INTO `klasa` (`IdKlasy`, `Nazwa`, `RokSzkolny`) VALUES
(1, 'IIa', '2015'),
(2, 'IVb', '2013'),
(3, 'IIIa', '2014');

-- --------------------------------------------------------

--
-- Table structure for table `nauczyciel`
--

CREATE TABLE `nauczyciel` (
  `IdNauczyciela` int(11) NOT NULL,
  `Nazwisko` varchar(50) DEFAULT NULL,
  `Imie` varchar(50) DEFAULT NULL,
  `DataUrodzenia` date DEFAULT NULL,
  `Tytul` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nauczyciel`
--

INSERT INTO `nauczyciel` (`IdNauczyciela`, `Nazwisko`, `Imie`, `DataUrodzenia`, `Tytul`) VALUES
(1, 'Nowak', 'Honorata', '1986-01-02', 'kontraktowy'),
(2, 'Kukla', 'Eugeniusz', '1965-06-12', 'dyplomowany');

-- --------------------------------------------------------

--
-- Table structure for table `ocena`
--

CREATE TABLE `ocena` (
  `IdOceny` int(11) NOT NULL,
  `Nazwa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ocena`
--

INSERT INTO `ocena` (`IdOceny`, `Nazwa`) VALUES
(1, 0),
(2, 0),
(3, 0),
(4, 0),
(5, 0),
(6, 0);

-- --------------------------------------------------------

--
-- Table structure for table `przedmiot`
--

CREATE TABLE `przedmiot` (
  `IdPrzedmiotu` int(11) NOT NULL,
  `Nazwa` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `przedmiot`
--

INSERT INTO `przedmiot` (`IdPrzedmiotu`, `Nazwa`) VALUES
(1, 'matematyka'),
(2, 'informatyka'),
(3, 'jezyk polski'),
(4, 'w-f'),
(5, 'chemia'),
(6, 'jezyk angielski');

-- --------------------------------------------------------

--
-- Table structure for table `uczen`
--

CREATE TABLE `uczen` (
  `IdUcznia` int(11) NOT NULL,
  `Nazwisko` varchar(50) NOT NULL,
  `Imie` varchar(50) NOT NULL,
  `DataUrodzenia` date NOT NULL,
  `Pesel` varchar(11) DEFAULT NULL,
  `IdKlasy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `uczen`
--

INSERT INTO `uczen` (`IdUcznia`, `Nazwisko`, `Imie`, `DataUrodzenia`, `Pesel`, `IdKlasy`) VALUES
(1, 'Nowak', 'Kamil', '1998-01-02', '98010223561', 3),
(2, 'Kwiecian', 'Anna', '1997-06-12', '97061223561', 2),
(3, 'Blady', 'Mateusz', '1999-11-02', '99110223561', 1),
(4, 'BEN', '', '0000-00-00', NULL, NULL),
(5, 'BEEN', '', '0000-00-00', NULL, NULL);

--
-- Triggers `uczen`
--
DELIMITER $$
CREATE TRIGGER `duze` BEFORE INSERT ON `uczen` FOR EACH ROW SET new.nazwisko=UPPER(new.nazwisko)
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bazaocen`
--
ALTER TABLE `bazaocen`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Ocena` (`Ocena`),
  ADD KEY `IdUcznia` (`IdUcznia`),
  ADD KEY `IdNauczyciela` (`IdNauczyciela`),
  ADD KEY `IdPrzedmiotu` (`IdPrzedmiotu`);

--
-- Indexes for table `klasa`
--
ALTER TABLE `klasa`
  ADD PRIMARY KEY (`IdKlasy`);

--
-- Indexes for table `nauczyciel`
--
ALTER TABLE `nauczyciel`
  ADD PRIMARY KEY (`IdNauczyciela`);

--
-- Indexes for table `ocena`
--
ALTER TABLE `ocena`
  ADD PRIMARY KEY (`IdOceny`);

--
-- Indexes for table `przedmiot`
--
ALTER TABLE `przedmiot`
  ADD PRIMARY KEY (`IdPrzedmiotu`);

--
-- Indexes for table `uczen`
--
ALTER TABLE `uczen`
  ADD PRIMARY KEY (`IdUcznia`),
  ADD KEY `IdKlasy` (`IdKlasy`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bazaocen`
--
ALTER TABLE `bazaocen`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `klasa`
--
ALTER TABLE `klasa`
  MODIFY `IdKlasy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `nauczyciel`
--
ALTER TABLE `nauczyciel`
  MODIFY `IdNauczyciela` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ocena`
--
ALTER TABLE `ocena`
  MODIFY `IdOceny` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `przedmiot`
--
ALTER TABLE `przedmiot`
  MODIFY `IdPrzedmiotu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `uczen`
--
ALTER TABLE `uczen`
  MODIFY `IdUcznia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bazaocen`
--
ALTER TABLE `bazaocen`
  ADD CONSTRAINT `bazaocen_ibfk_1` FOREIGN KEY (`Ocena`) REFERENCES `ocena` (`IdOceny`),
  ADD CONSTRAINT `bazaocen_ibfk_2` FOREIGN KEY (`IdUcznia`) REFERENCES `uczen` (`IdUcznia`),
  ADD CONSTRAINT `bazaocen_ibfk_3` FOREIGN KEY (`IdNauczyciela`) REFERENCES `nauczyciel` (`IdNauczyciela`),
  ADD CONSTRAINT `bazaocen_ibfk_4` FOREIGN KEY (`IdPrzedmiotu`) REFERENCES `przedmiot` (`IdPrzedmiotu`);

--
-- Constraints for table `uczen`
--
ALTER TABLE `uczen`
  ADD CONSTRAINT `uczen_ibfk_1` FOREIGN KEY (`IdKlasy`) REFERENCES `klasa` (`IdKlasy`);
--
-- Database: `egzamin6`
--
CREATE DATABASE IF NOT EXISTS `egzamin6` DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci;
USE `egzamin6`;

-- --------------------------------------------------------

--
-- Table structure for table `zadania`
--

CREATE TABLE `zadania` (
  `id` int(10) UNSIGNED NOT NULL,
  `dataZadania` date DEFAULT NULL,
  `wpis` text DEFAULT NULL,
  `miesiac` text DEFAULT NULL,
  `rok` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zadania`
--

INSERT INTO `zadania` (`id`, `dataZadania`, `wpis`, `miesiac`, `rok`) VALUES
(1, '2020-07-01', 'Projekt z programowania', 'lipiec', 2020),
(2, '2020-07-02', 'Projekt z programowania', 'lipiec', 2020),
(3, '2020-07-03', '', 'lipiec', 2020),
(4, '2020-07-04', '', 'lipiec', 2020),
(5, '2020-07-05', '', 'lipiec', 2020),
(6, '2020-07-06', '', 'lipiec', 2020),
(7, '2020-07-07', 'Weterynarz - Brutus', 'lipiec', 2020),
(8, '2020-07-08', '', 'lipiec', 2020),
(9, '2020-07-09', '', 'lipiec', 2020),
(10, '2020-07-10', 'Szczepienie', 'lipiec', 2020),
(11, '2020-07-11', '', 'lipiec', 2020),
(12, '2020-07-12', '', 'lipiec', 2020),
(13, '2020-07-13', 'bba', 'lipiec', 2020),
(14, '2020-07-14', '', 'lipiec', 2020),
(15, '2020-07-15', '', 'lipiec', 2020),
(16, '2020-07-16', '', 'lipiec', 2020),
(17, '2020-07-17', '', 'lipiec', 2020),
(18, '2020-07-18', 'Wyjazd na wakacje!', 'lipiec', 2020),
(19, '2020-07-19', 'Mielno', 'lipiec', 2020),
(20, '2020-07-20', 'Mielno', 'lipiec', 2020),
(21, '2020-07-21', 'Mielno', 'lipiec', 2020),
(22, '2020-07-22', 'Mielno', 'lipiec', 2020),
(23, '2020-07-23', 'Mielno', 'lipiec', 2020),
(24, '2020-07-24', 'Mielno', 'lipiec', 2020),
(25, '2020-07-25', '', 'lipiec', 2020),
(26, '2020-07-26', '', 'lipiec', 2020),
(27, '2020-07-27', '', 'lipiec', 2020),
(28, '2020-07-28', '', 'lipiec', 2020),
(29, '2020-07-29', 'Weterynarz - Brutus', 'lipiec', 2020),
(30, '2020-07-30', 'Warszawa', 'lipiec', 2020),
(31, '2020-07-31', 'Warszawa', 'lipiec', 2020),
(32, '2020-08-01', 'Remont', 'sierpien', 2020),
(33, '2020-08-02', 'Remont', 'sierpien', 2020),
(34, '2020-08-03', 'Remont', 'sierpien', 2020),
(35, '2020-08-04', 'Remont', 'sierpien', 2020),
(36, '2020-08-05', '', 'sierpien', 2020),
(37, '2020-08-06', '', 'sierpien', 2020),
(38, '2020-08-07', 'Rower', 'sierpien', 2020),
(39, '2020-08-08', 'Rower', 'sierpien', 2020),
(40, '2020-08-09', '', 'sierpien', 2020),
(41, '2020-08-10', '', 'sierpien', 2020),
(42, '2020-08-11', 'Weterynarz - Dika', 'sierpien', 2020),
(43, '2020-08-12', '', 'sierpien', 2020),
(44, '2020-08-13', 'Sopot', 'sierpien', 2020),
(45, '2020-08-14', 'Sopot', 'sierpien', 2020),
(46, '2020-08-15', '', 'sierpien', 2020),
(47, '2020-08-16', '', 'sierpien', 2020),
(48, '2020-08-17', 'Wyjazd na wakacje!', 'sierpien', 2020),
(49, '2020-08-18', 'Tatry', 'sierpien', 2020),
(50, '2020-08-19', 'Tatry', 'sierpien', 2020),
(51, '2020-08-20', 'Tatry', 'sierpien', 2020),
(52, '2020-08-21', 'Tatry', 'sierpien', 2020),
(53, '2020-08-22', 'Tatry', 'sierpien', 2020),
(54, '2020-08-23', 'Tatry', 'sierpien', 2020),
(55, '2020-08-24', 'Tatry', 'sierpien', 2020),
(56, '2020-08-25', '', 'sierpien', 2020),
(57, '2020-08-26', '', 'sierpien', 2020),
(58, '2020-08-27', 'abbab', 'sierpien', 2020),
(59, '2020-08-28', '', 'sierpien', 2020),
(60, '2020-08-29', 'Weterynarz - Dika', 'sierpien', 2020),
(61, '2020-08-30', '', 'sierpien', 2020),
(62, '2020-08-31', '', 'sierpien', 2020),
(63, '2020-11-01', NULL, 'listopad', 2020);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `zadania`
--
ALTER TABLE `zadania`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `zadania`
--
ALTER TABLE `zadania`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- Database: `fitness_app`
--
CREATE DATABASE IF NOT EXISTS `fitness_app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `fitness_app`;

-- --------------------------------------------------------

--
-- Table structure for table `exercises`
--

CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `body_part` varchar(100) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `measurements`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personalrecords`
--

CREATE TABLE `personalrecords` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lift_name` varchar(100) NOT NULL,
  `weight` float NOT NULL,
  `date` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `planexercises`
--

CREATE TABLE `planexercises` (
  `id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `order_index` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workoutdetails`
--

CREATE TABLE `workoutdetails` (
  `id` int(11) NOT NULL,
  `workout_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `set_number` int(11) NOT NULL,
  `reps` int(11) DEFAULT NULL,
  `weight` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workoutplans`
--

CREATE TABLE `workoutplans` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workouts`
--

CREATE TABLE `workouts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `measurements`
--
ALTER TABLE `measurements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `personalrecords`
--
ALTER TABLE `personalrecords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `planexercises`
--
ALTER TABLE `planexercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plan_id` (`plan_id`),
  ADD KEY `exercise_id` (`exercise_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `workoutdetails`
--
ALTER TABLE `workoutdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workout_id` (`workout_id`),
  ADD KEY `exercise_id` (`exercise_id`);

--
-- Indexes for table `workoutplans`
--
ALTER TABLE `workoutplans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `workouts`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `measurements`
--
ALTER TABLE `measurements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personalrecords`
--
ALTER TABLE `personalrecords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `planexercises`
--
ALTER TABLE `planexercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workoutdetails`
--
ALTER TABLE `workoutdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workoutplans`
--
ALTER TABLE `workoutplans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workouts`
--
ALTER TABLE `workouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `workoutplans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workouts`
--
ALTER TABLE `workouts`
  ADD CONSTRAINT `workouts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `workouts_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `workoutplans` (`id`) ON DELETE SET NULL;
--
-- Database: `game`
--
CREATE DATABASE IF NOT EXISTS `game` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `game`;
--
-- Database: `hotel`
--
CREATE DATABASE IF NOT EXISTS `hotel` DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci;
USE `hotel`;
--
-- Database: `kino`
--
CREATE DATABASE IF NOT EXISTS `kino` DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci;
USE `kino`;

-- --------------------------------------------------------

--
-- Table structure for table `aktor`
--

CREATE TABLE `aktor` (
  `Id_Aktora` int(11) NOT NULL,
  `Imie` varchar(15) COLLATE utf8_polish_ci NOT NULL,
  `Nazwisko` varchar(35) COLLATE utf8_polish_ci DEFAULT NULL,
  `Wiek` int(10) UNSIGNED DEFAULT 18
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `aktor`
--

INSERT INTO `aktor` (`Id_Aktora`, `Imie`, `Nazwisko`, `Wiek`) VALUES
(1, 'Liam', 'Neeson', 69),
(2, 'Christian', 'Bale', 47);

-- --------------------------------------------------------

--
-- Table structure for table `film`
--

CREATE TABLE `film` (
  `Id_Filmu` int(11) NOT NULL,
  `Aktor` int(11) NOT NULL,
  `Rezyser` int(11) DEFAULT NULL,
  `Tytul_Filmu` varchar(30) COLLATE utf8_polish_ci DEFAULT NULL,
  `Data_Premiery` datetime DEFAULT NULL,
  `Czas_trwania` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `film`
--

INSERT INTO `film` (`Id_Filmu`, `Aktor`, `Rezyser`, `Tytul_Filmu`, `Data_Premiery`, `Czas_trwania`) VALUES
(1, 1, NULL, NULL, '1993-11-30 00:00:00', 1.97),
(2, 2, 3, NULL, '2008-07-18 00:00:00', 1.52);

-- --------------------------------------------------------

--
-- Table structure for table `rezyser`
--

CREATE TABLE `rezyser` (
  `Id_Rezysera` int(11) NOT NULL,
  `Imie` varchar(15) COLLATE utf8_polish_ci NOT NULL,
  `Nazwisko` varchar(25) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `rezyser`
--

INSERT INTO `rezyser` (`Id_Rezysera`, `Imie`, `Nazwisko`) VALUES
(2, 'imie1', 'nazwisko1'),
(3, 'imie2', 'nazwisko2'),
(4, 'imie3', 'nazwisko3'),
(5, 'imie4', 'nazwisko4'),
(6, 'imie5', 'nazwisko5');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aktor`
--
ALTER TABLE `aktor`
  ADD PRIMARY KEY (`Id_Aktora`);

--
-- Indexes for table `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`Id_Filmu`),
  ADD KEY `fk_aktor1` (`Aktor`),
  ADD KEY `Rezyser` (`Rezyser`);

--
-- Indexes for table `rezyser`
--
ALTER TABLE `rezyser`
  ADD PRIMARY KEY (`Id_Rezysera`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aktor`
--
ALTER TABLE `aktor`
  MODIFY `Id_Aktora` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rezyser`
--
ALTER TABLE `rezyser`
  MODIFY `Id_Rezysera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `film`
--
ALTER TABLE `film`
  ADD CONSTRAINT `film_ibfk_1` FOREIGN KEY (`Aktor`) REFERENCES `aktor` (`Id_Aktora`) ON UPDATE CASCADE,
  ADD CONSTRAINT `film_ibfk_2` FOREIGN KEY (`Rezyser`) REFERENCES `rezyser` (`Id_Rezysera`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_aktor1` FOREIGN KEY (`Aktor`) REFERENCES `aktor` (`Id_Aktora`) ON UPDATE CASCADE;
--
-- Database: `kino_mysqli`
--
CREATE DATABASE IF NOT EXISTS `kino_mysqli` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `kino_mysqli`;

-- --------------------------------------------------------

--
-- Table structure for table `filmy`
--

CREATE TABLE `filmy` (
  `id_filmu` int(11) NOT NULL,
  `tytul` varchar(30) DEFAULT NULL,
  `rezyser` varchar(30) DEFAULT NULL,
  `rok_produkcji` year(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `filmy`
--

INSERT INTO `filmy` (`id_filmu`, `tytul`, `rezyser`, `rok_produkcji`) VALUES
(1, 'Interstellar', 'Christopher Nolan', 2014),
(2, 'Joker', 'Todd Phillips', 2019),
(3, 'John Wick 4', 'Chad Stahelski', 2023),
(4, 'Star Wars', 'Disney', 1980);

-- --------------------------------------------------------

--
-- Table structure for table `seanse`
--

CREATE TABLE `seanse` (
  `id_seansu` int(11) NOT NULL,
  `godzina_seansu` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seanse`
--

INSERT INTO `seanse` (`id_seansu`, `godzina_seansu`) VALUES
(1, '10:00:00'),
(2, '18:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `filmy`
--
ALTER TABLE `filmy`
  ADD PRIMARY KEY (`id_filmu`);

--
-- Indexes for table `seanse`
--
ALTER TABLE `seanse`
  ADD PRIMARY KEY (`id_seansu`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `filmy`
--
ALTER TABLE `filmy`
  MODIFY `id_filmu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `seanse`
--
ALTER TABLE `seanse`
  MODIFY `id_seansu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Database: `ksiegarnia_internetowa`
--
CREATE DATABASE IF NOT EXISTS `ksiegarnia_internetowa` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ksiegarnia_internetowa`;

-- --------------------------------------------------------

--
-- Table structure for table `autor`
--

CREATE TABLE `autor` (
  `id_autora` int(11) NOT NULL,
  `nazwisko` varchar(50) NOT NULL,
  `imie` varchar(30) NOT NULL,
  `narodowosc` varchar(30) DEFAULT NULL,
  `okres_twozenia` varchar(35) DEFAULT NULL,
  `jezyk` varchar(30) DEFAULT NULL,
  `osiagniecia` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `autor`
--

INSERT INTO `autor` (`id_autora`, `nazwisko`, `imie`, `narodowosc`, `okres_twozenia`, `jezyk`, `osiagniecia`) VALUES
(1, 'Mickiewicz', 'Adam', 'polak', '1839-1840', 'polski', 'szczegulne'),
(2, 'G?owacki', 'Aleksander', 'polak', 'nowalistyczna', 'polski', 'Lalka'),
(3, 'wyspia?ski', 'Stanis?aw', 'polak', 'M?oda Polska', 'polski', 'Wesele');

-- --------------------------------------------------------

--
-- Table structure for table `faktura`
--

CREATE TABLE `faktura` (
  `nr_faktury` int(11) NOT NULL,
  `sposob_platnosci` varchar(35) DEFAULT NULL,
  `data_wystawienia_faktury` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faktura`
--

INSERT INTO `faktura` (`nr_faktury`, `sposob_platnosci`, `data_wystawienia_faktury`) VALUES
(1, 'gotówka', '0000-00-00'),
(2, 'gotówka', '2018-12-12'),
(3, 'karta', '0000-00-00'),
(4, 'karta', '0000-00-00'),
(5, 'gotówka', '0000-00-00'),
(6, 'gotówka', '2018-12-02'),
(7, 'czek', '2018-06-04');

-- --------------------------------------------------------

--
-- Table structure for table `klient`
--

CREATE TABLE `klient` (
  `id_klienta` int(11) NOT NULL,
  `nazwisko` varchar(60) NOT NULL,
  `imie` varchar(40) NOT NULL,
  `kod_pocztowy` varchar(6) DEFAULT NULL,
  `miejscowosc` varchar(50) DEFAULT 'Warszawa',
  `ulica` varchar(50) DEFAULT NULL,
  `nr_domu` varchar(7) DEFAULT NULL,
  `PESEL` varchar(11) NOT NULL,
  `telefon` varchar(12) DEFAULT NULL,
  `adres_e_mail` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `klient`
--

INSERT INTO `klient` (`id_klienta`, `nazwisko`, `imie`, `kod_pocztowy`, `miejscowosc`, `ulica`, `nr_domu`, `PESEL`, `telefon`, `adres_e_mail`) VALUES
(1, 'Nowak', 'Jna', '33-201', 'D?browa', 'S?oneczna', '12', '00889765432', '435634734', 'mail@wp.pl'),
(2, 'Jan', 'Zdzis?aw', '33-100', 'Tarnów', 'Wi?niowa', '125', '00844456432', '234543345', 'maille@wp.pl'),
(3, 'Nosacz', 'Janusz', '00-550', 'Wroc?aw', 'Ogrodowa', '5', '43844456432', '987654321', 'mailik@wp.pl'),
(4, 'Kowalski', 'Jan', '22-067', 'Tarnów', 'Sloneczna', '3', '833356432', '515076055', 'maillek@wp.pl'),
(5, 'nazwisko1', 'imie1', NULL, 'Warszawa', NULL, NULL, '12345123451', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ksiazki`
--

CREATE TABLE `ksiazki` (
  `id_ksiazki` int(11) NOT NULL,
  `tytul` varchar(100) NOT NULL,
  `cena` float DEFAULT NULL,
  `wydawnoctwo` varchar(20) DEFAULT NULL,
  `temat` varchar(30) DEFAULT NULL,
  `miejsce_wydania` varchar(28) DEFAULT NULL,
  `jezyk_ksiazki` varchar(15) DEFAULT NULL,
  `opis` varchar(100) DEFAULT NULL,
  `rok_wydania` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ksiazki`
--

INSERT INTO `ksiazki` (`id_ksiazki`, `tytul`, `cena`, `wydawnoctwo`, `temat`, `miejsce_wydania`, `jezyk_ksiazki`, `opis`, `rok_wydania`) VALUES
(1, 'Wesele', 90, 'Greg', 'wesele', 'warszawa', 'polski', 'ksi?zka', '1930'),
(2, 'Katarynka', 16, 'Greg', 'katarynka', 'warszawa', 'polski', 'Krótka ksi?zka', '1980'),
(3, 'Pan Padeusz', 160, 'Greg', 'opis', 'warszawa', 'polski', 'D?uga ksi?zka', '1900');

-- --------------------------------------------------------

--
-- Table structure for table `rejstracja_zamowienia`
--

CREATE TABLE `rejstracja_zamowienia` (
  `id_zamowienia` int(11) DEFAULT NULL,
  `id_ksiazki` int(11) DEFAULT NULL,
  `liczba_egz` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rejstracja_zamowienia`
--

INSERT INTO `rejstracja_zamowienia` (`id_zamowienia`, `id_ksiazki`, `liczba_egz`) VALUES
(1, 2, 3),
(2, 3, 1),
(3, 1, 2),
(4, 1, 1),
(5, 1, 50);

-- --------------------------------------------------------

--
-- Table structure for table `zamowienia`
--

CREATE TABLE `zamowienia` (
  `id_zamowienia` int(11) NOT NULL,
  `data_zlozenia_zamowienia` datetime DEFAULT NULL,
  `data_wyslania` datetime DEFAULT NULL,
  `koszt_wysylki` float DEFAULT NULL,
  `id_klienta` int(11) NOT NULL,
  `id_faktury` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zamowienia`
--

INSERT INTO `zamowienia` (`id_zamowienia`, `data_zlozenia_zamowienia`, `data_wyslania`, `koszt_wysylki`, `id_klienta`, `id_faktury`) VALUES
(1, '2018-03-04 00:00:00', '2018-03-04 00:00:00', 23, 1, 1),
(2, '2018-05-04 00:00:00', '2018-05-07 00:00:00', 23, 2, 2),
(3, '2018-12-24 00:00:00', '2018-12-30 00:00:00', 23, 3, 3),
(4, '2023-02-28 21:25:11', '2023-02-28 21:25:11', 50, 1, 3),
(5, '2023-03-07 19:18:17', '2023-03-07 19:19:07', 29, 4, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`id_autora`);

--
-- Indexes for table `faktura`
--
ALTER TABLE `faktura`
  ADD PRIMARY KEY (`nr_faktury`);

--
-- Indexes for table `klient`
--
ALTER TABLE `klient`
  ADD PRIMARY KEY (`id_klienta`),
  ADD UNIQUE KEY `telefon` (`telefon`);

--
-- Indexes for table `ksiazki`
--
ALTER TABLE `ksiazki`
  ADD PRIMARY KEY (`id_ksiazki`);

--
-- Indexes for table `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD PRIMARY KEY (`id_zamowienia`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `autor`
--
ALTER TABLE `autor`
  MODIFY `id_autora` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `faktura`
--
ALTER TABLE `faktura`
  MODIFY `nr_faktury` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `klient`
--
ALTER TABLE `klient`
  MODIFY `id_klienta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ksiazki`
--
ALTER TABLE `ksiazki`
  MODIFY `id_ksiazki` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `zamowienia`
--
ALTER TABLE `zamowienia`
  MODIFY `id_zamowienia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Database: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Table structure for table `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `user` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `query` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Table structure for table `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_type` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_length` text COLLATE utf8_bin DEFAULT NULL,
  `col_collation` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) COLLATE utf8_bin DEFAULT '',
  `col_default` text COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Table structure for table `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `column_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `input_transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `settings_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

--
-- Dumping data for table `pma__designer_settings`
--

INSERT INTO `pma__designer_settings` (`username`, `settings_data`) VALUES
('root', '{\"relation_lines\":\"true\",\"angular_direct\":\"direct\",\"snap_to_grid\":\"off\"}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `export_type` varchar(10) COLLATE utf8_bin NOT NULL,
  `template_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `template_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Table structure for table `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `tables` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Table structure for table `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `item_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `item_type` varchar(64) COLLATE utf8_bin NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Table structure for table `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `tables` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Dumping data for table `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"poll2025\",\"table\":\"users\"},{\"db\":\"poll2025\",\"table\":\"polls\"},{\"db\":\"poll2025\",\"table\":\"polls_choices\"},{\"db\":\"poll2025\",\"table\":\"polls_answers\"},{\"db\":\"egzamin6\",\"table\":\"zadania\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Table structure for table `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `search_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `search_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `display_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `prefs` text COLLATE utf8_bin NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

-- --------------------------------------------------------

--
-- Table structure for table `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text COLLATE utf8_bin NOT NULL,
  `schema_sql` text COLLATE utf8_bin DEFAULT NULL,
  `data_sql` longtext COLLATE utf8_bin DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') COLLATE utf8_bin DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Dumping data for table `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2025-11-11 16:37:53', '{\"Console\\/Mode\":\"collapse\",\"NavigationWidth\":429}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) COLLATE utf8_bin NOT NULL,
  `tab` varchar(64) COLLATE utf8_bin NOT NULL,
  `allowed` enum('Y','N') COLLATE utf8_bin NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Table structure for table `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `usergroup` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indexes for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indexes for table `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indexes for table `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indexes for table `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indexes for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indexes for table `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indexes for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indexes for table `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indexes for table `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indexes for table `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indexes for table `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indexes for table `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indexes for table `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `poll2025`
--
CREATE DATABASE IF NOT EXISTS `poll2025` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci;
USE `poll2025`;

-- --------------------------------------------------------

--
-- Table structure for table `polls`
--

CREATE TABLE `polls` (
  `id` int(11) UNSIGNED NOT NULL,
  `question` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `polls`
--

INSERT INTO `polls` (`id`, `question`, `start`, `end`) VALUES
(1, 'Kto, twoim zdaniem, powinien zostać prezydentem Polski w 2025 roku?', '2025-04-16', '2025-06-02');

-- --------------------------------------------------------

--
-- Table structure for table `polls_answers`
--

CREATE TABLE `polls_answers` (
  `id` int(11) UNSIGNED NOT NULL,
  `user` int(11) DEFAULT NULL,
  `poll` int(11) DEFAULT NULL,
  `choice` int(11) DEFAULT NULL,
  `vote_timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `polls_answers`
--

INSERT INTO `polls_answers` (`id`, `user`, `poll`, `choice`, `vote_timestamp`) VALUES
(1, 2, 1, 13, '2025-04-23 19:59:10'),
(2, 1, 1, 7, '2025-04-23 19:59:17');

-- --------------------------------------------------------

--
-- Table structure for table `polls_choices`
--

CREATE TABLE `polls_choices` (
  `id` int(11) UNSIGNED NOT NULL,
  `poll` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `polls_choices`
--

INSERT INTO `polls_choices` (`id`, `poll`, `name`) VALUES
(1, 1, 'BARTOSZEWICZ Artur'),
(2, 1, 'BIEJAT Magdalena Agnieszka'),
(3, 1, 'BRAUN Grzegorz Michał'),
(4, 1, 'HOŁOWNIA Szymon Franciszek'),
(5, 1, 'JAKUBIAK Marek'),
(6, 1, 'MACIAK Maciej'),
(7, 1, 'MENTZEN Sławomir Jerzy'),
(8, 1, 'NAWROCKI Karol Tadeusz'),
(9, 1, 'SENYSZYN Joanna'),
(10, 1, 'STANOWSKI Krzysztof Jakub'),
(11, 1, 'TRZASKOWSKI Rafał Kazimierz'),
(12, 1, 'WOCH Marek Marian'),
(13, 1, 'ZANDBERG Adrian Tadeusz');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `visit_timestamp` datetime DEFAULT current_timestamp(),
  `device_id` varchar(64) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `ip_hash` varchar(64) COLLATE utf8mb4_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `visit_timestamp`, `device_id`, `ip_hash`) VALUES
(1, '2025-04-23 19:53:36', 'c2cfc48e89c754b833bb48cdc01e72d2', 'eff8e7ca506627fe15dda5e0e512fcaad70b6d520f37cc76597fdb4f2d83a1a3'),
(2, '2025-04-23 19:54:29', 'dd9405fd68c163253887502df0e901b6', '9b45101315171aeba9aee6186e015f23408d24851037e3f8c6fa8ede22bb3da7');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `polls`
--
ALTER TABLE `polls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `polls_answers`
--
ALTER TABLE `polls_answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `polls_choices`
--
ALTER TABLE `polls_choices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `device_id` (`device_id`),
  ADD UNIQUE KEY `ip_hash` (`ip_hash`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `polls`
--
ALTER TABLE `polls`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `polls_answers`
--
ALTER TABLE `polls_answers`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `polls_choices`
--
ALTER TABLE `polls_choices`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Database: `przychodnia`
--
CREATE DATABASE IF NOT EXISTS `przychodnia` DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci;
USE `przychodnia`;

-- --------------------------------------------------------

--
-- Table structure for table `lekarz`
--

CREATE TABLE `lekarz` (
  `id_lekarza` int(11) NOT NULL,
  `imie` varchar(25) COLLATE utf8_polish_ci DEFAULT NULL,
  `nazwisko` varchar(35) COLLATE utf8_polish_ci DEFAULT NULL,
  `specjalizacja` varchar(20) COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pacjent`
--

CREATE TABLE `pacjent` (
  `Id_pacjenta` int(11) NOT NULL,
  `Imie` varchar(25) COLLATE utf8_polish_ci DEFAULT NULL,
  `nazwisko` varchar(35) COLLATE utf8_polish_ci DEFAULT NULL,
  `PESEL` varchar(11) COLLATE utf8_polish_ci DEFAULT NULL,
  `data_urodzenia` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `pacjent`
--

INSERT INTO `pacjent` (`Id_pacjenta`, `Imie`, `nazwisko`, `PESEL`, `data_urodzenia`) VALUES
(2, 'imie2', 'nazwisko2', '96010233665', NULL),
(3, 'imie3', 'nazwisko3', '00000000003', NULL),
(4, 'imie4', 'nazwisko4', '00000000004', NULL),
(5, 'imie5', 'nazwisko5', '00000000005', NULL),
(10, NULL, NULL, '12341234123', '2023-01-18'),
(12, 'imie', 'nazwisko', '12331234123', '2023-01-18'),
(13, 'imie', 'nazwisko', '12331234113', NULL),
(14, 'imie', 'nazwisko', '12331234523', '2023-01-18');

-- --------------------------------------------------------

--
-- Table structure for table `wizyta`
--

CREATE TABLE `wizyta` (
  `Id_wizyty` int(11) NOT NULL,
  `Id_pacjenta` int(11) DEFAULT NULL,
  `data_wizyty` date DEFAULT NULL,
  `Koszt` float UNSIGNED DEFAULT NULL,
  `id_lekarza` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `wizyta`
--

INSERT INTO `wizyta` (`Id_wizyty`, `Id_pacjenta`, `data_wizyty`, `Koszt`, `id_lekarza`) VALUES
(1, 2, '2014-04-28', 25, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lekarz`
--
ALTER TABLE `lekarz`
  ADD PRIMARY KEY (`id_lekarza`);

--
-- Indexes for table `pacjent`
--
ALTER TABLE `pacjent`
  ADD PRIMARY KEY (`Id_pacjenta`),
  ADD UNIQUE KEY `PESEL` (`PESEL`);

--
-- Indexes for table `wizyta`
--
ALTER TABLE `wizyta`
  ADD PRIMARY KEY (`Id_wizyty`),
  ADD KEY `pacjent_wizyta_fk` (`Id_pacjenta`),
  ADD KEY `lekarz_wizyta_fk` (`id_lekarza`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lekarz`
--
ALTER TABLE `lekarz`
  MODIFY `id_lekarza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pacjent`
--
ALTER TABLE `pacjent`
  MODIFY `Id_pacjenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `wizyta`
--
ALTER TABLE `wizyta`
  MODIFY `Id_wizyty` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `wizyta`
--
ALTER TABLE `wizyta`
  ADD CONSTRAINT `lekarz_wizyta_fk` FOREIGN KEY (`id_lekarza`) REFERENCES `lekarz` (`id_lekarza`),
  ADD CONSTRAINT `pacjent_wizyta_fk` FOREIGN KEY (`Id_pacjenta`) REFERENCES `pacjent` (`Id_pacjenta`) ON UPDATE CASCADE;
--
-- Database: `przychodnia_spr`
--
CREATE DATABASE IF NOT EXISTS `przychodnia_spr` DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci;
USE `przychodnia_spr`;

-- --------------------------------------------------------

--
-- Table structure for table `lekarz`
--

CREATE TABLE `lekarz` (
  `id_lekarz` int(11) NOT NULL,
  `imie` varchar(20) COLLATE utf8_polish_ci DEFAULT NULL,
  `nazwisko` varchar(30) COLLATE utf8_polish_ci DEFAULT NULL,
  `specjalizacja` varchar(20) COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `lekarz`
--

INSERT INTO `lekarz` (`id_lekarz`, `imie`, `nazwisko`, `specjalizacja`) VALUES
(1, 'Jan', 'Kowalski', 'Kardiolog'),
(2, 'Mariusz', 'Sawicki', 'Okulista'),
(3, 'Olgierd', 'Jakubowski', 'Dentysta');

-- --------------------------------------------------------

--
-- Table structure for table `oddzial`
--

CREATE TABLE `oddzial` (
  `id_oddzialu` int(11) NOT NULL,
  `nazwa_oddzialu` varchar(30) COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `oddzial`
--

INSERT INTO `oddzial` (`id_oddzialu`, `nazwa_oddzialu`) VALUES
(1, 'Oddzial Kardiologii'),
(2, 'Oddzial Okulistyki'),
(3, 'Oddzial Ortodontyczny');

-- --------------------------------------------------------

--
-- Table structure for table `pacjent`
--

CREATE TABLE `pacjent` (
  `id_pacjenta` int(11) NOT NULL,
  `imie` varchar(20) COLLATE utf8_polish_ci DEFAULT NULL,
  `nazwisko` varchar(30) COLLATE utf8_polish_ci DEFAULT NULL,
  `data_urodzenia` date DEFAULT NULL,
  `data_przyjecia` date DEFAULT NULL,
  `data_wypisu` date DEFAULT NULL,
  `oddzial` int(11) DEFAULT NULL,
  `lekarz_prowadzacy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `pacjent`
--

INSERT INTO `pacjent` (`id_pacjenta`, `imie`, `nazwisko`, `data_urodzenia`, `data_przyjecia`, `data_wypisu`, `oddzial`, `lekarz_prowadzacy`) VALUES
(1, 'Blazej', 'Walczak', '1993-03-07', '2023-02-07', '2023-03-03', 1, 1),
(2, 'Przemek', 'Baran', '2004-03-07', '2023-02-07', '2023-03-03', 2, 2),
(3, 'Gracjan', 'Marciniak', '2008-03-07', '2023-02-07', '2023-03-03', 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `szczegoly_pobytu`
--

CREATE TABLE `szczegoly_pobytu` (
  `id_pobytu` int(11) NOT NULL,
  `rodzaj_choroby` varchar(30) COLLATE utf8_polish_ci DEFAULT NULL,
  `lekarstwa` varchar(30) COLLATE utf8_polish_ci DEFAULT NULL,
  `wskazania` varchar(30) COLLATE utf8_polish_ci DEFAULT NULL,
  `przeciwskazania` varchar(30) COLLATE utf8_polish_ci DEFAULT NULL,
  `uczelnia_na_lekarstwa` varchar(30) COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `szczegoly_pobytu`
--

INSERT INTO `szczegoly_pobytu` (`id_pobytu`, `rodzaj_choroby`, `lekarstwa`, `wskazania`, `przeciwskazania`, `uczelnia_na_lekarstwa`) VALUES
(1, 'Migotanie Serca', 'acard', 'Mniej jesc', 'Nie pic alkoholu', 'Brak'),
(2, 'Rozmazana wizja', 'krople do oczu', 'Jesc marchewki', 'Nie palic', 'Brak'),
(3, 'Bol zebow', 'Pasta do zebow', 'Myc zeby', 'Nie jesc cukierkow', 'Leki przeciwbolowe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lekarz`
--
ALTER TABLE `lekarz`
  ADD PRIMARY KEY (`id_lekarz`);

--
-- Indexes for table `oddzial`
--
ALTER TABLE `oddzial`
  ADD PRIMARY KEY (`id_oddzialu`);

--
-- Indexes for table `pacjent`
--
ALTER TABLE `pacjent`
  ADD PRIMARY KEY (`id_pacjenta`),
  ADD KEY `oddzial` (`oddzial`),
  ADD KEY `lekarz_prowadzacy` (`lekarz_prowadzacy`);

--
-- Indexes for table `szczegoly_pobytu`
--
ALTER TABLE `szczegoly_pobytu`
  ADD PRIMARY KEY (`id_pobytu`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lekarz`
--
ALTER TABLE `lekarz`
  MODIFY `id_lekarz` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `oddzial`
--
ALTER TABLE `oddzial`
  MODIFY `id_oddzialu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pacjent`
--
ALTER TABLE `pacjent`
  MODIFY `id_pacjenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `szczegoly_pobytu`
--
ALTER TABLE `szczegoly_pobytu`
  MODIFY `id_pobytu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pacjent`
--
ALTER TABLE `pacjent`
  ADD CONSTRAINT `pacjent_ibfk_1` FOREIGN KEY (`oddzial`) REFERENCES `oddzial` (`id_oddzialu`),
  ADD CONSTRAINT `pacjent_ibfk_2` FOREIGN KEY (`lekarz_prowadzacy`) REFERENCES `lekarz` (`id_lekarz`);
--
-- Database: `szpital`
--
CREATE DATABASE IF NOT EXISTS `szpital` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `szpital`;

-- --------------------------------------------------------

--
-- Table structure for table `lekarz`
--

CREATE TABLE `lekarz` (
  `id_lekarza` int(11) NOT NULL,
  `imie` varchar(20) DEFAULT NULL,
  `nazwisko` varchar(30) DEFAULT NULL,
  `specjalizacja` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lekarz`
--

INSERT INTO `lekarz` (`id_lekarza`, `imie`, `nazwisko`, `specjalizacja`) VALUES
(1, 'Mateusz', 'Kwiatkowski', 'kardiolog'),
(2, 'Ludwik', 'Maj', 'internista'),
(3, 'Amelia', 'Mila', 'okulista');

-- --------------------------------------------------------

--
-- Stand-in structure for view `lekarze_bez_pacjentow`
-- (See below for the actual view)
--
CREATE TABLE `lekarze_bez_pacjentow` (
`id_lekarza` int(11)
,`imie` varchar(20)
,`nazwisko` varchar(30)
,`specjalizacja` varchar(20)
);

-- --------------------------------------------------------

--
-- Table structure for table `oddzial`
--

CREATE TABLE `oddzial` (
  `id_oddzialu` int(11) NOT NULL,
  `nazwa_oddzialu` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `oddzial`
--

INSERT INTO `oddzial` (`id_oddzialu`, `nazwa_oddzialu`) VALUES
(1, 'kardiologia'),
(2, 'zakazny');

-- --------------------------------------------------------

--
-- Table structure for table `pacjent`
--

CREATE TABLE `pacjent` (
  `id_pacjenta` int(11) NOT NULL,
  `imie` varchar(20) DEFAULT NULL,
  `nazwisko` varchar(30) DEFAULT NULL,
  `data_urodzenia` date DEFAULT NULL,
  `data_przyjecia` date DEFAULT NULL,
  `data_wypisu` date DEFAULT NULL,
  `oddzial` int(11) DEFAULT NULL,
  `lekarz_prowadzacy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pacjent`
--

INSERT INTO `pacjent` (`id_pacjenta`, `imie`, `nazwisko`, `data_urodzenia`, `data_przyjecia`, `data_wypisu`, `oddzial`, `lekarz_prowadzacy`) VALUES
(1, 'Jan', 'Nowak', '2008-03-12', '2019-09-23', NULL, 1, 1),
(2, 'Julia', 'Kras', '1956-11-12', '2017-01-04', '2017-02-02', 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `szczegoly_pobytu`
--

CREATE TABLE `szczegoly_pobytu` (
  `id_pobytu` int(11) NOT NULL,
  `rodzaj_choroby` varchar(30) DEFAULT NULL,
  `lekarstwa` varchar(30) DEFAULT NULL,
  `wskazania` varchar(30) DEFAULT NULL,
  `przeciwskazania` varchar(30) DEFAULT NULL,
  `uczulenia_na_lekarstwa` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `szczegoly_pobytu`
--

INSERT INTO `szczegoly_pobytu` (`id_pobytu`, `rodzaj_choroby`, `lekarstwa`, `wskazania`, `przeciwskazania`, `uczulenia_na_lekarstwa`) VALUES
(1, 'choroba wiencowa', 'acard', 'kontrola w POZ', 'wysilek fizyczny', 'brak'),
(2, 'krztusiec', 'pyralgina', 'kontrola w POZ', 'wysilek fizyczny', 'brak');

-- --------------------------------------------------------

--
-- Structure for view `lekarze_bez_pacjentow`
--
DROP TABLE IF EXISTS `lekarze_bez_pacjentow`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lekarze_bez_pacjentow`  AS SELECT `l`.`id_lekarza` AS `id_lekarza`, `l`.`imie` AS `imie`, `l`.`nazwisko` AS `nazwisko`, `l`.`specjalizacja` AS `specjalizacja` FROM (`lekarz` `l` left join `pacjent` `p` on(`l`.`id_lekarza` = `p`.`lekarz_prowadzacy`)) WHERE `p`.`lekarz_prowadzacy` is nullnull  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lekarz`
--
ALTER TABLE `lekarz`
  ADD PRIMARY KEY (`id_lekarza`);

--
-- Indexes for table `oddzial`
--
ALTER TABLE `oddzial`
  ADD PRIMARY KEY (`id_oddzialu`);

--
-- Indexes for table `pacjent`
--
ALTER TABLE `pacjent`
  ADD PRIMARY KEY (`id_pacjenta`),
  ADD KEY `oddzial` (`oddzial`),
  ADD KEY `lekarz_prowadzacy` (`lekarz_prowadzacy`);

--
-- Indexes for table `szczegoly_pobytu`
--
ALTER TABLE `szczegoly_pobytu`
  ADD PRIMARY KEY (`id_pobytu`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lekarz`
--
ALTER TABLE `lekarz`
  MODIFY `id_lekarza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `oddzial`
--
ALTER TABLE `oddzial`
  MODIFY `id_oddzialu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pacjent`
--
ALTER TABLE `pacjent`
  MODIFY `id_pacjenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pacjent`
--
ALTER TABLE `pacjent`
  ADD CONSTRAINT `pacjent_ibfk_1` FOREIGN KEY (`oddzial`) REFERENCES `oddzial` (`id_oddzialu`),
  ADD CONSTRAINT `pacjent_ibfk_2` FOREIGN KEY (`lekarz_prowadzacy`) REFERENCES `lekarz` (`id_lekarza`),
  ADD CONSTRAINT `pacjent_ibfk_3` FOREIGN KEY (`id_pacjenta`) REFERENCES `szczegoly_pobytu` (`id_pobytu`);
--
-- Database: `temple_of_gains`
--
CREATE DATABASE IF NOT EXISTS `temple_of_gains` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci;
USE `temple_of_gains`;

-- --------------------------------------------------------

--
-- Table structure for table `exercises`
--

CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_polish_ci NOT NULL,
  `description` text COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `body_part` varchar(100) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `video_url` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `exercises`
--

INSERT INTO `exercises` (`id`, `name`, `description`, `body_part`, `video_url`) VALUES
(1, 'Bench Press', 'Cwiczenie na klatke piersiowa z uzyciem sztangi.', 'Chest', 'https://www.youtube.com/watch?v=rT7DgCr-3pg'),
(2, 'Squat', 'Przysiad ze sztanga, angazujacy nogi i posladki.', 'Legs', 'https://www.youtube.com/watch?v=aclHkVaku9U'),
(3, 'Deadlift', 'Martwy ciag - cwiczenie na plecy i posladki.', 'Back', 'https://www.youtube.com/watch?v=op9kVnSso6Q'),
(4, 'Overhead Press', 'Wyciskanie nad glowe na barki.', 'Shoulders', 'https://www.youtube.com/watch?v=qEwKCR5JCog'),
(5, 'Pull-up', 'Podciaganie na drazku - klasyka na plecy i biceps.', 'Back', 'https://www.youtube.com/watch?v=eGo4IYlbE5g');

-- --------------------------------------------------------

--
-- Table structure for table `measurements`
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
-- Table structure for table `personalrecords`
--

CREATE TABLE `personalrecords` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lift_name` varchar(100) COLLATE utf8mb4_polish_ci NOT NULL,
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
-- Table structure for table `planexercises`
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
(7, 3, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_polish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`) VALUES
(1, 'admin', 'admin@temple.com', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', '2025-11-11 17:36:54'),
(2, 'janek', 'janek@example.com', '0adb33d9bcae1423c3f5a7652d44062007c91cffd506681aa0f258e0888d18a3', '2025-11-11 17:36:54'),
(3, 'ania', 'ania@example.com', 'ba72941c2cef34c0d1363382e5061332a6e6023dd7947554891374aba93e6db7', '2025-11-11 17:36:54');

-- --------------------------------------------------------

--
-- Table structure for table `workoutdetails`
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
-- Table structure for table `workoutplans`
--

CREATE TABLE `workoutplans` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_polish_ci NOT NULL,
  `description` text COLLATE utf8mb4_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `workoutplans`
--

INSERT INTO `workoutplans` (`id`, `user_id`, `name`, `description`) VALUES
(1, 1, 'Plan Silowy', 'Trening og?lnorozwojowy 3x w tygodniu.'),
(2, 2, 'Plan Redukcyjny', 'Plan nastawiony na spalanie tluszczu.'),
(3, 3, 'Plan Poczatkujacego', 'Lekki plan treningowy dla poczatkujacych.');

-- --------------------------------------------------------

--
-- Table structure for table `workouts`
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
-- Indexes for dumped tables
--

--
-- Indexes for table `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `measurements`
--
ALTER TABLE `measurements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `personalrecords`
--
ALTER TABLE `personalrecords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `planexercises`
--
ALTER TABLE `planexercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plan_id` (`plan_id`),
  ADD KEY `exercise_id` (`exercise_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `workoutdetails`
--
ALTER TABLE `workoutdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workout_id` (`workout_id`),
  ADD KEY `exercise_id` (`exercise_id`);

--
-- Indexes for table `workoutplans`
--
ALTER TABLE `workoutplans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `workouts`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `workoutdetails`
--
ALTER TABLE `workoutdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `workoutplans`
--
ALTER TABLE `workoutplans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  ADD CONSTRAINT `workoutplans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workouts`
--
ALTER TABLE `workouts`
  ADD CONSTRAINT `workouts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `workouts_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `workoutplans` (`id`) ON DELETE SET NULL;
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;

-- --------------------------------------------------------

--
-- Table structure for table `klienci`
--

CREATE TABLE `klienci` (
  `id_klienta` int(11) NOT NULL,
  `imie` varchar(255) DEFAULT NULL,
  `nazwisko` varchar(255) DEFAULT NULL,
  `pesel` varchar(11) DEFAULT NULL,
  `numer_telefonu` varchar(9) DEFAULT NULL,
  `id_zamowienia` int(11) DEFAULT NULL,
  `staly_klient` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `zamowienia`
--

CREATE TABLE `zamowienia` (
  `id_zamowienia` int(11) NOT NULL,
  `cena` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `klienci`
--
ALTER TABLE `klienci`
  ADD PRIMARY KEY (`id_klienta`),
  ADD KEY `fk_id_zamowienia` (`id_zamowienia`);

--
-- Indexes for table `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD PRIMARY KEY (`id_zamowienia`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `klienci`
--
ALTER TABLE `klienci`
  MODIFY `id_klienta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zamowienia`
--
ALTER TABLE `zamowienia`
  MODIFY `id_zamowienia` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `klienci`
--
ALTER TABLE `klienci`
  ADD CONSTRAINT `fk_id_zamowienia` FOREIGN KEY (`id_zamowienia`) REFERENCES `zamowienia` (`id_zamowienia`);
--
-- Database: `testowa`
--
CREATE DATABASE IF NOT EXISTS `testowa` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `testowa`;
--
-- Database: `zawody_sportowe`
--
CREATE DATABASE IF NOT EXISTS `zawody_sportowe` DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci;
USE `zawody_sportowe`;

-- --------------------------------------------------------

--
-- Table structure for table `turniej`
--

CREATE TABLE `turniej` (
  `Id_turnieju` int(11) NOT NULL,
  `Data` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `turniej`
--

INSERT INTO `turniej` (`Id_turnieju`, `Data`) VALUES
(1, '2014-02-02');

-- --------------------------------------------------------

--
-- Table structure for table `zawodnik`
--

CREATE TABLE `zawodnik` (
  `Id_zawodnika` int(11) NOT NULL,
  `Imie` varchar(25) DEFAULT NULL,
  `Nazwisko` varchar(25) DEFAULT NULL,
  `panstwo` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `zawodnik`
--

INSERT INTO `zawodnik` (`Id_zawodnika`, `Imie`, `Nazwisko`, `panstwo`) VALUES
(1, 'Robert', 'Lewy', 'Polska'),
(2, 'Kylian', 'Mbappe', 'Francja'),
(3, 'Erling', 'Haaland', 'Norwegia'),
(4, 'Mohamed', 'Salah', 'Egipt'),
(5, 'imie1', 'nazwisko1', 'kraj1'),
(6, 'Martin', 'Adams', 'Anglik'),
(7, 'Martin1', 'Adams1', 'Anglik1'),
(8, 'Martin12', 'Adams12', 'Anglik12'),
(10, 'Martin123', 'Adams123', 'Anglik123');

-- --------------------------------------------------------

--
-- Table structure for table `zaw_tur`
--

CREATE TABLE `zaw_tur` (
  `Id_zaw` int(11) NOT NULL,
  `Id_Turnieju` int(11) NOT NULL,
  `Miejsce` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `zaw_tur`
--

INSERT INTO `zaw_tur` (`Id_zaw`, `Id_Turnieju`, `Miejsce`) VALUES
(1, 1, 'Krak?w'),
(2, 1, 'Tarn?w');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `turniej`
--
ALTER TABLE `turniej`
  ADD PRIMARY KEY (`Id_turnieju`);

--
-- Indexes for table `zawodnik`
--
ALTER TABLE `zawodnik`
  ADD PRIMARY KEY (`Id_zawodnika`),
  ADD UNIQUE KEY `Panstwo` (`panstwo`);

--
-- Indexes for table `zaw_tur`
--
ALTER TABLE `zaw_tur`
  ADD PRIMARY KEY (`Id_zaw`,`Id_Turnieju`),
  ADD KEY `zaw_tur_fk_2` (`Id_Turnieju`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `turniej`
--
ALTER TABLE `turniej`
  MODIFY `Id_turnieju` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `zawodnik`
--
ALTER TABLE `zawodnik`
  MODIFY `Id_zawodnika` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `zaw_tur`
--
ALTER TABLE `zaw_tur`
  ADD CONSTRAINT `zaw_tur_fk_1` FOREIGN KEY (`Id_zaw`) REFERENCES `zawodnik` (`Id_zawodnika`) ON UPDATE CASCADE,
  ADD CONSTRAINT `zaw_tur_fk_2` FOREIGN KEY (`Id_Turnieju`) REFERENCES `turniej` (`Id_turnieju`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

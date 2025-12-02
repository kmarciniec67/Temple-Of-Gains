-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2025 at 12:24 AM
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
-- Database: `temple_of_gains`
--

-- --------------------------------------------------------

--
-- Table structure for table `exercises`
--

CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_polish_ci NOT NULL,
  `description` text COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `body_part` enum('Chest','Back','Legs','Shoulders','Arms','Abs','Full Body') COLLATE utf8mb4_polish_ci DEFAULT NULL,
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
(5, 'Pull-up', 'Podciaganie na drazku - klasyka na plecy i biceps.', 'Back', 'https://www.youtube.com/watch?v=eGo4IYlbE5g'),
(6, 'Bench Press', 'Wyciskanie sztangi na lawce plaskiej.', 'Chest', 'https://www.youtube.com/watch?v=rT7DgCr-3pg'),
(7, 'Incline Bench Press', 'Wyciskanie sztangi na lawce skosnej dodatniej.', 'Chest', 'https://www.youtube.com/watch?v=SrqOu55lrYU'),
(8, 'Dumbbell Bench Press', 'Wyciskanie hantli na lawce plaskiej.', 'Chest', 'https://www.youtube.com/watch?v=VmB1G1K7v94'),
(9, 'Chest Fly Machine', 'Rozpietki na maszynie.', 'Chest', 'https://www.youtube.com/watch?v=eozdVDA78K0'),
(10, 'Cable Fly', 'Rozpietki na bramie.', 'Chest', 'https://www.youtube.com/watch?v=taI4XduLpTk'),
(11, 'Push-ups', 'Pompki klasyczne na klatke.', 'Chest', 'https://www.youtube.com/watch?v=_l3ySVKYVJ8'),
(12, 'Deadlift', 'Martwy ciag.', 'Back', 'https://www.youtube.com/watch?v=op9kVnSso6Q'),
(13, 'Pull-up', 'Podciaganie nachwytem.', 'Back', 'https://www.youtube.com/watch?v=eGo4IYlbE5g'),
(14, 'Lat Pulldown', 'Sciaganie drazka wyciagu gornego.', 'Back', 'https://www.youtube.com/watch?v=CAwf7n6Luuc'),
(15, 'Barbell Row', 'Wioslowanie sztanga.', 'Back', 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ'),
(16, 'Dumbbell Row', 'Wioslowanie hantlem.', 'Back', 'https://www.youtube.com/watch?v=pYcpY20QaE8'),
(17, 'Seated Cable Row', 'Wioslowanie na maszynie.', 'Back', 'https://www.youtube.com/watch?v=HJSVR_oaD1g'),
(18, 'Hyperextensions', 'Prostowniki grzbietu.', 'Back', 'https://www.youtube.com/watch?v=qCbxFAJuA6I'),
(19, 'T-Bar Row', 'Wioslowanie T-bar.', 'Back', 'https://www.youtube.com/watch?v=GDlMirFgbhs'),
(20, 'Squat', 'Przysiad ze sztanga.', 'Legs', 'https://www.youtube.com/watch?v=aclHkVaku9U'),
(21, 'Leg Press', 'Wyciskanie nogami.', 'Legs', 'https://www.youtube.com/watch?v=IZxyjW7MPJQ'),
(22, 'Lunges', 'Wykroki.', 'Legs', 'https://www.youtube.com/watch?v=QOVaaWnUJ2s'),
(23, 'Romanian Deadlift', 'RDL na tyl uda.', 'Legs', 'https://www.youtube.com/watch?v=JCXUYuzwNrM'),
(24, 'Leg Curl', 'Uginanie nog na maszynie.', 'Legs', 'https://www.youtube.com/watch?v=1Tq3QdYUuHs'),
(25, 'Leg Extension', 'Prostowanie nog.', 'Legs', 'https://www.youtube.com/watch?v=YyvSfVjQeL0'),
(26, 'Calf Raise', 'Wspiecia na lydki.', 'Legs', 'https://www.youtube.com/watch?v=YMmgqO8Jo-k'),
(27, 'Front Squat', 'Przysiad przedni.', 'Legs', 'https://www.youtube.com/watch?v=UMq8o5YnG1E'),
(28, 'Bulgarian Split Squat', 'Bulgarskie przysiady.', 'Legs', 'https://www.youtube.com/watch?v=2C-uNgKwPLE'),
(29, 'Overhead Press', 'Wyciskanie nad glowe.', 'Shoulders', 'https://www.youtube.com/watch?v=qEwKCR5JCog'),
(30, 'Lateral Raises', 'Unoszenia bokiem.', 'Shoulders', 'https://www.youtube.com/watch?v=kDqklk1ZESo'),
(31, 'Front Raises', 'Unoszenia przodem.', 'Shoulders', 'https://www.youtube.com/watch?v=8QWbvzdf4Rk'),
(32, 'Rear Delt Fly', 'Odwodzenie ramion na tylny bark.', 'Shoulders', 'https://www.youtube.com/watch?v=ttvfGg9d76c'),
(33, 'Arnold Press', 'Wyciskanie hantli - Arnold.', 'Shoulders', 'https://www.youtube.com/watch?v=vj2w851ZHRM'),
(34, 'Machine Shoulder Press', 'Wyciskanie na barki na maszynie.', 'Shoulders', 'https://www.youtube.com/watch?v=4AzB8Hu-1DE'),
(35, 'Shrugs', 'Wzruszanie barkami.', 'Shoulders', 'https://www.youtube.com/watch?v=3UWi44yN-wE'),
(36, 'Barbell Curl', 'Uginanie ramion ze sztanga.', 'Arms', 'https://www.youtube.com/watch?v=kwG2ipFRgfo'),
(37, 'Hammer Curl', 'Uginanie mlotkowe.', 'Arms', 'https://www.youtube.com/watch?v=zC3nLlEvin4'),
(38, 'Triceps Pushdown', 'Prostowanie ramienia na wyciagu.', 'Arms', 'https://www.youtube.com/watch?v=2-LAMcpzODU'),
(39, 'Skull Crushers', 'Wyciskanie francuskie lezac.', 'Arms', 'https://www.youtube.com/watch?v=d_KZxkY_0cM'),
(40, 'Preacher Curl', 'Uginanie na modlitewniku.', 'Arms', 'https://www.youtube.com/watch?v=fIWP-FRFNU0'),
(41, 'Concentration Curl', 'Uginanie hantli siedzac.', 'Arms', 'https://www.youtube.com/watch?v=8OA1f1pGfG0'),
(42, 'Dips', 'Pompki na poreczach.', 'Arms', 'https://www.youtube.com/watch?v=2z8JmcrW-As'),
(43, 'Close-Grip Bench Press', 'Wyciskanie waskim chwytem.', 'Arms', 'https://www.youtube.com/watch?v=EVQOE8Dr95I'),
(44, 'Crunches', 'Brzuszki.', 'Abs', 'https://www.youtube.com/watch?v=Xyd_fa5zoEU'),
(45, 'Hanging Leg Raises', 'Unoszenie n?g wiszac.', 'Abs', 'https://www.youtube.com/watch?v=0g2_Hf3ZBG0'),
(46, 'Plank', 'Deska.', 'Abs', 'https://www.youtube.com/watch?v=pSHjTRCQxIw'),
(47, 'Russian Twist', 'Skrety tulowia.', 'Abs', 'https://www.youtube.com/watch?v=wkD8rjkodUI'),
(48, 'Cable Crunch', 'Sciaganie linek na brzuch.', 'Abs', 'https://www.youtube.com/watch?v=8D_ItZBvbmk'),
(49, 'Bicycle Crunches', 'Rowerki.', 'Abs', 'https://www.youtube.com/watch?v=9FGilxCbdz8'),
(50, 'Mountain Climbers', 'Bieg w podporze.', 'Abs', 'https://www.youtube.com/watch?v=nmwgirgXLYM'),
(51, 'Kettlebell Swing', 'Swing z kettlem.', 'Full Body', 'https://www.youtube.com/watch?v=YSx0h0Mf0Eg'),
(52, 'Burpees', 'Padnij-powstan.', 'Full Body', 'https://www.youtube.com/watch?v=TU8QYVW0gDU'),
(53, 'Clean and Press', 'Zarzut i wyciskanie.', 'Full Body', 'https://www.youtube.com/watch?v=MoBuihuvuxI'),
(54, 'Snatch', 'Rwanie.', 'Full Body', 'https://www.youtube.com/watch?v=PBWcRiwZp6c'),
(55, 'Farmer Walk', 'Spacer farmera.', 'Full Body', 'https://www.youtube.com/watch?v=moH1XMGx4UA');

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
(84, 16, 6, 4),
(85, 16, 28, 5),
(86, 16, 34, 6),
(87, 17, 7, 1),
(88, 17, 8, 2),
(89, 17, 9, 3),
(90, 17, 10, 4),
(91, 17, 11, 5),
(92, 17, 12, 6),
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
(114, 21, 20, 4),
(115, 21, 21, 5),
(116, 21, 22, 6),
(117, 22, 1, 1),
(118, 22, 3, 2),
(119, 22, 4, 3),
(120, 22, 28, 4),
(121, 22, 29, 5),
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
(3, 'ania', 'ania@example.com', 'ba72941c2cef34c0d1363382e5061332a6e6023dd7947554891374aba93e6db7', '2025-11-11 17:36:54'),
(4, 'test1', 'test1@example.com', '2db22adf093fc4a5cda4e42e0f9259a26a655561c88181443541b4654ed91294', '2025-11-16 15:54:27');

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
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_polish_ci NOT NULL,
  `description` text COLLATE utf8mb4_polish_ci DEFAULT NULL,
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
  ADD KEY `fk_pe_plan` (`plan_id`),
  ADD KEY `fk_pe_ex` (`exercise_id`);

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
  ADD KEY `fk_wp_user` (`user_id`);

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
  ADD CONSTRAINT `fk_pe_ex` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_pe_plan` FOREIGN KEY (`plan_id`) REFERENCES `workoutplans` (`id`) ON DELETE CASCADE,
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

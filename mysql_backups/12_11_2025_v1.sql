-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2025 at 06:57 PM
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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

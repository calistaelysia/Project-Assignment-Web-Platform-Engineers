-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2021 at 11:55 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pokemon`
--

-- --------------------------------------------------------

--
-- Table structure for table `mypokemon`
--

CREATE TABLE `mypokemon` (
  `id` int(10) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `urlnum` varchar(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mypokemon`
--

INSERT INTO `mypokemon` (`id`, `nickname`, `name`, `urlnum`, `created_at`, `update_at`) VALUES
(22, 'bulbasaur1', 'bulbasaur', '1', '2021-02-16 23:16:07', NULL),
(23, 'Squirtle1', 'squirtle', '7', '2021-02-16 23:16:32', NULL),
(28, 'chamander1', 'charmander', '4', '2021-02-17 16:26:18', NULL),
(32, 'charmander2', 'charmander', '4', '2021-02-17 16:59:19', NULL),
(33, 'squirtle2', 'squirtle', '7', '2021-02-17 16:59:30', NULL),
(35, 'chamander3', 'charmander', '4', '2021-02-17 17:23:46', NULL),
(36, 'weedle1', 'weedle', '13', '2021-02-17 17:24:53', NULL),
(37, 'weedle2', 'weedle', '13', '2021-02-17 17:50:00', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mypokemon`
--
ALTER TABLE `mypokemon`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nickname` (`nickname`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mypokemon`
--
ALTER TABLE `mypokemon`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

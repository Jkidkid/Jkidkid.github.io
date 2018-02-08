-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Värd: localhost
-- Tid vid skapande: 08 feb 2018 kl 10:33
-- Serverversion: 10.1.28-MariaDB
-- PHP-version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `citrus`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `clues`
--

CREATE TABLE `clues` (
  `clues_id` int(128) NOT NULL,
  `clue_header` varchar(128) NOT NULL,
  `img_src` varchar(128) NOT NULL,
  `clue_text` varchar(128) NOT NULL,
  `clue_lat` varchar(128) NOT NULL,
  `clue_lng` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumpning av Data i tabell `clues`
--

INSERT INTO `clues` (`clues_id`, `clue_header`, `img_src`, `clue_text`, `clue_lat`, `clue_lng`) VALUES
(0, 'Mordplats', '', 'Ett mord har skett', '', ''),
(1, 'Mordplats 2', '', 'Ett mord har skett', '', ''),
(2, 'Plats1', '', 'Hjälp', '', '');

-- --------------------------------------------------------

--
-- Tabellstruktur `played_match`
--

CREATE TABLE `played_match` (
  `match_id` int(128) NOT NULL,
  `team_id` int(128) NOT NULL,
  `isActive` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumpning av Data i tabell `played_match`
--

INSERT INTO `played_match` (`match_id`, `team_id`, `isActive`) VALUES
(1, 0, 0);

-- --------------------------------------------------------

--
-- Tabellstruktur `teams`
--

CREATE TABLE `teams` (
  `team_id` varchar(128) NOT NULL,
  `team_points` int(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellstruktur `team_clues`
--

CREATE TABLE `team_clues` (
  `team_clues_id` int(128) NOT NULL,
  `clue_id` int(128) NOT NULL,
  `team_id` int(128) NOT NULL,
  `match_id` int(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellstruktur `user`
--

CREATE TABLE `user` (
  `id` int(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `uid` text NOT NULL,
  `pwd` varchar(128) NOT NULL,
  `user_points` int(128) DEFAULT NULL,
  `team_id` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumpning av Data i tabell `user`
--

INSERT INTO `user` (`id`, `email`, `uid`, `pwd`, `user_points`, `team_id`) VALUES
(1, 'jocke@jocke.se', 'Jkid', '$2y$10$EdC4OvhviC25UR7M/kxy2u21QOEfVLE7bjBkrnziWXmm4NnvJstDi', NULL, ''),
(2, 'micke@micke.se', 'mickeP', '$2y$10$zN7QG2AMo6oWUCbyP6itN.juZsHaD2Wqx0DupNBEpRABTumbyNbzW', NULL, ''),
(3, 'simon@simon.se', 'simon', '$2y$10$0KxAu.0w7TQzVjVgBu4MLO05pJOKiIh27sFecHSTMIe7.4dzxlFO6', NULL, ''),
(4, 'miguel@example.se', 'PerUlrich', '$2y$10$dCOSGe1H.6R2ckUHJlBN2OxaSR39yR8.CAEEoAYcdlx5kPEDxku5.', NULL, ''),
(5, 'elin@elin.com', 'Elin', '$2y$10$2YfbZejSU.Fc37cL3how.utL1zrpolCOArpDp4kHamWjBpt.rWGAq', NULL, ''),
(6, 'Simon.gribert@student.kyh.se', 'suracitroner', '$2y$10$Qz.AUg9ytm.WREnP.4t9F.ITQijKZxcP7q645d3y2HYFDT2rj04Z.', NULL, ''),
(7, 'hejhej@hotmail.com', 'pelle', '$2y$10$0qEl0CBcsgwYoaVEt.unKOrkCNnToGcqGlRlIUNBFuxTa5y3dn35m', NULL, ''),
(8, 'asd@hotmail.com', 'Elinnn', '$2y$10$3zA/5ggeW8JF1j7C/G5hF.XNSMVrnZ0LF83t3T87fTjdSwpgsTSNS', NULL, ''),
(9, 'example@hotmail.com', 'mickeg', '$2y$10$ERsm.qETzBorZgmGAoFU4uXfpBPpTDNx56mMssoXpm.412dkal8KS', NULL, ''),
(10, 's.b@mail.com', 'xXx_Drag0nF1re_xXx', '$2y$10$3T5nraDqXwTR7cr7g5ZDWef0SKXzh6iwGDAganVG2hcquROXo6ssi', NULL, ''),
(11, 'jocke1@jocke.se', 'jocke1', '$2y$10$eXp7bmWp82hq4TAuhNqh8u6Vj2jp9Q9dTRQmAeGzTbQEqIVaDRgLi', NULL, ''),
(12, 'example@hotmail.com', 'tobbe', '$2y$10$p5v/j6yO9KskKDevSHy63OzNYJ3BKzR1RQlUZ/aB2/XaBn4LCx6dq', NULL, '');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `clues`
--
ALTER TABLE `clues`
  ADD PRIMARY KEY (`clues_id`);

--
-- Index för tabell `played_match`
--
ALTER TABLE `played_match`
  ADD PRIMARY KEY (`match_id`);

--
-- Index för tabell `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`);

--
-- Index för tabell `team_clues`
--
ALTER TABLE `team_clues`
  ADD PRIMARY KEY (`team_clues_id`);

--
-- Index för tabell `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `played_match`
--
ALTER TABLE `played_match`
  MODIFY `match_id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT för tabell `user`
--
ALTER TABLE `user`
  MODIFY `id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

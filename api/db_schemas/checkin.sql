-- phpMyAdmin SQL Dump
-- version 4.1.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 31, 2014 at 01:12 PM
-- Server version: 5.6.17
-- PHP Version: 5.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `checkin`
--
CREATE DATABASE IF NOT EXISTS `checkin`;

-- --------------------------------------------------------

--
-- Table structure for table `27752`
--

CREATE TABLE IF NOT EXISTS `27752` (
  `userId` varchar(255) NOT NULL,
  `meetingId` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `27752`
--

INSERT INTO `27752` (`userId`, `meetingId`, `timestamp`, `by`) VALUES
('cbookman3', 1, '2014-03-30 22:53:29', 'cbookman3'),
('pbajaj6', 1, '2014-03-30 22:53:48', 'cbookman3'),
('cbookman3', 1, '2014-03-31 08:55:40', 'cbookman3');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

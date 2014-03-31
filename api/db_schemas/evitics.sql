-- phpMyAdmin SQL Dump
-- version 4.1.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 31, 2014 at 01:13 PM
-- Server version: 5.6.17
-- PHP Version: 5.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `evitics`
--
CREATE DATABASE IF NOT EXISTS `evitics`;
-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

CREATE TABLE IF NOT EXISTS `meeting` (
  `meetingId` int(11) NOT NULL AUTO_INCREMENT,
  `orgId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`meetingId`),
  UNIQUE KEY `meetingId` (`meetingId`),
  KEY `meetingId_2` (`meetingId`),
  KEY `orgId` (`orgId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `meeting`
--

INSERT INTO `meeting` (`meetingId`, `orgId`, `name`) VALUES
(1, 27752, 'UHR Finance Meeting'),
(2, 27752, 'Executive Meeting');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `userId` varchar(255) NOT NULL,
  `orgId` int(11) NOT NULL,
  `writePerm` tinyint(1) NOT NULL DEFAULT '0',
  `isPending` tinyint(1) NOT NULL DEFAULT '1',
  KEY `userId` (`userId`),
  KEY `orgId` (`orgId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `orgId`, `writePerm`, `isPending`) VALUES
('cbookman3', 27752, 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

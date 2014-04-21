-- phpMyAdmin SQL Dump
-- version 4.1.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 31, 2014 at 11:43 PM
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
CREATE DATABASE IF NOT EXISTS `evitics` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `evitics`;


-- --------------------------------------------------------

--
-- Table structure for table `gtedCache`
--

CREATE TABLE IF NOT EXISTS `gtedCache` (
  `username` varchar(255) NOT NULL,
  `gtid` varchar(255) NOT NULL,
  `buzzcardId` int(255) NOT NULL,
  `data` mediumtext,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `buzzcardId` (`buzzcardId`),
  UNIQUE KEY `buzzcardId_2` (`buzzcardId`),
  UNIQUE KEY `gtid` (`gtid`),
  KEY `gtid_2` (`gtid`),
  KEY `buzzcardId_3` (`buzzcardId`),
  KEY `gtid_3` (`gtid`),
  KEY `buzzcardId_4` (`buzzcardId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

CREATE TABLE IF NOT EXISTS `meeting` (
  `meetingId` int(11) NOT NULL AUTO_INCREMENT,
  `orgId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sendEmailOnCheckin` varchar(50) NOT NULL DEFAULT 'false',
  `emailFrom` varchar(255) NOT NULL,
  `emailSubject` varchar(255) NOT NULL,
  `emailMessage` mediumtext NOT NULL,
  PRIMARY KEY (`meetingId`),
  UNIQUE KEY `meetingId` (`meetingId`),
  KEY `meetingId_2` (`meetingId`),
  KEY `orgId` (`orgId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=38 ;


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


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


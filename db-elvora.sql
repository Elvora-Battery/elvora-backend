-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: elvora
-- ------------------------------------------------------
-- Server version	8.0.31-google

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `elvora`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `elvora` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `elvora`;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `battery`
--

DROP TABLE IF EXISTS `battery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `battery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tegangan` varchar(255) DEFAULT NULL,
  `arus` varchar(255) DEFAULT NULL,
  `daya` varchar(255) DEFAULT NULL,
  `suhu` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `daya_digunakan` varchar(255) DEFAULT NULL,
  `total_waktu` varchar(255) DEFAULT NULL,
  `status_relay` tinyint(1) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `token_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_token` (`token_id`),
  CONSTRAINT `fk_token` FOREIGN KEY (`token_id`) REFERENCES `tokens` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battery`
--

LOCK TABLES `battery` WRITE;
/*!40000 ALTER TABLE `battery` DISABLE KEYS */;
INSERT INTO `battery` VALUES (1,'12','3','34','29','2024-09-24 04:27:35','2024-09-24 04:27:35',NULL,NULL,NULL,NULL,NULL,NULL),(2,'12.5','3.2','40.0','30.0','2024-09-24 07:17:16','2024-09-24 11:49:05','20.0','10.0',1,'-6.200000','106.800000',6),(3,'12','3','36','29','2024-09-24 14:55:58','2024-09-24 15:14:11','432','12345',1,'-6.1745517','106.824458',7),(4,NULL,NULL,NULL,NULL,'2024-09-24 15:05:12','2024-09-24 15:05:12',NULL,'12345',1,'-6.1745517','106.824458',7),(5,'12','3','36','29','2024-09-24 15:18:36','2024-09-24 15:18:36','432','12345',1,'-6.1745517','106.824458',8);
/*!40000 ALTER TABLE `battery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ktp`
--

DROP TABLE IF EXISTS `ktp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ktp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nik` varchar(255) DEFAULT NULL,
  `nama` varchar(255) NOT NULL,
  `tanggal_lahir` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `storage_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nik` (`nik`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ktp`
--

LOCK TABLES `ktp` WRITE;
/*!40000 ALTER TABLE `ktp` DISABLE KEYS */;
INSERT INTO `ktp` VALUES (2,'3302918282391203','dita','2000-03-20 17:00:00','2024-09-15 07:10:08','2024-09-15 07:10:08',NULL),(4,'330291828239123','dita','2000-03-20 17:00:00','2024-09-18 00:42:42','2024-09-18 00:42:42',NULL),(5,'3671112209020005','MUHAMMAD ALTHAAF ABQARY','2002-09-22 00:00:00','2024-09-24 02:22:53','2024-09-24 02:22:53',NULL),(6,'330291828239120','Battery Elvora','2000-11-12 00:00:00','2024-09-24 04:20:56','2024-09-24 04:20:56',NULL),(7,'3302918282391200','Battery Elvora','2000-11-11 17:00:00','2024-09-24 04:42:46','2024-09-24 04:42:46',NULL),(8,'3671112209020004','MUHAMMAD ALTHAAF ABQARY','2002-09-21 17:00:00','2024-09-24 14:57:11','2024-09-24 14:57:11',NULL);
/*!40000 ALTER TABLE `ktp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rent_transactions`
--

DROP TABLE IF EXISTS `rent_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rent_transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `rent_type_id` int NOT NULL,
  `contract_file` varchar(255) DEFAULT NULL,
  `battery_name` varchar(255) DEFAULT NULL,
  `expiration_date` datetime NOT NULL,
  `shipping_id` int DEFAULT NULL,
  `payment` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `token_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `shipping_id` (`shipping_id`),
  KEY `rent_transaction_ibfk_4` (`rent_type_id`),
  KEY `token_id` (`token_id`),
  CONSTRAINT `rent_transaction_ibfk_4` FOREIGN KEY (`rent_type_id`) REFERENCES `rent_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rent_transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rent_transactions_ibfk_3` FOREIGN KEY (`shipping_id`) REFERENCES `shipping_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `token_id` FOREIGN KEY (`token_id`) REFERENCES `tokens` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rent_transactions`
--

LOCK TABLES `rent_transactions` WRITE;
/*!40000 ALTER TABLE `rent_transactions` DISABLE KEYS */;
INSERT INTO `rent_transactions` VALUES (5,1,1,NULL,NULL,'2027-09-04 12:10:36',NULL,NULL,'unpaid',NULL,'2024-09-19 12:10:36','2024-09-19 12:10:36'),(6,1,1,NULL,NULL,'2027-09-04 12:13:36',NULL,NULL,'unpaid',NULL,'2024-09-19 12:13:36','2024-09-19 12:13:36'),(7,1,1,NULL,NULL,'2027-09-04 12:14:46',NULL,NULL,'unpaid',NULL,'2024-09-19 12:14:46','2024-09-19 12:14:46'),(8,1,1,NULL,NULL,'2027-09-04 12:18:50',NULL,NULL,'unpaid',NULL,'2024-09-19 12:18:50','2024-09-19 12:18:50'),(9,1,1,NULL,NULL,'2027-09-04 12:19:44',NULL,NULL,'unpaid',NULL,'2024-09-19 12:19:44','2024-09-19 12:19:44'),(10,1,1,NULL,NULL,'2027-09-04 12:20:25',NULL,NULL,'unpaid',NULL,'2024-09-19 12:20:25','2024-09-19 12:20:25'),(11,1,1,NULL,NULL,'2027-09-04 12:23:04',NULL,NULL,'unpaid',NULL,'2024-09-19 12:23:04','2024-09-19 12:23:04'),(12,1,1,NULL,NULL,'2027-09-04 13:43:07',NULL,NULL,'unpaid',NULL,'2024-09-19 13:43:07','2024-09-19 13:43:07'),(13,1,1,NULL,NULL,'2027-09-04 13:44:39',NULL,NULL,'unpaid',NULL,'2024-09-19 13:44:39','2024-09-19 13:44:39'),(14,1,1,NULL,NULL,'2027-09-04 13:59:27',4,NULL,'unpaid',NULL,'2024-09-19 13:59:27','2024-09-19 13:59:27'),(15,1,1,NULL,NULL,'2027-09-04 15:14:08',4,NULL,'unpaid',1,'2024-09-19 15:14:08','2024-09-21 15:51:35'),(16,1,2,NULL,NULL,'2028-01-05 02:27:50',4,NULL,'unpaid',NULL,'2024-09-22 02:27:50','2024-09-22 02:27:50'),(17,1,2,NULL,NULL,'2028-01-05 02:32:08',4,NULL,'unpaid',NULL,'2024-09-22 02:32:08','2024-09-22 02:32:08'),(18,1,2,NULL,'EV BATTERY','2028-01-05 02:34:43',4,'BCA','Paid Off',3,'2024-09-22 02:34:43','2024-09-23 15:59:47'),(19,1,2,NULL,'72V 40Ah Battery','2028-01-06 06:42:45',4,NULL,'Waiting Payment',NULL,'2024-09-23 06:42:45','2024-09-23 06:42:45'),(20,1,2,NULL,'72V 40Ah Battery','2028-01-06 08:04:19',4,NULL,'Waiting Payment',NULL,'2024-09-23 08:04:19','2024-09-23 08:04:19'),(21,1,2,NULL,'72V 40Ah Battery','2028-01-06 14:01:37',4,NULL,'Waiting Payment',NULL,'2024-09-23 14:01:37','2024-09-23 14:01:37'),(22,1,2,NULL,'72V 40Ah Battery','2028-01-06 14:02:41',4,NULL,'Waiting Payment',NULL,'2024-09-23 14:02:41','2024-09-23 14:02:41'),(23,1,2,NULL,'72V 40Ah Battery','2028-01-06 15:28:02',4,NULL,'Waiting Payment',NULL,'2024-09-23 15:28:02','2024-09-23 15:28:02'),(24,16,2,NULL,'72V 40Ah Battery','2028-01-07 02:23:27',NULL,'BCA','Paid Off',4,'2024-09-24 02:23:28','2024-09-24 02:24:57'),(25,18,2,NULL,'72V 40Ah Battery','2028-01-07 06:43:47',NULL,'BCA','Paid Off',5,'2024-09-24 06:43:47','2024-09-24 06:44:12'),(26,18,2,NULL,'72V 40Ah Battery','2028-01-07 10:55:30',NULL,'BCA','Active',6,'2024-09-24 10:55:30','2024-09-24 11:15:56'),(27,18,2,NULL,'72V 40Ah Battery','2028-01-07 14:05:40',NULL,'BCA','Active',7,'2024-09-24 14:05:40','2024-09-24 14:06:10'),(28,23,2,NULL,'72V 40Ah Battery','2028-01-07 15:13:51',8,'BCA','Active',9,'2024-09-24 15:13:51','2024-09-24 15:18:49'),(29,18,2,NULL,'72V 40Ah Battery','2028-01-07 15:15:41',NULL,'BCA','Active',8,'2024-09-24 15:15:41','2024-09-24 15:16:42');
/*!40000 ALTER TABLE `rent_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rent_types`
--

DROP TABLE IF EXISTS `rent_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rent_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rent_period` int NOT NULL,
  `capacity` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rent_types`
--

LOCK TABLES `rent_types` WRITE;
/*!40000 ALTER TABLE `rent_types` DISABLE KEYS */;
INSERT INTO `rent_types` VALUES (1,36,'72V 20Ah Battery',250000,'2024-09-09 06:44:15','2024-09-20 18:24:02'),(2,40,'72V 40Ah Battery',400000,'2024-09-09 06:44:51','2024-09-09 06:44:51'),(4,50,'72V 60Ah Battery',700000,'2024-09-09 08:08:06','2024-09-09 08:08:06');
/*!40000 ALTER TABLE `rent_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_details`
--

DROP TABLE IF EXISTS `shipping_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `street_name` varchar(255) NOT NULL,
  `village` varchar(255) NOT NULL,
  `full_address` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `shipping_detail_fk` (`user_id`),
  CONSTRAINT `shipping_detail_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_details`
--

LOCK TABLES `shipping_details` WRITE;
/*!40000 ALTER TABLE `shipping_details` DISABLE KEYS */;
INSERT INTO `shipping_details` VALUES (2,NULL,'dita','6281312345678','Jl Jenderal Soedirman','Kenanga','RT 05 RW 01, Mandiraja, Jawa Tengah','2024-09-15 04:23:05','2024-09-15 04:23:05'),(3,NULL,'dita','6281312345678','Jl Jenderal Soedirman','Kenanga','RT 05 RW 01, Mandiraja, Jawa Tengah','2024-09-19 13:31:04','2024-09-19 13:31:04'),(4,1,'dita','6281312345678','Jl Jenderal Soedirman','Kenanga','RT 05 RW 01, Mandiraja, Jawa Tengah','2024-09-19 13:31:58','2024-09-19 13:31:58'),(5,1,'Althaaf','085875814528','Duta Bintato','Nusa Dua','Pinang, Kota Tangerang, Bangen, 15144','2024-09-23 06:14:08','2024-09-23 06:14:08'),(6,1,'dita','6281312345678','Jl Jenderal Soedirman','Kenanga','RT 05 RW 01, Mandiraja, Jawa Tengah','2024-09-23 07:52:11','2024-09-23 07:52:11'),(7,1,'dita','6281312345678','Jl DI Pandjaitan','Kenanga','RT 05 RW 01, Mandiraja, Jawa Tengah','2024-09-23 08:23:26','2024-09-23 08:23:26'),(8,23,'TaftaBoy','85875814555','RT.001/RW.009','Nusa Dua','Perumahan Duta Bintaro (Cluster Nusa dua Blok F3 No.10, RT.001/RW.009, Kunciran, Kec. Pinang, Kota Tangerang, Banten 15144','2024-09-24 15:00:30','2024-09-24 15:00:30');
/*!40000 ALTER TABLE `shipping_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,'0249621225','used','2024-09-21 15:58:23','2024-09-21 15:58:28'),(2,'4633368230','used','2024-09-21 15:58:23','2024-09-22 02:35:19'),(3,'2417977780','used','2024-09-21 15:58:23','2024-09-23 15:59:47'),(4,'8189784519','used','2024-09-21 15:58:23','2024-09-24 02:24:57'),(5,'3694989563','used','2024-09-21 15:58:23','2024-09-24 06:44:12'),(6,'3905594566','used','2024-09-21 15:58:23','2024-09-24 10:55:46'),(7,'8443004450','used','2024-09-21 15:58:23','2024-09-24 14:05:57'),(8,'0498238858','used','2024-09-21 15:58:23','2024-09-24 15:15:56'),(9,'7162181248','used','2024-09-21 15:58:23','2024-09-24 15:18:26'),(10,'4316189972','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(11,'0094406427','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(12,'7523462527','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(13,'7334093663','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(14,'4100081039','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(15,'8498124516','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(16,'0190379768','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(17,'5457525602','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(18,'6716489015','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(19,'7209868577','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(20,'5899876147','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(21,'7869775311','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(22,'1649248424','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(23,'4636916494','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(24,'8236837506','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(25,'7273438356','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(26,'1656679568','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(27,'6463083081','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(28,'7345377008','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(29,'7337636106','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(30,'4652049815','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(31,'1247341065','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(32,'2280556189','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(33,'7660758055','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(34,'1462122017','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(35,'4328336226','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(36,'7255315386','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(37,'3291568563','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(38,'4691896964','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(39,'3584779439','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(40,'3848206609','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(41,'8486695036','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(42,'0888855663','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(43,'8984193512','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(44,'2254400879','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(45,'4319424167','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(46,'4833918507','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(47,'1211320339','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(48,'1554846485','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(49,'4140271715','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(50,'6036819430','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(51,'7763282309','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(52,'0705953567','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(53,'0239921212','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(54,'9081745668','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(55,'4688965012','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(56,'6199588362','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(57,'6931047082','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(58,'6056470634','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(59,'9489212231','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(60,'9276649560','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(61,'7915611414','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(62,'1748108697','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(63,'4993709553','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(64,'9724221983','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(65,'3639981563','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(66,'9027242175','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(67,'4216266492','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(68,'3999606244','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(69,'7349232050','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(70,'4747341829','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(71,'1689013300','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(72,'4203041320','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(73,'5948167011','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(74,'7131711400','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(75,'7814056275','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(76,'7675147482','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(77,'4933568895','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(78,'1642402337','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(79,'3411305307','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(80,'2129319833','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(81,'0412683552','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(82,'5675458568','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(83,'7139242493','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(84,'8669837069','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(85,'1931458173','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(86,'3647779965','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(87,'2444525614','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(88,'1279288484','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(89,'9062865887','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(90,'1476464291','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(91,'0193724101','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(92,'6539227940','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(93,'2114967705','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(94,'0957155014','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(95,'8440872261','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(96,'9332896572','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(97,'1341866386','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(98,'8710642521','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(99,'9527613753','unused','2024-09-21 15:58:23','2024-09-21 15:58:23'),(100,'1506141509','unused','2024-09-21 15:58:23','2024-09-21 15:58:23');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `otp_code` varchar(255) DEFAULT NULL,
  `otp_verify` tinyint(1) DEFAULT '0',
  `ktp_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `ktp_id` (`ktp_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`ktp_id`) REFERENCES `ktp` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ditamay2@gmail.com','dita',NULL,'user','$2a$10$qfCrZdnlX27CTQNHRSEOqOasJfQlGnYTLdDmwyTQoeD8Qnqs7d3fm','771179',1,4,'2024-09-09 05:04:33','2024-09-23 14:49:23'),(11,'diahmartina16@gmail.com','tina',NULL,'user',NULL,'710776',0,NULL,'2024-09-15 05:13:54','2024-09-15 05:13:54'),(12,'test123@gmail.com','altaf',NULL,'user',NULL,'120145',0,NULL,'2024-09-21 22:25:57','2024-09-21 22:25:57'),(16,'taftaraharjo@gmail.com','Muhammad Althaaf Abqary',NULL,'user','$2a$10$RTfew.Xq2fbWeWz2L9W01O8C43dzFRx1bEyuurdAGYVSW6kAUuKVe','216952',1,5,'2024-09-22 12:11:52','2024-09-24 02:22:53'),(18,'batteryelvora@gmail.com','Battery Elvora',NULL,'user','$2a$10$rHH4xR9nD74GvBP2boPt9.IuOkFzpyrUCzvk.j3X63FM0AB7daRFW','669818',1,7,'2024-09-24 04:18:49','2024-09-24 04:42:46'),(19,'susisetia542@gmail.com','Susi Setianingsih',NULL,'user',NULL,'203488',0,NULL,'2024-09-24 08:33:07','2024-09-24 08:33:07'),(21,'susi.setianingsih@mhs.unsoed.ac.id','Susi Setianingsih',NULL,'user',NULL,'940440',0,NULL,'2024-09-24 08:58:54','2024-09-24 08:58:54'),(22,'ssetiaa4523@gmail.com','susi',NULL,'user',NULL,'654879',1,NULL,'2024-09-24 13:35:28','2024-09-24 13:36:06'),(23,'abqarymalthaaf@gmail.com','Tafta Abqary',NULL,'user','$2a$10$h34UWGhfcp/g5wktpeKArOjO.MI5y/ZtrkoKlC3GSpvKTU0LaviqK','630005',1,8,'2024-09-24 14:06:23','2024-09-24 14:57:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-24 16:27:27

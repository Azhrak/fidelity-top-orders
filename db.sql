-- Dumping database structure for fidelity
CREATE DATABASE IF NOT EXISTS `fidelity` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `fidelity`;

-- Dumping structure for table fidelity.fidelity_orders_top30
CREATE TABLE IF NOT EXISTS `fidelity_orders_top30` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `rank` int(2) unsigned NOT NULL,
  `symbol` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `priceChange` decimal(10,4) NOT NULL,
  `priceChangePercentage` decimal(10,4) NOT NULL,
  `buys` int(10) unsigned NOT NULL,
  `sells` int(10) unsigned NOT NULL,
  `buysPercentage` int(10) unsigned NOT NULL,
  `sellsPercentage` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `unique_symbol_date` (`date`,`symbol`),
  KEY `index_symbol` (`symbol`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8mb4_unicode_ci;
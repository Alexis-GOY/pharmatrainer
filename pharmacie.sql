-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le :  mar. 25 fév. 2020 à 11:26
-- Version du serveur :  8.0.18
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pharmacie`
--

-- --------------------------------------------------------

--
-- Structure de la table `classe`
--

DROP TABLE IF EXISTS `classe`;
CREATE TABLE IF NOT EXISTS `classe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `classe`
--

INSERT INTO `classe` (`id`, `nom`) VALUES
(6, 'anti-infectieux'),
(7, 'antiviraux'),
(8, 'virus de la grippe'),
(9, 'hépatite virales'),
(10, 'analogues nucléosidiques'),
(11, 'analogues nucléotidiques'),
(12, 'inhibiteur NS3/A4 DU VHC'),
(13, 'inhibiteur NS5A DU VHC'),
(14, 'interférons'),
(15, 'autres'),
(16, 'herpès'),
(17, 'analogues nucléosidiques'),
(18, 'à action directe'),
(19, 'VIH'),
(20, 'inhibiteurs non nucléosidiques de la TI'),
(21, 'inhibiteurs nucléosidiques de la TI'),
(22, 'inhibiteurs nucléotidiques de la TI'),
(23, 'inhibiteur CYP3A4 « booster »'),
(24, 'inhibiteur de fusion'),
(25, 'antagoniste du récepteur CCR5'),
(26, 'inhibiteur de protéase'),
(27, 'inhibiteur d’intégrase'),
(28, 'Antibiotiques'),
(29, 'pénicillines'),
(30, 'inhibiteurs de β-lactamases'),
(31, 'inhibiteur de la deshydropeptidase'),
(32, 'céphalosporines'),
(33, 'C1G'),
(34, 'C2G'),
(35, 'C5G'),
(36, 'cyclines'),
(37, 'aminosides'),
(38, 'macrolides'),
(39, 'glycopeptide'),
(40, 'polypeptide'),
(41, 'sulfamides antibactériens'),
(42, 'fluoroquinolones'),
(43, 'oxazolidinones'),
(44, 'phenicoles'),
(45, 'Autres'),
(46, 'antituberculeux'),
(47, 'nitrofuranes'),
(48, 'lincosanides ');

-- --------------------------------------------------------

--
-- Structure de la table `dosage_adlt`
--

DROP TABLE IF EXISTS `dosage_adlt`;
CREATE TABLE IF NOT EXISTS `dosage_adlt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_1dose` int(11) DEFAULT NULL,
  `id_24h` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_adlt_id_1dose` (`id_1dose`),
  KEY `fk_adlt_id_24h` (`id_24h`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `dosage_enf`
--

DROP TABLE IF EXISTS `dosage_enf`;
CREATE TABLE IF NOT EXISTS `dosage_enf` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `voie` int(11) DEFAULT NULL,
  `age_min` int(11) DEFAULT NULL,
  `age_max` int(11) DEFAULT NULL,
  `id_1dose` int(11) DEFAULT NULL,
  `id_24h` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_enf_id_1dose` (`id_1dose`),
  KEY `fk_enf_id_24h` (`id_24h`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `dose`
--

DROP TABLE IF EXISTS `dose`;
CREATE TABLE IF NOT EXISTS `dose` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qte` int(11) DEFAULT NULL,
  `unite` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hierarchie_classe`
--

DROP TABLE IF EXISTS `hierarchie_classe`;
CREATE TABLE IF NOT EXISTS `hierarchie_classe` (
  `id_upper` int(11) NOT NULL,
  `id_lower` int(11) NOT NULL,
  PRIMARY KEY (`id_upper`,`id_lower`) USING BTREE,
  KEY `fk_id_hier_lower` (`id_lower`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `hierarchie_classe`
--

INSERT INTO `hierarchie_classe` (`id_upper`, `id_lower`) VALUES
(6, 7),
(7, 8),
(7, 9),
(9, 10),
(9, 11),
(9, 12),
(9, 13),
(9, 14),
(9, 15),
(7, 16),
(16, 17),
(16, 18),
(19, 20),
(19, 21),
(19, 22),
(19, 23),
(19, 24),
(19, 25),
(19, 26),
(19, 27),
(28, 29),
(28, 30),
(28, 31),
(28, 32),
(32, 33),
(32, 34),
(32, 35),
(28, 36),
(28, 37),
(28, 38),
(28, 39),
(28, 40),
(28, 41),
(28, 42),
(28, 43),
(28, 44),
(28, 45),
(28, 46),
(28, 47),
(28, 48);

-- --------------------------------------------------------

--
-- Structure de la table `liaison_cla_mol`
--

DROP TABLE IF EXISTS `liaison_cla_mol`;
CREATE TABLE IF NOT EXISTS `liaison_cla_mol` (
  `id_mol` int(11) NOT NULL,
  `id_cla` int(11) NOT NULL,
  PRIMARY KEY (`id_cla`,`id_mol`) USING BTREE,
  KEY `fk_id_molecule_cla` (`id_mol`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `liaison_cla_mol`
--

INSERT INTO `liaison_cla_mol` (`id_mol`, `id_cla`) VALUES
(11, 8),
(12, 8),
(13, 8),
(14, 10),
(14, 21),
(15, 10),
(15, 17),
(16, 10),
(17, 10),
(18, 11),
(19, 11),
(19, 22),
(20, 13),
(21, 12),
(22, 12),
(23, 12),
(24, 13),
(25, 13),
(26, 13),
(27, 13),
(28, 13),
(32, 14),
(33, 14),
(34, 14),
(35, 15),
(36, 17),
(38, 17),
(39, 17),
(40, 17),
(41, 17),
(42, 18),
(43, 20),
(44, 20),
(45, 20),
(46, 20),
(47, 20),
(48, 21),
(49, 21),
(51, 21),
(53, 23),
(54, 24),
(55, 25),
(56, 26),
(57, 26),
(58, 26),
(59, 26),
(60, 26),
(61, 26),
(62, 26),
(63, 27),
(64, 27),
(65, 27),
(66, 7),
(67, 29),
(68, 29),
(69, 29),
(70, 29),
(71, 29),
(72, 29),
(73, 29),
(74, 29),
(75, 29),
(76, 29),
(77, 30),
(78, 30),
(79, 30),
(80, 30),
(81, 30),
(82, 30),
(83, 30),
(84, 30),
(85, 31),
(86, 33),
(87, 33),
(88, 33),
(89, 34),
(90, 34),
(91, 34),
(92, 34),
(93, 34),
(94, 34),
(95, 34),
(96, 34),
(97, 34),
(98, 34),
(99, 35),
(100, 35),
(101, 35),
(102, 36),
(103, 36),
(104, 36),
(105, 36),
(106, 36),
(107, 36),
(108, 36),
(109, 36),
(110, 36),
(111, 37),
(112, 37),
(113, 37),
(114, 37),
(115, 37),
(116, 38),
(117, 38),
(118, 38),
(119, 38),
(120, 38),
(121, 38),
(122, 38),
(123, 38),
(124, 39),
(125, 39),
(126, 39),
(127, 40),
(128, 40),
(129, 41),
(130, 41),
(131, 41),
(132, 41),
(133, 42),
(134, 42),
(135, 42),
(136, 42),
(137, 42),
(138, 42),
(139, 42),
(140, 42),
(141, 43),
(142, 43),
(143, 44),
(144, 45),
(145, 45),
(146, 46),
(147, 46),
(148, 46),
(149, 46),
(150, 46),
(151, 47),
(152, 47),
(153, 48),
(154, 48);

-- --------------------------------------------------------

--
-- Structure de la table `liaison_prop_mol`
--

DROP TABLE IF EXISTS `liaison_prop_mol`;
CREATE TABLE IF NOT EXISTS `liaison_prop_mol` (
  `id_mol` int(11) NOT NULL,
  `id_prop` int(11) NOT NULL,
  PRIMARY KEY (`id_prop`,`id_mol`),
  KEY `fk_id_molecule_prop` (`id_mol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `liaison_prop_mol`
--

INSERT INTO `liaison_prop_mol` (`id_mol`, `id_prop`) VALUES
(11, 19),
(18, 14),
(19, 14),
(26, 7),
(36, 14),
(39, 14),
(40, 14),
(42, 14),
(44, 6),
(53, 16),
(61, 16),
(63, 7),
(64, 7),
(89, 17),
(102, 7),
(103, 7),
(104, 7),
(105, 7),
(106, 7),
(107, 7),
(108, 7),
(109, 7),
(110, 7),
(111, 14),
(111, 15),
(112, 14),
(112, 15),
(113, 14),
(113, 15),
(114, 14),
(114, 15),
(117, 16),
(118, 10),
(118, 11),
(118, 16),
(121, 10),
(121, 11),
(125, 14),
(125, 15),
(126, 14),
(126, 15),
(128, 14),
(129, 13),
(130, 13),
(132, 13),
(133, 7),
(133, 9),
(134, 9),
(135, 7),
(135, 9),
(136, 9),
(137, 7),
(137, 9),
(137, 10),
(137, 11),
(138, 7),
(138, 9),
(139, 9),
(140, 7),
(142, 8),
(146, 7),
(147, 7),
(149, 6),
(150, 6),
(153, 7),
(154, 7);

-- --------------------------------------------------------

--
-- Structure de la table `molecule`
--

DROP TABLE IF EXISTS `molecule`;
CREATE TABLE IF NOT EXISTS `molecule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dci` varchar(100) DEFAULT NULL,
  `formuledcn` varchar(100) DEFAULT NULL,
  `difficulte` int(11) DEFAULT NULL,
  `id_dosage_adlt` int(11) DEFAULT NULL,
  `id_dosage_enf` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_dosage_adlt` (`id_dosage_adlt`),
  KEY `fk_id_dosage_enf` (`id_dosage_enf`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `molecule`
--

INSERT INTO `molecule` (`id`, `dci`, `formuledcn`, `difficulte`, `id_dosage_adlt`, `id_dosage_enf`) VALUES
(11, 'amantadine', NULL, 1, NULL, NULL),
(12, 'oseltamivir', NULL, NULL, NULL, NULL),
(13, 'zanamivir', NULL, NULL, NULL, NULL),
(14, 'lamivudine', NULL, NULL, NULL, NULL),
(15, 'entécavir', NULL, NULL, NULL, NULL),
(16, 'telbivudine', NULL, NULL, NULL, NULL),
(17, 'ribavirine', NULL, NULL, NULL, NULL),
(18, 'adefovir', NULL, NULL, NULL, NULL),
(19, 'ténofovir', NULL, NULL, NULL, NULL),
(20, 'sofosbuvir', NULL, NULL, NULL, NULL),
(21, 'glécaprévir', NULL, NULL, NULL, NULL),
(22, 'grazoprévir', NULL, NULL, NULL, NULL),
(23, 'voxilaprévir', NULL, NULL, NULL, NULL),
(24, 'daclatasvir', NULL, NULL, NULL, NULL),
(25, 'elbasvir', NULL, NULL, NULL, NULL),
(26, 'lédipasvir', NULL, NULL, NULL, NULL),
(27, 'pibrentasvir', NULL, NULL, NULL, NULL),
(28, 'velpatasvir', NULL, NULL, NULL, NULL),
(32, 'interférons alpha-2a', NULL, NULL, NULL, NULL),
(33, 'interférons alpha-2b', NULL, NULL, NULL, NULL),
(34, 'peginterféron alpha 2a', NULL, NULL, NULL, NULL),
(35, 'letermovir', NULL, NULL, NULL, NULL),
(36, 'aciclovir', NULL, NULL, NULL, NULL),
(38, 'famciclovir', NULL, NULL, NULL, NULL),
(39, 'valaciclovir', NULL, NULL, NULL, NULL),
(40, 'valganciclovir', NULL, NULL, NULL, NULL),
(41, 'trifluridine', NULL, NULL, NULL, NULL),
(42, 'foscarnet', NULL, NULL, NULL, NULL),
(43, 'doravirine', NULL, NULL, NULL, NULL),
(44, 'efavirenz', NULL, NULL, NULL, NULL),
(45, 'nevirapine', NULL, NULL, NULL, NULL),
(46, 'rilpivirine', NULL, NULL, NULL, NULL),
(47, 'etravirine', NULL, NULL, NULL, NULL),
(48, 'abacavir', NULL, NULL, NULL, NULL),
(49, 'emtricitabine', NULL, NULL, NULL, NULL),
(51, 'zidovudine', NULL, NULL, NULL, NULL),
(53, 'cobicistat', NULL, NULL, NULL, NULL),
(54, 'enfuvirtide', NULL, NULL, NULL, NULL),
(55, 'maraviroc', NULL, NULL, NULL, NULL),
(56, 'atazanavir', NULL, NULL, NULL, NULL),
(57, 'darunavir', NULL, NULL, NULL, NULL),
(58, 'fosamprénavir', NULL, NULL, NULL, NULL),
(59, 'indinavir', NULL, NULL, NULL, NULL),
(60, 'lopinavir', NULL, NULL, NULL, NULL),
(61, 'ritonavir', NULL, NULL, NULL, NULL),
(62, 'tipranavir', NULL, NULL, NULL, NULL),
(63, 'dolutégravir', NULL, NULL, NULL, NULL),
(64, 'raltégravir', NULL, NULL, NULL, NULL),
(65, 'elitégravir', NULL, NULL, NULL, NULL),
(66, 'podophyllotoxine', NULL, NULL, NULL, NULL),
(67, 'amoxicilline', NULL, NULL, NULL, NULL),
(68, 'ampicilline', NULL, NULL, NULL, NULL),
(69, 'cloxacilline', NULL, NULL, NULL, NULL),
(70, 'oxacilline', NULL, NULL, NULL, NULL),
(71, 'benzylpénicilline', NULL, NULL, NULL, NULL),
(72, 'phénoxyméthylpénicilline', NULL, NULL, NULL, NULL),
(73, 'piperacilline', NULL, NULL, NULL, NULL),
(74, 'pivmécillinam', NULL, NULL, NULL, NULL),
(75, 'témocilline', NULL, NULL, NULL, NULL),
(76, 'ticarcilline', NULL, NULL, NULL, NULL),
(77, 'acide clavulanique', NULL, NULL, NULL, NULL),
(78, 'sulbactam', NULL, NULL, NULL, NULL),
(79, 'tazobactam', NULL, NULL, NULL, NULL),
(80, 'avibactam', NULL, NULL, NULL, NULL),
(81, 'aztréonam', NULL, NULL, NULL, NULL),
(82, 'ertapénem', NULL, NULL, NULL, NULL),
(83, 'imipénem', NULL, NULL, NULL, NULL),
(84, 'meropénem', NULL, NULL, NULL, NULL),
(85, 'cilastatine', NULL, NULL, NULL, NULL),
(86, 'Céfaclor', NULL, NULL, NULL, NULL),
(87, 'Céfalexine', NULL, NULL, NULL, NULL),
(88, 'Céfazoline', NULL, NULL, NULL, NULL),
(89, 'Céfamandole', NULL, NULL, NULL, NULL),
(90, 'Céfoxitine', NULL, NULL, NULL, NULL),
(91, 'Céfiroxime', NULL, NULL, NULL, NULL),
(92, 'Céfixime', NULL, NULL, NULL, NULL),
(93, 'Céfidercol', NULL, NULL, NULL, NULL),
(94, 'Céfotaxime', NULL, NULL, NULL, NULL),
(95, 'Céfpodoxime', NULL, NULL, NULL, NULL),
(96, 'Céftazidine', NULL, NULL, NULL, NULL),
(97, 'Céftriaxone', NULL, NULL, NULL, NULL),
(98, 'Céfépime', NULL, NULL, NULL, NULL),
(99, 'Céftolozane', NULL, NULL, NULL, NULL),
(100, 'Céftaroline', NULL, NULL, NULL, NULL),
(101, 'Céftobiprole', NULL, NULL, NULL, NULL),
(102, 'chlortétracycline', NULL, NULL, NULL, NULL),
(103, 'déméclocycline', NULL, NULL, NULL, NULL),
(104, 'doxycycline', NULL, NULL, NULL, NULL),
(105, 'lymécycline', NULL, NULL, NULL, NULL),
(106, 'méthylènecycline', NULL, NULL, NULL, NULL),
(107, 'minocycline', NULL, NULL, NULL, NULL),
(108, 'oxytétracycline', NULL, NULL, NULL, NULL),
(109, 'tétracycline', NULL, NULL, NULL, NULL),
(110, 'tigecycline', NULL, NULL, NULL, NULL),
(111, 'amikacine', NULL, NULL, NULL, NULL),
(112, 'gentamicine', NULL, NULL, NULL, NULL),
(113, 'streptomycine', NULL, NULL, NULL, NULL),
(114, 'tobramycine', NULL, NULL, NULL, NULL),
(115, 'framycétine', NULL, NULL, NULL, NULL),
(116, 'azithromycine', NULL, NULL, NULL, NULL),
(117, 'clarithromycine', NULL, NULL, NULL, NULL),
(118, 'érythromycine', NULL, NULL, NULL, NULL),
(119, 'josamycine', NULL, NULL, NULL, NULL),
(120, 'roxithromycine', NULL, NULL, NULL, NULL),
(121, 'spiramycine', NULL, NULL, NULL, NULL),
(122, 'fidaxomicine', NULL, NULL, NULL, NULL),
(123, 'pristinamycine', NULL, NULL, NULL, NULL),
(124, 'Dalbavancine', NULL, NULL, NULL, NULL),
(125, 'Teicoplanine', NULL, NULL, NULL, NULL),
(126, 'Vancomycine', NULL, NULL, NULL, NULL),
(127, 'Daptomycine', NULL, NULL, NULL, NULL),
(128, 'colistine', NULL, NULL, NULL, NULL),
(129, 'sulfadiazine', NULL, NULL, NULL, NULL),
(130, 'sulfadoxine', NULL, NULL, NULL, NULL),
(131, 'sulfaméthizole', NULL, NULL, NULL, NULL),
(132, 'sulfaméthoxazole', NULL, NULL, NULL, NULL),
(133, 'ciprofloxacine', NULL, NULL, NULL, NULL),
(134, 'énoxacine', NULL, NULL, NULL, NULL),
(135, 'levofloxacine', NULL, NULL, NULL, NULL),
(136, 'loméfloxacine', NULL, NULL, NULL, NULL),
(137, 'moxifloxacine', NULL, NULL, NULL, NULL),
(138, 'norfloxacine', NULL, NULL, NULL, NULL),
(139, 'ofloxacine', NULL, NULL, NULL, NULL),
(140, 'pefloxacine', NULL, NULL, NULL, NULL),
(141, 'tédizolide', NULL, NULL, NULL, NULL),
(142, 'linézolide', NULL, NULL, NULL, NULL),
(143, 'Thiamphénicol', NULL, NULL, NULL, NULL),
(144, 'fosfomycine', NULL, NULL, NULL, NULL),
(145, 'acide fusidique', NULL, NULL, NULL, NULL),
(146, 'éthambutol', NULL, NULL, NULL, NULL),
(147, 'isoniazide', NULL, NULL, NULL, NULL),
(148, 'pyrazinamide', NULL, NULL, NULL, NULL),
(149, 'rifabutine', NULL, NULL, NULL, NULL),
(150, 'rifampicine', NULL, NULL, NULL, NULL),
(151, 'nifuroxazide', NULL, NULL, NULL, NULL),
(152, 'nitrofurantoïne', NULL, NULL, NULL, NULL),
(153, 'clindamycine', NULL, NULL, NULL, NULL),
(154, 'lincomycine', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `propriete`
--

DROP TABLE IF EXISTS `propriete`;
CREATE TABLE IF NOT EXISTS `propriete` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `propriete`
--

INSERT INTO `propriete` (`id`, `nom`) VALUES
(6, 'inducteurs enzymatiques'),
(7, 'substances à absorption réduite par les topiques gastro-intestinaux, antiacides et adsorbants'),
(8, 'à l\'origine d\'un syndrome sérotoninergique'),
(9, 'médicaments abaissant le seuil épileptogène'),
(10, 'substances susceptibles de donner des torsades de pointes'),
(11, 'torsadogènes'),
(13, 'médicaments méthémoglobinisants'),
(14, 'médicaments néphrotoxiques'),
(15, 'médicaments ototoxiques'),
(16, 'inhibiteurs puissants du CYP3A4'),
(17, 'antabuse'),
(19, 'médicaments à l\'origine d\'une hypotension orthostatique');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `dosage_adlt`
--
ALTER TABLE `dosage_adlt`
  ADD CONSTRAINT `fk_adlt_id_1dose` FOREIGN KEY (`id_1dose`) REFERENCES `dose` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_adlt_id_24h` FOREIGN KEY (`id_24h`) REFERENCES `dose` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `dosage_enf`
--
ALTER TABLE `dosage_enf`
  ADD CONSTRAINT `fk_enf_id_1dose` FOREIGN KEY (`id_1dose`) REFERENCES `dose` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_enf_id_24h` FOREIGN KEY (`id_24h`) REFERENCES `dose` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `hierarchie_classe`
--
ALTER TABLE `hierarchie_classe`
  ADD CONSTRAINT `fk_id_hier_lower` FOREIGN KEY (`id_lower`) REFERENCES `classe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_hier_up` FOREIGN KEY (`id_upper`) REFERENCES `classe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `liaison_cla_mol`
--
ALTER TABLE `liaison_cla_mol`
  ADD CONSTRAINT `fk_id_classe` FOREIGN KEY (`id_cla`) REFERENCES `classe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_molecule` FOREIGN KEY (`id_mol`) REFERENCES `molecule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `liaison_prop_mol`
--
ALTER TABLE `liaison_prop_mol`
  ADD CONSTRAINT `fk_id_molecule_prop` FOREIGN KEY (`id_mol`) REFERENCES `molecule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_propriete` FOREIGN KEY (`id_prop`) REFERENCES `propriete` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `molecule`
--
ALTER TABLE `molecule`
  ADD CONSTRAINT `fk_id_dosage_adlt` FOREIGN KEY (`id_dosage_adlt`) REFERENCES `dosage_adlt` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_dosage_enf` FOREIGN KEY (`id_dosage_enf`) REFERENCES `dosage_enf` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

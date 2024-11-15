-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-11-2024 a las 03:25:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `caso_semestral`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatura`
--

CREATE TABLE `asignatura` (
  `sigla` varchar(8) NOT NULL,
  `seccion` varchar(8) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `alumno` int(8) DEFAULT NULL,
  `profesor` int(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignatura`
--

INSERT INTO `asignatura` (`sigla`, `seccion`, `nombre`, `alumno`, `profesor`) VALUES
('PGY4121', '012D', 'Programacion de aplicaciones moviles', 20390785, 18784135);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `alumno` int(8) DEFAULT NULL,
  `sigla` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `rut` int(8) NOT NULL,
  `dv_rut` char(1) NOT NULL,
  `pnombre` varchar(20) NOT NULL,
  `snombre` varchar(20) NOT NULL,
  `apaterno` varchar(20) NOT NULL,
  `amaterno` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`rut`, `dv_rut`, `pnombre`, `snombre`, `apaterno`, `amaterno`, `email`, `password`) VALUES
(18784135, 'k', 'Pluto', 'Andres', 'Perez', 'Sanchez', 'plu.perezs@profesor.duoc.cl', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `rut` int(8) NOT NULL,
  `dv_rut` char(1) NOT NULL,
  `pnombre` varchar(20) NOT NULL,
  `snombre` varchar(20) NOT NULL,
  `apaterno` varchar(20) NOT NULL,
  `amaterno` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`rut`, `dv_rut`, `pnombre`, `snombre`, `apaterno`, `amaterno`, `email`, `password`) VALUES
(20390785, '0', 'Javier', 'Ignacio', 'Vargas', 'Vivar', 'javi.vargasv@duocuc.cl', 'akageynaru7854');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignatura`
--
ALTER TABLE `asignatura`
  ADD PRIMARY KEY (`sigla`),
  ADD KEY `alumno` (`alumno`),
  ADD KEY `profesor` (`profesor`);

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD KEY `alumno` (`alumno`),
  ADD KEY `sigla` (`sigla`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`rut`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`rut`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignatura`
--
ALTER TABLE `asignatura`
  ADD CONSTRAINT `asignatura_ibfk_1` FOREIGN KEY (`alumno`) REFERENCES `usuario` (`rut`),
  ADD CONSTRAINT `asignatura_ibfk_2` FOREIGN KEY (`profesor`) REFERENCES `profesor` (`rut`);

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `asistencia_ibfk_1` FOREIGN KEY (`alumno`) REFERENCES `usuario` (`rut`),
  ADD CONSTRAINT `asistencia_ibfk_2` FOREIGN KEY (`sigla`) REFERENCES `asignatura` (`sigla`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

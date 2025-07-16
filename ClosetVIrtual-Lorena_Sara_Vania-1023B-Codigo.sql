-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema closetVirtual
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema closetVirtual
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `closetVirtual` DEFAULT CHARACTER SET utf8 ;
USE `closetVirtual` ;

-- -----------------------------------------------------
-- Table `closetVirtual`.`closet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `closetVirtual`.`closet` (
  `idcloset` INT NOT NULL AUTO_INCREMENT,
  `nome_closet` VARCHAR(50) NOT NULL,
  `proprietario` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idcloset`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `closetVirtual`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `closetVirtual`.`categoria` (
  `idcategoria` INT NOT NULL AUTO_INCREMENT,
  `nome_categoria` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `closet_idcloset` INT NOT NULL,
  PRIMARY KEY (`idcategoria`),
  INDEX `fk_categoria_closet_idx` (`closet_idcloset` ASC) VISIBLE,
  CONSTRAINT `fk_categoria_closet`
    FOREIGN KEY (`closet_idcloset`)
    REFERENCES `closetVirtual`.`closet` (`idcloset`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `closetVirtual`.`produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `closetVirtual`.`produto` (
  `idproduto` INT NOT NULL AUTO_INCREMENT,
  `nome_produto` VARCHAR(45) NOT NULL,
  `cor_produto` VARCHAR(45) NOT NULL,
  `closet_idcloset` INT NOT NULL,
  `categoria_idcategoria` INT NOT NULL,
  PRIMARY KEY (`idproduto`),
  INDEX `fk_produto_closet1_idx` (`closet_idcloset` ASC) VISIBLE,
  INDEX `fk_produto_categoria1_idx` (`categoria_idcategoria` ASC) VISIBLE,
  CONSTRAINT `fk_produto_closet1`
    FOREIGN KEY (`closet_idcloset`)
    REFERENCES `closetVirtual`.`closet` (`idcloset`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_produto_categoria1`
    FOREIGN KEY (`categoria_idcategoria`)
    REFERENCES `closetVirtual`.`categoria` (`idcategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
SET foreign_key_checks = 0;


#closet
use closetvirtual;
INSERT INTO `closetvirtual`.`closet` (`idcloset`, `nome_closet`, `proprietario`) VALUES ('1', 'Diva\'s', 'Barbie');
INSERT INTO `closetvirtual`.`closet` (`idcloset`, `nome_closet`, `proprietario`) VALUES ('2', 'PinkFashion', 'Pitchula');
INSERT INTO `closetvirtual`.`closet` (`idcloset`, `nome_closet`, `proprietario`) VALUES ('3', 'BrownTown', 'Bilu');

#exemplos de inserção, edição e exclusão - closet
INSERT INTO `closetvirtual`.`closet` (`idcloset`, `nome_closet`, `proprietario`) VALUES ('5', 'Exemplo', 'De inserir');
UPDATE `closetvirtual`.`closet` SET `proprietario` = 'De editar' WHERE (`idcloset` = '5');
DELETE FROM `closetvirtual`.`closet` WHERE (`idcloset` = '5');

#categoria
INSERT INTO `closetvirtual`.`categoria` (`idcategoria`, `nome_categoria`, `descricao`, `closet_idcloset`) VALUES ('1', 'camiseta', 'parte superior', '2');
INSERT INTO `closetvirtual`.`categoria` (`idcategoria`, `nome_categoria`, `descricao`, `closet_idcloset`) VALUES ('2', 'calça', 'parte inferior', '3');
INSERT INTO `closetvirtual`.`categoria` (`idcategoria`, `nome_categoria`, `descricao`, `closet_idcloset`) VALUES ('3', 'vestido', 'parte única', '1');

#exemplos de inserção, edição e exclusão - categoria
INSERT INTO `closetvirtual`.`categoria` (`idcategoria`, `nome_categoria`, `descricao`, `closet_idcloset`) VALUES ('3', 'Exemplo', 'De inserir');
UPDATE `closetvirtual`.`categoria` SET `descricao` = 'Editar' WHERE (`idcategoria` = '3');
DELETE FROM `closetvirtual`.`categoria` WHERE (`idcategoria` = '3');

#produto
INSERT INTO `closetvirtual`.`produto` (`idproduto`, `nome_produto`, `cor_produto`, `closet_idcloset`, `categoria_idcategoria`) VALUES ('1', 'camisa manga longa', 'rosa', '2', '1');
INSERT INTO `closetvirtual`.`produto` (`idproduto`, `nome_produto`, `cor_produto`, `closet_idcloset`, `categoria_idcategoria`) VALUES ('2', 'calça cargo', 'azul', '3', '2');
INSERT INTO `closetvirtual`.`produto` (`idproduto`, `nome_produto`, `cor_produto`, `closet_idcloset`, `categoria_idcategoria`) VALUES ('3', 'Vestido princesa', 'multicor', '1', '3');

#exemplos de inserção, edição e exclusão - produto
INSERT INTO `closetvirtual`.`produto` (`idproduto`, `nome_produto`, `cor_produto`, `closet_idcloset`, `categoria_idcategoria`) VALUES ('2', 'Exemplo', 'Inserção', '1', '2');
UPDATE `closetvirtual`.`produto` SET `cor_produto` = 'Editar' WHERE (`idproduto` = '2');
DELETE FROM `closetvirtual`.`produto` WHERE (`idproduto` = '2');
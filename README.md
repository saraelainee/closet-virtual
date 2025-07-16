# Closet Virtual

Este é o repositório do projeto "Closet Virtual", desenvolvido como parte das disciplinas de Frameworks I e Banco de dados II. A aplicação permite que os usuários gerenciem seus guarda-roupas virtuais, organizando peças por categorias e produtos.

## 👥 Integrantes

  * Lorena Mascarenhas
  * Sara Duarte
  * Vânia Moreira
## 📋 Índice

  * [Sobre o Projeto](https://www.google.com/search?q=%23-sobre-o-projeto)
  * [✨ Funcionalidades](https://www.google.com/search?q=%23-funcionalidades)
  * [🛠️ Tecnologias Utilizadas](https://www.google.com/search?q=%23-tecnologias-utilizadas)
  * [⚙️ Estrutura do Projeto](https://www.google.com/search?q=%23%EF%B8%8F-estrutura-do-projeto)
  * [🚀 Como Executar](https://www.google.com/search?q=%23-como-executar)
  * [📜 Scripts Disponíveis](https://www.google.com/search?q=%23-scripts-dispon%C3%ADveis)

## 📖 Sobre o Projeto

O **Closet Virtual** é uma aplicação web full-stack que simula um guarda-roupa digital. O objetivo é permitir o cadastro e a organização de peças de vestuário de forma simples e intuitiva. O usuário pode criar diferentes "closets" (guarda-roupas), e dentro de cada um, organizar "produtos" (peças) em diversas "categorias".

O projeto utiliza React para o frontend e Fastify (Node.js) para o backend, comunicando-se com um banco de dados MySQL.

## ✨ Funcionalidades

  * **Gerenciamento de Closets**: Criar, visualizar, editar e remover closets.
  * **Gerenciamento de Categorias**: Criar, visualizar, editar e remover categorias de peças.
  * **Gerenciamento de Produtos**: Adicionar, visualizar, editar e remover produtos (peças de roupa) dentro de um closet e associados a uma categoria.

## 🛠️ Tecnologias Utilizadas

A stack do projeto é baseada em TypeScript e inclui as seguintes tecnologias:

### Frontend

  * **React 19**: Biblioteca para a construção da interface de usuário.
  * **React DOM**: Pacote para a integração do React com o DOM.
  * **React Router DOM**: Para gerenciamento de rotas na aplicação.
  * **Vite**: Ferramenta de build e servidor de desenvolvimento rápido para o frontend.

### Backend

  * **Node.js**: Ambiente de execução para o JavaScript no servidor.
  * **Fastify**: Framework web para o backend, focado em performance.
  * **MySQL2**: Driver para a conexão da aplicação com o banco de dados MySQL.
  * **TSX**: Ferramenta para executar arquivos TypeScript diretamente, usada para rodar o servidor em modo de desenvolvimento.

### Desenvolvimento

  * **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
  * **ESLint**: Ferramenta para linting e padronização do código.

## ⚙️ Estrutura do Projeto

A estrutura do projeto é modular, separando o código-fonte do cliente (frontend) e do servidor (backend), embora eles coexistam no mesmo diretório `/src`.

```
/
├── public/
├── src/
│   ├── assets/             # Imagens, SVGs e outros recursos estáticos
│   ├── components/         # Componentes React reutilizáveis
│   ├── pages/              # Páginas da aplicação (ex: Home, Closet, Produto)
│   ├── main.tsx            # Ponto de entrada da aplicação React
│   └── Server.ts           # Ponto de entrada do servidor backend (API)
├── .eslintrc.cjs
├── index.html              # Template HTML principal
├── package.json            # Dependências e scripts do projeto
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Como Executar

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

  * Node.js (versão 18 ou superior)
  * NPM ou Yarn
  * Um servidor de banco de dados MySQL em execução.

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/saraelainee/closet-virtual.git
    cd closet-virtual
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:**

      * Crie um banco de dados no seu servidor MySQL.
      * Configure as credenciais de acesso ao banco. Geralmente, isso é feito em um arquivo `.env` na raiz do projeto (crie-o se não existir). O arquivo `Server.ts` deverá ser ajustado para ler essas variáveis.

   ```
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

#categoria
INSERT INTO `closetvirtual`.`categoria` (`idcategoria`, `nome_categoria`, `descricao`, `closet_idcloset`) VALUES ('1', 'camiseta', 'parte superior', '2');
INSERT INTO `closetvirtual`.`categoria` (`idcategoria`, `nome_categoria`, `descricao`, `closet_idcloset`) VALUES ('2', 'calça', 'parte inferior', '3');
INSERT INTO `closetvirtual`.`categoria` (`idcategoria`, `nome_categoria`, `descricao`, `closet_idcloset`) VALUES ('3', 'vestido', 'parte única', '1');

#produto
INSERT INTO `closetvirtual`.`produto` (`idproduto`, `nome_produto`, `cor_produto`, `closet_idcloset`, `categoria_idcategoria`) VALUES ('1', 'camisa manga longa', 'rosa', '2', '1');
INSERT INTO `closetvirtual`.`produto` (`idproduto`, `nome_produto`, `cor_produto`, `closet_idcloset`, `categoria_idcategoria`) VALUES ('2', 'calça cargo', 'azul', '3', '2');
INSERT INTO `closetvirtual`.`produto` (`idproduto`, `nome_produto`, `cor_produto`, `closet_idcloset`, `categoria_idcategoria`) VALUES ('3', 'Vestido princesa', 'multicor', '1', '3');

#closet
INSERT INTO `closetvirtual`.`closet` (`idcloset`, `nome_closet`, `proprietario`) VALUES ('5', 'Exemplo', 'De inserir');
UPDATE `closetvirtual`.`closet` SET `proprietario` = 'De editar' WHERE (`idcloset` = '5');
DELETE FROM `closetvirtual`.`closet` WHERE (`idcloset` = '5');

#categoria
INSERT INTO `closetvirtual`.`categoria` (`idcategoria`, `nome_categoria`, `descricao`, `closet_idcloset`) VALUES ('3', 'Exemplo', 'De inserir');
UPDATE `closetvirtual`.`categoria` SET `descricao` = 'Editar' WHERE (`idcategoria` = '3');
DELETE FROM `closetvirtual`.`categoria` WHERE (`idcategoria` = '3');

#produto
INSERT INTO `closetvirtual`.`produto` (`idproduto`, `nome_produto`, `cor_produto`, `closet_idcloset`, `categoria_idcategoria`) VALUES ('2', 'Exemplo', 'Inserção', '1', '2');
UPDATE `closetvirtual`.`produto` SET `cor_produto` = 'Editar' WHERE (`idproduto` = '2');
DELETE FROM `closetvirtual`.`produto` WHERE (`idproduto` = '2');
   ```

4.  **Execute o Servidor (Backend):**
    Abra um terminal e execute o seguinte comando para iniciar a API:

    ```bash
    npm run server
    ```

    O servidor será iniciado e ficará observando alterações no arquivo `src/Server.ts`.

5.  **Execute o Cliente (Frontend):**
    Abra **outro terminal** e execute o comando abaixo para iniciar o ambiente de desenvolvimento do React:

    ```bash
    npm run dev
    ```

    A aplicação estará acessível em `http://localhost:5173` (ou em outra porta indicada no terminal).

## 📜 Scripts Disponíveis

Os seguintes scripts estão definidos no arquivo `package.json`:

  * `npm run dev`: Inicia o servidor de desenvolvimento do Vite com acesso via rede local (`--host`).
  * `npm run build`: Compila os arquivos TypeScript e gera a versão de produção do frontend.
  * `npm run lint`: Executa o ESLint para analisar o código em busca de erros e inconsistências.
  * `npm run preview`: Inicia um servidor local para visualizar a versão de produção (gerada com `npm run build`).
  * `npm run server`: Inicia o servidor backend Fastify usando `tsx` com hot-reload.

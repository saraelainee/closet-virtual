// Home.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importa o componente Link para navegação
import './Home.css'; // Vamos criar um CSS para a Home

function Home() {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Sistema de Gerenciamento de Closets!</h1>
      <p>Selecione uma opção abaixo para começar:</p>

      <div className="home-buttons">
        <Link to="/Container" className="home-button">
          Gerenciar Closets
        </Link>
        <Link to="/Closet" className="home-button">
          Gerenciar Categorias
        </Link>
        <Link to="/Produto" className="home-button">
          Gerenciar Produtos
        </Link>
      </div>

      <p className="home-info">Aqui você pode cadastrar, visualizar e editar seus itens.</p>
    </div>
  );
}

export default Home;
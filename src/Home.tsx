// Home.tsx
import React from 'react';
//import './Home.css'; // O CSS continua o mesmo

// Definimos a interface para as props que Home vai receber
interface HomeProps {
  onNavigate: (page: 'home' | 'closets' | 'categorias' | 'produtos') => void;
}

// O componente Home agora recebe 'onNavigate' como uma prop
function Home({ onNavigate }: HomeProps) {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Sistema de Gerenciamento de Closets!</h1>
      <p>Selecione uma opção abaixo para começar:</p>

      <div className="home-buttons">
        {/* Ao clicar, chamamos a função onNavigate passando a página desejada */}
        <button onClick={() => onNavigate('closets')} className="home-button">
          Gerenciar Closets
        </button>
        <button onClick={() => onNavigate('categorias')} className="home-button">
          Gerenciar Categorias
        </button>
        <button onClick={() => onNavigate('produtos')} className="home-button">
          Gerenciar Produtos
        </button>
      </div>

      <p className="home-info">Aqui você pode cadastrar, visualizar e editar seus itens.</p>
    </div>
  );
}

export default Home;
//import React from 'react';

// Definimos a interface para as props que Home vai receber
interface ContainerProps {
  onNavigate: (page: 'container' | 'closets' | 'categorias' | 'produtos') => void;
}


function Container({ onNavigate }: ContainerProps) { //Props: mecanismo que passa dados de um componente pai para um filho :)
  return (
    <div className="container">
      <h1>Bem-vindo ao seu Closet Virtual!!!</h1>
      <p>Selecione uma opção abaixo para começar:</p>

      <div className="Container-buttons">
        {/* Ao clicar, chamamos a função onNavigate passando a página desejada */}
        <button onClick={() => onNavigate('closets')} className="Container-button">
          Gerenciar Closets
        </button>
        <button onClick={() => onNavigate('categorias')} className="Container-button">
          Gerenciar Categorias
        </button>
        <button onClick={() => onNavigate('produtos')} className="Container-button">
          Gerenciar Produtos
        </button>
      </div>

      <p className="Container-info">Aqui você pode cadastrar, visualizar e editar seus itens.</p>
    </div>
  );
}

export default Container;
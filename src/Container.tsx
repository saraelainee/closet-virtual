//import React from 'react';

// Definimos a interface para as props que Home vai receber
interface ContainerProps {
  onNavigate: (page: 'container' | 'closet' | 'categoria' | 'produto') => void;
}


function Container({ onNavigate }: ContainerProps) { //Props: mecanismo que passa dados de um componente pai para um filho :)
  return (
    <div className="container">
      <h1>Bem-vindo ao seu Closet Virtual!!!</h1>
      <p>Selecione uma opção abaixo para começar:</p>

      <div className="Container-buttons">
        {/* Ao clicar, chamamos a função onNavigate passando a página desejada */}
        <button onClick={() => onNavigate('closet')} className="Container-button">
          Gerenciar Closets
        </button>
        <button onClick={() => onNavigate('categoria')} className="Container-button">
          Gerenciar Categorias
        </button>
        <button onClick={() => onNavigate('produto')} className="Container-button">
          Gerenciar Produtos
        </button>
      </div>

      <p className="Container-info">Aqui você pode cadastrar, visualizar e editar seus itens.</p>
    </div>
  );
}

export default Container;
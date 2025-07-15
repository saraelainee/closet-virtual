// interface GerenciarProps {
//   onNavigate: (page: 'gerenciar' | 'closet' | 'categoria' | 'produto') => void;
// }


// function Gerenciar({ onNavigate }: GerenciarProps) { //Props: mecanismo que passa dados de um componente pai para um filho :)
//   return (
//     <div className="gerenciar">
//       <h1>Bem-vindo ao seu Closet Virtual!!!</h1>
//       <p>Selecione uma opção abaixo para começar:</p>

//       <div className="Gerenciar-buttons">
//         {/* Ao clicar, chamamos a função onNavigate passando a página desejada */}
//         <button onClick={() => onNavigate('closet')} className="Gerenciar-button">
//           Gerenciar Closets
//         </button>
//         <button onClick={() => onNavigate('categoria')} className="Gerenciar-button">
//           Gerenciar Categorias
//         </button>
//         <button onClick={() => onNavigate('produto')} className="Gerenciar-button">
//           Gerenciar Produtos
//         </button>
//       </div>

//       <p className="Gerenciar-info">Aqui você pode cadastrar, visualizar e editar seus itens.</p>
//     </div>
//   );
// }

// export default Gerenciar;
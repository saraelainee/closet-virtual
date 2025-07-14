import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'

import Gerenciar from './Gerenciar.tsx'
import Closets from './Closet.tsx'
import Categorias from './Categoria.tsx'
import Produtos from './Produto.tsx'
import MostraTudo from './mostratudo.tsx'

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from 'react-router-dom'


function ContainerWrapper() {
  const navigate = useNavigate()

  const caminharPagina = (page: 'gerenciar' | 'closet' | 'categoria' | 'produto') => {
    navigate('/' + page)
  }
   // Chamada para mostrar os dados do servidor, pode ser removida se não for necessária
  // Removido <mostratudo /> pois não é um componente React válido

  return <Gerenciar onNavigate={caminharPagina} />
}


const rotas = createBrowserRouter([
  {
    path: '/',
    element: <MostraTudo /> //Wrapper abriga outras funções, componente intermediário que passa o onNavigate
  },
  {
    path: '/closet',
    element: <Closets />
  },
  {
    path: '/categoria',
    element: <Categorias />
  },
  {
    path: '/produto',
    element: <Produtos />
  }
])

// Encaminha de volta 
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>
)

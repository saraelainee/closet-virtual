import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


// import Gerenciar from './Gerenciar.tsx'
import Closets from './Closet.tsx'
import Categorias from './Categoria.tsx'
import Produtos from './Produto.tsx'
import MostraTudo from './mostratudo.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'


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
  },
  // {
  //   path: '/gerenciar',
  //   element: <Gerenciar />, //Wrapper abriga outras funções, componente intermediário que passa o onNavigate
  // }
])

// Encaminha de volta 
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'

import Container from './Container.tsx'
import Closets from './Closet.tsx'
import Categorias from './Categoria.tsx'
import Produtos from './Produto.tsx'

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from 'react-router-dom'

function ContainerWrapper() {
  const navigate = useNavigate()

  const caminharPagina = (page: 'container' | 'closets' | 'categorias' | 'produtos') => {
    navigate('/' + page)
  }

  return <Container onNavigate={caminharPagina} />
}


const rotas = createBrowserRouter([
  {
    path: '/',
    element: <ContainerWrapper /> //Wrapper abriga outras funções, componente intermediário que passa o onNavigate
  },
  {
    path: '/closets',
    element: <Closets />
  },
  {
    path: '/categorias',
    element: <Categorias />
  },
  {
    path: '/produtos',
    element: <Produtos />
  }
])

// Encaminha de volta 
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'

import Header from './Header.tsx'
import Container from './Container.tsx'
import Home from './Home.tsx'
import './main.css'

import {createBrowserRouter, RouterProvider, Link} from 'react-router-dom'

const rotas = createBrowserRouter ([
  {
    path: '/', 
    element: <Container />
  },
  {

  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <RouterProvider router={rotas}/>
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Toaster } from 'sonner';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// import user pages
import Home from './pages/Home'
import MyOrder from './pages/MyOder.jsx';
import Menu from './pages/Menu.jsx';
import Reservation from './pages/Reservation.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
// import dashboard pages
import AddDishes from './pages/Dashboard/AddDish.jsx';

// import components
import { Signup, Login} from './components/index.js';

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/menu',
          element: <Menu />
        },
        {
          path: '/reservation',
          element: <Reservation />
        },
        {
          path: '/my-orders',
          element: <MyOrder />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/signup',
          element: <Signup />
        },
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          path: 'add-dish',
          element: <AddDishes />
        }
      ]
    }
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
    <Toaster richColors />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import redux 
import { store } from './store/store.js'
import { Provider } from 'react-redux'
// import sonner
import { Toaster } from 'sonner';
// import react-router-dom
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// import user pages
import Home from './pages/Home'
import MyOrder from './pages/MyOder.jsx';
import Menu from './pages/Menu.jsx';
import Reservation from './pages/Reservation.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
// import dashboard pages
import AddDishes from './pages/Dashboard/AddDish.jsx';
import AddCategory from './pages/Dashboard/AddCategory.jsx';

// import components
import { Signup, Login} from './components/index.js';
import DashboardLogin from './components/dashboard/Login.jsx'
import ShowReservation from './components/dashboard/ShowReservation.jsx'
import Orders from './components/dashboard/Orders.jsx'

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
          path: '/menu/:categoryName',
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
          path: 'login',
          element: <DashboardLogin />
        },
        {
          path: 'add-dish',
          element: <AddDishes />
        },
        {
          path: 'add-category',
          element: <AddCategory />
        },
        {
          path: 'reservations',
          element: <ShowReservation />
        },
        {
          path: 'order',
          element: <Orders />
        },
      ]
    }
  ])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>  
      <RouterProvider router={router} />
      <Toaster richColors />
    </Provider>
)

import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservation from './pages/Reservation'
import MyOrder from './pages/MyOder/'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

function App() {
  const router = createBrowserRouter([
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
    }
  ])

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App

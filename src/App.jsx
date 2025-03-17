import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import React, {useState, useEffect} from 'react'
import authService from './appwrite/auth';
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './store/authSlice'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login(userData))
      }else {
        dispatch(logout())
      }
    }).catch((error) => {
      console.log('App :: useEffect :: error ', error);
    }
    ).finally(() => {
      setLoading(false)
    })
  }, [])

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

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../Button';
import Container from '../Container';


const Header = ({ title = 'Add Title' }) => {
  const [isMobileMenuOpen, SetisMobileMenuOpen] = useState(false);

  const navItem = [
    { title: 'Add dish', link: '/' },
    { title: 'Add Category',  link: '/menu' },
    { title: 'Orders', link: '/reservation' },
    { title: 'Reservations', link: '/my-orders' },
  ]

    return (
      <header 
        className="bg-gray-800 border border-gray-500 text-white
                   p-4 flex flex-row items-end gap-2
                  ">
          {/* header for smaller devices */}
          <div className='lg:hidden mr-2 w-16'>
              <Button 
                  onClick={() => SetisMobileMenuOpen(!isMobileMenuOpen)}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
              </Button>
          </div>

          {/* mobile menu */}
          {isMobileMenuOpen && (
              <div className='border border-secondary lg:hidden absolute right-0 top-16 bg-white w-full py-4 px-6 rounded-br-2xl rounded-bl-2xl
                  transition-all duration-300 ease-in-out
              '>
                  <ul className='text-secondary flex items-start justify-between gap-2 font-semibold flex-col'>
                      {navItem.map((nav) => ( 
                              <li key={nav.title}>
                                  <NavLink to={nav.link} className={({isActive}) => isActive ? 'text-primary' : 'text-secondary'} onClick={() => SetisMobileMenuOpen(false)}>
                                      {nav.title}
                                  </NavLink>
                              </li>
                          )
                      )}
                      <li>
                          <Link to={'/login'}>
                              <Button onClick={() => SetisMobileMenuOpen(false)} className='bg-secondary hover: hover:bg-[#3a4a43] transform hover:scale-105 duration-300 text-white px-6 py-2 rounded-full cursor-pointer'>
                                  Login
                              </Button>
                          </Link>
                      </li>
                  </ul>
              </div>
          )}
            <div className='w-full'>
              <h1 className="text-center pr-12 text-lg md:text-2xl font-semibold  md:font-bold">{title}</h1>
            </div>
      </header>
    );
  };
  
  export default Header;
  
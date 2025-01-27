import React, {useState} from 'react'
import logo from '../../assets/images/logo.png'
import Container from '../Container'
import Button from '../Button'
import { Form } from 'react-router-dom'
import {NavLink} from 'react-router-dom'

export default function Header() {
    const [isMobileMenuOpen, SetisMobileMenuOpen] = useState(false);
    const navItem = [
        { title: 'Home', link: '/' },
        { title: 'Menu',  link: '/menu' },
        { title: 'Reservation', link: '/reservation' },
        { title: 'My orders', link: '/my-orders' },
    ]
    return (
        <header className=' h-16 shadow-md bg-white'>
            <Container >
                <div className='flex justify-between items-center'>
                    <div>
                        <img width={70} src={logo} alt="byte&bite" />
                    </div>

                {/* header for laptop and desktop (large screen) */}
                    <div className='hidden md:block'>
                        <ul className='text-secondary flex items-center justify-between gap-6 font-semibold'>
                            {navItem.map((nav) => (
                                    <li key={nav.title}>
                                        <NavLink to={nav.link} className={({isActive}) => isActive ? 'text-primary' : 'text-secondary'} >
                                            {nav.title}
                                        </NavLink>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* header for smaller devices */}
                    <div className='md:hidden mr-2'>
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
                            <div className='md:hidden absolute right-0 top-16 bg-white w-full py-4 px-6 transition-all duration-1000 ease-in-out rounded-br-2xl rounded-bl-2xl'>
                                <ul className='text-secondary flex items-start justify-between gap-2 font-semibold flex-col'>
                                    {navItem.map((nav) => ( 
                                            <li key={nav.title}>
                                                <NavLink to={nav.link} className={({isActive}) => isActive ? 'text-primary' : 'text-secondary'} onClick={() => SetisMobileMenuOpen(false)}>
                                                    {nav.title}
                                                </NavLink>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                </div>
            </Container>
        </header>
    )
}

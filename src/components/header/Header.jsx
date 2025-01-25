import React from 'react'
import logo from '../../assets/images/logo.png'
import Container from '../Container'
import Button from '../Button'
import { Form } from 'react-router-dom'
import {NavLink} from 'react-router-dom'

export default function Header() {
    
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
                    <div>
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
                </div>
            </Container>
        </header>
    )
}

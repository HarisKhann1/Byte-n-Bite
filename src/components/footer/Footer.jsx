import React from 'react'
import Logo from '../../assets/images/logo.png'
import Container from '../Container'

export default function Footer(props) {
    

    return (
        <footer className='bg-secondary pt-10 pb-5 text-white'>
            <Container>
                <div className='flex justify-between items-start flex-wrap gap-8'>
                    <div className='flex items-center flex-col font-semibold gap-2'>
                        <img 
                            className='bg-gray-400 rounded max-w-28' 
                            src={Logo} 
                            alt="byte&bite logo"
                        />
                        <span className='text-primary'>Byte&Bite</span>
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <h1 className='text-primary text-2xl font-bold'>Reach out to us</h1>
                        <div className='mt-2'>
                            <h3 className='text-gray-200 mb-2 font-semibold text-xl underline'>Address:</h3>
                            <p className='text-sm text-gray-300'>Byte&Bite Restaurant 123 Main Street Anytown, Karachi,Pakistan.</p>
                        </div>
                        <div>
                            <h3 className='text-gray-200 font-semibold underline'>Email:</h3>
                            <a className='text-gray-300 text-sm' href="mailto:query@byte&bite.com">query@byte&bite.com</a>
                        </div>
                        <div>
                            <h3 className='text-gray-200 underline font-semibold'>Phone:</h3>
                            <a className='text-gray-300 text-sm' href="tel:03001212121">0300-1212121</a>
                        </div>
                    </div>
                </div>
                    <p className='text-primary md:text-start mt-6 text-center'>© 2025 ByteNbite. All Rights Reserved.</p>
            </Container>
        </footer>
    )
}

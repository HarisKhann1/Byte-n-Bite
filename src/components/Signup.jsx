import React from 'react'
import Container from './Container'
import Input from './Input'
import { useEffect, useRef } from 'react';
import sigupImage from '../assets/images/Sigup_image.jpg'
import Button from './Button';
import { Link } from 'react-router-dom';
import showPasswordImage from '../assets/images/show-password-48.png'
import hidePasswordImage from '../assets/images/blind-40.png'


export default function Signup(props) {
    const ref = useRef();
    const passRef = useRef();
    const pass2Ref = useRef();
    const [isPasswordHidden, setisPasswordHidden] = React.useState(true)

    useEffect(() => {
        ref.current.focus(); // Focus only on the first render
    }, []);
    
    useEffect(() => {
        if (!isPasswordHidden) {
            passRef.current.type = 'text';
            pass2Ref.current.type = 'text';
        } else {
            passRef.current.type = 'password';
            pass2Ref.current.type = 'password';
        }
    }, [isPasswordHidden]);
    
    return (
        <section className='pt-25 pb-10 flex flex-col items-center'>
                <div className='bg-[#ebf1f4] p-8 lg:pl-10 pb-10 rounded-3xl shadow-md flex flex-row md:gap-12 lg:gap-8 justify-between'>
                    <div className='flex flex-col md:gap-12 md:w-[40%]'>
                        <div className='hidden md:block text-center w-28'>
                            <h2 className='border-2 border-secondary py-1 font-medium px-4 rounded-2xl'>Byte&Bite</h2>
                        </div>  
                        <div className='flex flex-col gap-2 items-center'>
                            <h2 className='mb-6 text-2xl font-bold text-center underline underline-offset-8 decoration-1 decoration-secondary'>Signup</h2>
                            <form className='flex flex-col gap-4'>
                                <Input  label='Full Name' type='text' className='min-w-64 md:min-w-72' placeholder='Enter your full name' ref={ref}/>
                                <Input  label='Email' type='text' className='min-w-64 md:min-w-72' placeholder='Enter your email'/>
                                <div className='min-w-64 md:min-w-72 flex flex-row items-center'>
                                    <Input ref={passRef}  label='Enter your password' type='password' className='min-w-64 md:min-w-72 pr-14' placeholder='Confirm your password'/>
                                    <img  
                                        className='w-6 h-6 cursor-pointer -translate-x-8 translate-y-4'
                                         onClick={() => setisPasswordHidden(!isPasswordHidden)}
                                        src={isPasswordHidden ? hidePasswordImage : showPasswordImage} 
                                        alt="password hidden" 
                                    />
                                </div>
                                <div className='min-w-64 md:min-w-72 flex flex-row items-center'>
                                    <Input ref={pass2Ref}  label='Confirm your password' type='password' className='min-w-64 md:min-w-72 pr-14' placeholder='Confirm your password'/>
                                    <img  
                                        className='w-6 h-6 cursor-pointer -translate-x-8 translate-y-4'
                                         onClick={() => setisPasswordHidden(!isPasswordHidden)}
                                        src={isPasswordHidden ? hidePasswordImage : showPasswordImage} 
                                        alt="password hidden" 
                                    />
                                </div>

                                <div>
                                    <Button type='submit' className='min-w-64 md:min-w-72 bg-primary cursor-pointer font-medium text-white py-2 rounded hover:bg-amber-600 transition duration-300 ease-in-out'>
                                        Login
                                    </Button>
                                </div>
                            </form>
                                <Link to='/login'>
                                    <p className='text-center text-sm'>Already have an account? <span className='font-medium'>Login</span></p>
                                </Link>
                        </div>
                    </div>
                    <div className='hidden md:block max-w-[55%]'>
                        <img 
                            className='w-[36rem] h-[36rem] object-cover rounded-2xl'
                            src={sigupImage} 
                            alt="" 
                        />
                    </div>
                </div>
        </section>
    )
}

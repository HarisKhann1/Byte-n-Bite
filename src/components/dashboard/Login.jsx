import React from 'react'
import Container from './../Container'
import Input from './../Input'
import { useEffect, useRef } from 'react';
import sigupImage from '../../assets/images/Sigup_image.jpg'
import Button from './../Button';
import { Link, useNavigate } from 'react-router-dom';
import showPasswordImage from '../../assets/images/show-password-48.png'
import hidePasswordImage from '../../assets/images/blind-40.png'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner'
import authService from '../../appwrite/adminAuth'
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../store/adminAuthSlice';
import DashboardHeader from './DashboardHeader'

export default function Login(props) {
    const [isPasswordHidden, setisPasswordHidden] = React.useState(true)
    const { register, handleSubmit, formState: { errors }, setFocus } = useForm();
    const status1 = useSelector(state => state.adminAuth.status);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        const sessionResponse = await authService.login(data.email, data.password);
        
        if (sessionResponse.error) {
            toast.error(sessionResponse.message);
            return;
        }
        if (sessionResponse.documents.length === 0) {
            toast.error('Invalid email or password');
        }else{
            dispatch(adminLogin());
            toast.success('Login successful');
            navigate('/dashboard/add-dish');
        }
    }
    useEffect(() => {
        setFocus('email') // Focus only on the first render
    }, [setFocus]);
    
    const redBorderONError = (inputBox) => {
        return inputBox ? 'border-2 border-red-500' : ''
    }

    return (
        <>
        <DashboardHeader title='Dashboard'/>
        <section className='pt-25 lg:pt-0 pb-10 flex flex-col items-center'>
                <div className='bg-[#ebf1f4] p-8 lg:pl-10 pb-10 rounded-3xl shadow-md flex flex-row md:gap-12 lg:gap-8 justify-between'>
                    <div className='flex flex-col md:gap-12 md:w-[40%]'>
                        <div className='hidden md:block text-center w-28'>
                            <h2 className='border-2 border-secondary py-1 font-medium px-4 rounded-2xl'>Byte&Bite</h2>
                        </div>  
                        <div className='flex flex-col gap-2 items-center'>
                            <h2 className='mb-6 text-2xl font-bold text-center underline underline-offset-8 decoration-1 decoration-secondary'>Login</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                                <Input  
                                    {...register("email", 
                                        {
                                            required: "Email is required.",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: "Invalid email address."
                                            }
                                        }
                                    )}
                                    label='Email' 
                                    type='text' 
                                    className={`min-w-64 md:min-w-72 ${redBorderONError(errors.email)}`} 
                                    placeholder='Enter your email' 
                                />
                                {errors.email && <p className="text-red-500 text-sm -mt-4">{errors.email.message}</p>}    
                                <div className='min-w-64 md:min-w-72 flex flex-row items-center'>
                                    <Input 
                                        {
                                            ...register("password",
                                                { 
                                                    required: "Password is required.",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must be at least 8 characters long."
                                                    }
                                                }
                                            )
                                        }
                                        label='Enter your password' 
                                        type={isPasswordHidden ? 'password' : 'text'} 
                                        className={`min-w-64 md:min-w-72 pr-14 ${redBorderONError(errors.password)}`} 
                                        placeholder='Enter your password'
                                    />
                                    <img  
                                        className='w-6 h-6 cursor-pointer -translate-x-8 translate-y-4'
                                        onClick={() => setisPasswordHidden(!isPasswordHidden)}
                                        src={isPasswordHidden ? hidePasswordImage : showPasswordImage} 
                                        alt="Toggle password visibility" 
                                    />
                                </div>
                                {errors.password && <p className="text-red-500 text-sm -mt-4">{errors.password.message}</p>}
                                <div>
                                    <Button 
                                        type='submit'
                                        className='min-w-64 md:min-w-72 bg-primary cursor-pointer font-medium text-white py-2 rounded hover:bg-amber-600 transition duration-300 ease-in-out'>
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='hidden md:block max-w-[55%]'>
                        <img 
                            loading='lazy'
                            className='w-[36rem] h-[26rem] object-cover rounded-2xl'
                            src={sigupImage}  
                             alt="Signup illustration"
                        />
                    </div>
                </div>
        </section>
        </>
    )
}

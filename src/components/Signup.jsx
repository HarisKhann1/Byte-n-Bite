import React,{useState} from 'react'
import Container from './Container'
import Input from './Input'
import { useEffect, useRef } from 'react';
import sigupImage from '../assets/images/Sigup_image.jpg'
import Button from './Button';
import { Link } from 'react-router-dom';
import showPasswordImage from '../assets/images/show-password-48.png'
import hidePasswordImage from '../assets/images/blind-40.png'
import { set, useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [creatingAccount, setCreatingAccount] = useState(false);
    const [isPasswordsMatch, setisPasswordsMatch] = useState(true)
    const [isPasswordHidden, setisPasswordHidden] = useState(true)
    const [isPassword2Focused, setisPassword2Focused] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }, setFocus, setError, clearErrors } = useForm();

    useEffect(() => {
        setFocus('fullname'); // Focus only on the first render
    }, [setFocus]);
    
    useEffect(() => {
        if (isPassword2Focused && (watch('password') !== watch('password2'))) {
            setisPasswordsMatch(false)
            return;
        }
        
        if (isPassword2Focused && (watch('password') === watch('password2'))) {
            setisPasswordsMatch(true)
        }
    }, [watch('password'), watch('password2'), isPassword2Focused]);
    
    const onSubmit = async(data) => {
        if (watch('password') !== watch('password2')) {
            return;
        }

        try {
            setCreatingAccount(true);
            const userData = await authService.createAccount(data.email, data.password, data.fullname);
            setCreatingAccount(false);
            
            if (userData) {
                toast.success('Account created successfully');
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            console.log('Signup :: Error creating account: ', error);
        }
        
    }

    const redBorderONError = (inputBox) => {
         return inputBox ? 'border-2 border-red-500' : ''
    }
    
    return (
        <section className='pt-25 pb-10 flex flex-col items-center'>
                <div className='bg-[#ebf1f4] p-8 lg:pl-10 pb-10 rounded-3xl shadow-md flex flex-row md:gap-12 lg:gap-8 justify-between'>
                    <div className='flex flex-col md:gap-12 md:w-[40%]'>
                        <div className='hidden md:block text-center w-28'>
                            <h2 className='border-2 border-secondary py-1 font-medium px-4 rounded-2xl'>Byte&Bite</h2>
                        </div>  
                        <div className='flex flex-col gap-2 items-center'>
                            <h2 className='mb-6 text-2xl font-bold text-center underline underline-offset-8 decoration-1 decoration-secondary'>Signup</h2>
                            
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                                <Input  
                                    { ...register("fullname",
                                        {
                                            required: "Full name is required.",
                                            minLength: {
                                                value: 3,
                                                message: "Full name must be at least 3 characters long."
                                            }
                                        }
                                    )}
                                    label='Full Name' 
                                    type='text' 
                                    className={`min-w-64 md:min-w-72 pr-14 ${redBorderONError(errors.fullname)}`} placeholder='Enter your full name' 
                                />
                                {errors.fullname && <p className="text-red-500 text-sm -mt-4">{errors.fullname.message}</p>}
                                
                                <Input
                                    { ...register("email",
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
                                    className={`min-w-64 md:min-w-72 pr-14 ${redBorderONError(errors.email)}`} 
                                    placeholder='Enter your email'
                                />
                                {errors.email && <p className="text-red-500 text-sm -mt-4">{errors.email.message}</p>}
                                
                                <div className='min-w-64 md:min-w-72 flex flex-row items-center'>
                                    <Input
                                        { ...register("password",
                                            { 
                                                required: "Password is required.",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must be at least 8 characters long."
                                                }
                                            }
                                        )} 
                                        label='Enter your password' 
                                        type={isPasswordHidden ? 'password' : 'text'} 
                                        className={`min-w-64 md:min-w-72 pr-14 ${redBorderONError(errors.password)}`} 
                                        placeholder='Confirm your password'
                                    />
                                    <img  
                                        onClick={() => setisPasswordHidden(!isPasswordHidden)}
                                        className='w-6 h-6 cursor-pointer -translate-x-8 translate-y-4'
                                        src={isPasswordHidden ? hidePasswordImage : showPasswordImage} 
                                        alt="password hidden" 
                                    />
                                </div>
                                {errors.password && <p className="text-red-500 text-sm -mt-4">{errors.password.message}</p>}
                                
                                <div className='min-w-64 md:min-w-72 flex flex-row items-center'>
                                    <Input 
                                        { ...register("password2",
                                            { 
                                                required: "Password is required.",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must be at least 8 characters long."
                                                }
                                            }
                                        )} 
                                        label='Confirm your password' 
                                        type={isPasswordHidden ? 'password' : 'text'} 
                                        className={`min-w-64 md:min-w-72 pr-14 ${redBorderONError(errors.password2)}`} 
                                        placeholder='Confirm your password'
                                        onClick={() => setisPassword2Focused(true)}
                                    />
                                    <img  
                                        className='w-6 h-6 cursor-pointer -translate-x-8 translate-y-4'
                                         onClick={() => setisPasswordHidden(!isPasswordHidden)}
                                        src={isPasswordHidden ? hidePasswordImage : showPasswordImage} 
                                        alt="password hidden" 
                                    />
                                </div>
                                {errors.password2 && <p className="text-red-500 text-sm -mt-4">{errors.password2.message}</p>}
                                {!isPasswordsMatch && <p className="text-red-500 text-sm -mt-4">Passwords do not match.</p>}
                                <div>
                                    <Button 
                                        disabled={creatingAccount} 
                                        type="submit" 
                                        className={`min-w-72 md:min-w-72 bg-primary cursor-pointer font-medium text-white py-2 rounded hover:bg-amber-600 transition duration-300 ease-in-out ${creatingAccount ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        {creatingAccount ? 'Creating Account...' : 'Signup'}
                                    </Button>
                                </div>
                            </form>
                                                       
                            <p className='text-center text-sm'>Already have an account? 
                                <Link to='/login'>
                                    <span className='font-medium ml-1 hover:text-secondary'>Login</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className='hidden md:block max-w-[55%]'>
                        <img 
                            className='w-[36rem] h-[36rem] object-cover rounded-2xl'
                            src={sigupImage} 
                            alt="sigup illustration" 
                        />
                    </div>
                </div>
        </section>
    )
}

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


export default function ReservationForm(props) {
    const { register, handleSubmit, formState: { errors }, setFocus } = useForm();

    useEffect(() => {
        setFocus('fullname'); // Focus only on the first render
    }, [setFocus]);
    
    
    const onSubmit = (data) => {
        console.log('submitted');
        console.log(data);
    }

    const redBorderONError = (inputBox) => {
         return inputBox ? 'border-2 border-red-500' : ''
    }
    
    return (
        <section className='pt-25 pb-10 flex flex-col items-center'>
                <div className='bg-[#ebf1f4] p-8 lg:pl-10 pb-10 rounded-3xl shadow-md flex flex-row md:gap-12 lg:gap-8 justify-between'>
                    <div className='flex flex-col md:gap-12'>
                        <div className='hidden md:block text-center w-28'>
                            <h2 className='border-2 border-secondary py-1 font-medium px-4 rounded-2xl'>Byte&Bite</h2>
                        </div>  
                        <div className='flex flex-col gap-2 items-center'>
                            <h2 className='mb-6 text-2xl font-bold text-center underline underline-offset-8 decoration-1 decoration-secondary'>Table Reservation Form</h2>
                            {/* form start */}
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                                {/* row 1 */}
                                <div className='flex flex-col md:flex-row md:justify-between gap-6'>
                                    {/* name div */}
                                    <div>
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
                                            className={`min-w-64 md:w-full ${redBorderONError(errors.fullname)}`} placeholder='Enter your full name' 
                                        />
                                        {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
                                    </div>
                                    {/* how many people div */}
                                    <div>
                                        <label htmlFor="people" className='block text-secondary font-medium text-lg mb-1'>How many people?</label>
                                        <select {...register("people", { required: "Number of people is required." })} 
                                                className={`block text-secondary font-medium text-lg p-2 rounded border min-w-64 md:w-full ${redBorderONError(errors.people)}`}
                                                id="people"
                                        >
                                            <option className='bg-gray-300' value="1">1 Person</option>
                                            <option className='bg-gray-300' value="2">2 People</option>
                                            <option className='bg-gray-300' value="3">3 People</option>
                                            <option className='bg-gray-300' value="4">4 People</option>
                                            <option className='bg-gray-300' value="5">5 People</option>
                                            <option className='bg-gray-300' value="6">6 People</option>
                                            <option className='bg-gray-300' value="7">7 People</option>
                                            <option className='bg-gray-300' value="8">8 People</option>
                                        </select>
                                    </div>
                                </div>
                                {/* row 2 */}
                                <div className='flex flex-col md:flex-row md:justify-between gap-6'>
                                    {/* email div */}
                                    <div>
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
                                            className={`min-w-64 md:w-full ${redBorderONError(errors.email)}`} 
                                            placeholder='Enter your email'
                                        />
                                        {errors.email && <p className="text-red-500 text-sm pl-1">{errors.email.message}</p>}
                                    </div>  
                                    {/* phone number div */}
                                    <div>
                                        <Input
                                            { ...register("phoneNO",
                                                {
                                                    required: "Phone no. is required.",
                                                    pattern: {
                                                        value: /^[0-9]{10}$/,
                                                        message: "Invalid phone number."
                                                    }
                                                }
                                            )}  
                                            label='Phone Number' 
                                            type='tel' 
                                            className={`min-w-64 md:w-full ${redBorderONError(errors.phoneNO)}`} 
                                            placeholder='Enter your phone number'
                                        />
                                        {errors.phoneNO && <p className="text-red-500 text-sm md:pl-1">{errors.phoneNO.message}</p>}
                                    </div>
                                </div>
                                {/* row 3 */}
                                <div className='flex flex-col md:flex-row md:justify-between gap-6'>
                                    {/* date div */}
                                    <div>
                                        <Input
                                            { ...register("date",
                                                { 
                                                    required: "Date is required.",
                                                }
                                            )} 
                                            label='Reservation Date' 
                                            type='date' 
                                            className={`min-w-64 md:w-full ${redBorderONError(errors.date)}`} 
                                            placeholder='Enter reservation date'
                                        />
                                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                                    </div>
                                    {/* time div */}
                                    <div>
                                        <Input
                                            { ...register("time",
                                                { 
                                                    required: "Time is required.",
                                                }
                                            )} 
                                            label='Enter your password' 
                                            type='time' 
                                            className={`min-w-64 md:w-full ${redBorderONError(errors.time)}`} 
                                            placeholder='Confirm your password'
                                        />
                                        {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                                    </div>
                                </div>
                                {/* text area */}
                                <label htmlFor="extra-info" className='block text-secondary font-medium text-lg'>Comments (Optional)</label>
                                <textarea 
                                    id='extra-info'
                                    className='text-secondary font-medium text-lg -mt-2 min-w-64 md:w-full pr-14 border border-secondary rounded-md p-2 outline-none focus:border-2' 
                                    { ...register("extra-info")}
                                />
                                {/* sumit button */}
                                <div>
                                    <Button type='submit' className='min-w-64 md:w-full bg-primary cursor-pointer font-medium text-white py-2 rounded hover:bg-amber-600 transition duration-300 ease-in-out'>
                                        Reserve a Table
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </section>
    )
}

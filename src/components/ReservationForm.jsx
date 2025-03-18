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
import reservationService from '../appwrite/reservation';
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

export default function ReservationForm(props) {
    const { register, handleSubmit, formState: { errors }, setFocus, setValue } = useForm();
    const user_id = useSelector(state => state.auth.userData.$id);
    const [orders, setOrders] = useState([]);
    const [response, setResponse] = useState(false);

    useEffect(() => {
        setFocus('fullname'); // Focus only on the first render
        reservationService.getReservation(user_id).then((response) => {
            if (response) {
                setOrders(response.documents);
            }
        });
    }, [setFocus, response]);

    
    
    
    const onSubmit = (data) => {
        
        reservationService.reservation(data, user_id).then((response) => {
            if (response) {
                toast.success('Reservation successful');
                setValue('fullname', '');
                setValue('people', '');
                setValue('date', '');
                setValue('phoneNO', '');
                setValue('start_time', '');
                setValue('end_time', '');
                setValue('extra_info', '');
                setResponse((prev) => !prev);
            }
        });
    }

    const redBorderONError = (inputBox) => {
         return inputBox ? 'border-2 border-red-500' : ''
    }
    
    return (
        <section className='pt-25 pb-10 flex flex-col items-center'>
                <div className='mb-10 bg-[#ebf1f4] p-8 lg:pl-10 pb-10 rounded-3xl shadow-md flex flex-row md:gap-12 lg:gap-8 justify-between'>
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
                                    <div>
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
                                    {/* time div */}
                                    <div>
                                        <Input
                                            { ...register("start_time",
                                                { 
                                                    required: "Time is required.",
                                                }
                                            )} 
                                            label='Enter start time' 
                                            type='time' 
                                            className={`min-w-64 md:w-full ${redBorderONError(errors.time)}`} 
                                            placeholder='Enter start time'
                                        />
                                        {errors.start_time && <p className="text-red-500 text-sm">{errors.start_time.message}</p>}
                                    </div>
                                    {/* time div */}
                                    <div>
                                        <Input
                                            { ...register("end_time",
                                                { 
                                                    required: "Time is required.",
                                                }
                                            )} 
                                            label='Enter end time' 
                                            type='time' 
                                            className={`min-w-64 md:w-full ${redBorderONError(errors.time)}`} 
                                            placeholder='Enter end time'
                                        />
                                        {errors.end_time && <p className="text-red-500 text-sm">{errors.end_time.message}</p>}
                                    </div>
                                </div>
                                {/* text area */}
                                <label htmlFor="extra-info" className='block text-secondary font-medium text-lg'>Comments (Optional)</label>
                                <textarea 
                                    id='extra-info'
                                    className='text-secondary font-medium text-lg -mt-2 min-w-64 md:w-full pr-14 border border-secondary rounded-md p-2 outline-none focus:border-2' 
                                    { ...register("extra_info")}
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
                {/* table for a person registration list */}
                <Container>
                <div className='my-10 flex justify-between items-center flex-wrap gap-2'>
                 <h2 className='text-secondary text-[1.2rem] font-medium md:font-semibold md:text-3xl lg:text-4xl'>My Reservation list</h2>
            </div>
            <table className="-mt-6 w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs uppercase bg-secondary text-white">
                            <tr className='text-center'>
                                <th scope="col" className="text-center px-1 py-3">No.</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-2 py-3">People</th>
                                <th scope="col" className="px-2 py-3">Date</th>
                                <th scope="col" className="px-2 py-3">Start Time</th>
                                <th scope="col" className="px-2 py-3">End Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((dish1, index) => (
                                <tr key={index} className="text-center bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <th scope="row" className="text-center py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {index + 1}
                                    </th>
                                    <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {dish1.name}
                                    </th>
                                    <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap">
                                        {dish1.people}
                                    </th>
                                    <td className="px-2 py-1 space-x-2">
                                    {dish1.date.split('T')[0]}
                                    </td>
                                    <td className="px-2 py-1 space-x-2">
                                        {dish1.start_time}
                                    </td>
                                    <td className="px-2 py-1 space-x-2">
                                        {dish1.end_time}
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr className='text-center'>
                                    <td colSpan='8'>
                                        <h2 className='text-lg font-medium text-secondary'>Order list is empty</h2>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Container>
        </section>
    )
}

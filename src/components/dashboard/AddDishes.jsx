import React from 'react'
import Input from '../Input'
import Button from '../Button'
import Table from './Table'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DashboardHeader } from '..'
import dish from '../../appwrite/addDish'
import { toast } from 'sonner'

export default function AddDishes(props) {
    const { register, handleSubmit, formState: { errors }, setFocus, setValue } = useForm()

    useEffect(() => {
        setFocus('name')
    },[])

    const onSubmit = async (data) => {
        
        try {
            const response = await dish.addDish(data);
            toast.success('Dish added successfully');
        } catch (error) {
            toast.error('Failed to add dish');
        }
        
    }

    return (
        <section className='space-y-15'>
            <DashboardHeader title='Add Dishes'/>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center mt-10 gap-5 mx-auto'>
                <div className='flex flex-col md:flex-row gap-4 md:gap-5 md:w-2xl justify-between'>
                    <div className='flex flex-col'>
                        <Input 
                            {...register('name', { required: "Enter dish name" })} 
                            label='Name' 
                            type='text'
                            className='sm:w-lg md:w-52' 
                            placeholder='Dish Name'
                        />
                        {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
                    </div>
                    <div>
                        <Input 
                            {...register('price', { required: "Enter price", minLength: { value: 1, message: "Price must be greater than 0" }})}
                            label='price' 
                            type='number'
                            className='sm:w-lg md:w-52' 
                            placeholder='Price' 
                        />
                        {errors.price && <span className='text-red-500'>{errors.price.message}</span>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="category" className='font-medium text-lg text-secondary'>Category:</label>
                        <select 
                            {...register('category', { required: "Select a category" })}
                            name="category" 
                            id="category" 
                            className='sm:w-lg md:w-52 text-secondary py-2 px-4 rounded border focus:border-2 focus:border-secondary transition duration-300 ease-in-out'
                        >
                            <option>Select a category</option>                            
                        </select>
                        {errors.category && <span className='text-red-500'>{errors.category.message}</span>}
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col'>
                        <Input 
                            {...register('image', { required: "Upload an image" })}
                            className='w-[12.4rem] sm:w-lg md:w-2xl cursor-pointer' 
                            label='Image' 
                            type='file' 
                            placeholder='Upload Image' 
                        />
                        {errors.image && <span className='text-red-500'>{errors.image.message}</span>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='font-medium text-lg text-secondary' htmlFor="description">Description:</label>
                        <textarea 
                            {...register('description', { required: "Enter description" })}
                            name="description" 
                            id="description" 
                            className='w-[12.4rem] sm:w-lg md:w-2xl outline-none rounded border focus:border-2 focus:border-secondary'
                        />
                        {errors.description && <span className='text-red-500'>{errors.description.message}</span>}
                    </div>
                    
                </div>
                <Button 
                    type='submit'
                    className='bg-primary font-medium text-sm w-52 sm:w-lg md:w-2xl py-3 px-4 rounded text-gray-50 hover:bg-secondary cursor-pointer transition duration-300 ease-in-out'
                >
                    Add Dish
                </Button>
            </form>
            <Table />
            <div className='h-16'></div>
        </section>
    )
}

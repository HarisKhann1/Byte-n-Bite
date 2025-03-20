import React from 'react'
import Input from '../Input'
import Button from '../Button'
import Table from './Table'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DashboardHeader } from '..'
import dish from '../../appwrite/addDish'
import fetchCategories from '../../appwrite/addCategory'
import { toast } from 'sonner'

export default function AddDishes(props) {
    const { register, handleSubmit, formState: { errors }, setFocus, setValue } = useForm()
    const [isDishAdded, setIsDishAdded] = useState(false);
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const allCategories = await fetchCategories.getCategories();
            if (allCategories) {
                const newCategories = allCategories.documents.map(category => category.category);
                setCategories(newCategories);
            }            
        } catch (error) {
            toast.error('Failed to fetch categories');
        }
    }

    useEffect(() => {
        setFocus('name')
        getCategories();        
    },[])

    const onSubmit = async (data) => {
        
        try {
            const uploadDishImage = await dish.uploadImage(data.image[0]);
            if (uploadDishImage) {
                const response = await dish.addDish(data, uploadDishImage.$id);
                setValue('name', '');
                setValue('price', '');
                setValue('image', null);
                setValue('description', '');
                toast.success('Dish added successfully');
                setIsDishAdded(!isDishAdded);
            }
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
                            {categories.map((category, index) => (
                                <option 
                                    className='text-secondary w-sm sm:w-lg md:w-52'
                                    key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        {errors.category && <span className='text-red-500'>{errors.category.message}</span>}
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col'>
                        <label className='block text-secondary font-medium text-lg mb-1'>Image:</label>
                        <Input 
                            {...register('image', { required: "Upload an image" })}
                            className='w-[15rem] sm:w-lg md:w-2xl cursor-pointer'  
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
                            className='w-[15rem] sm:w-lg md:w-2xl outline-none rounded border focus:border-2 focus:border-secondary'
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
            <Table isDishAdded={isDishAdded}/>
            <div className='h-16'></div>
        </section>
    )
}

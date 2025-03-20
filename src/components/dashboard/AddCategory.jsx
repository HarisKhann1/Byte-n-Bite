import React from 'react'
import Input from '../Input'
import Button from '../Button'
import ShowCategoryData from './ShowCategoryData';
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DashboardHeader } from '..'
import category from '../../appwrite/addCategory'
import { toast } from 'sonner'

export default function AddCategory(props) {
    const { register, handleSubmit, formState: { errors }, setFocus, setValue } = useForm()
    const [isDishAdded, setIsDishAdded] = useState(false);

    useEffect(() => {
        setFocus('name')
    },[])

    const onSubmit = async (data) => {
        try {
                const imageResponse = await category.uploadImage(data.image[0]);
                
                if (imageResponse) { 
                    await category.addCategory(data, imageResponse.$id);
                    setValue('name', '');
                    setValue('image', null);
                    toast.success('Category added successfully');
                    setIsDishAdded((isDishAdded) => !isDishAdded);
                }
            }
        catch (error) {
            toast.error('Failed to add category');
        }
    }

    return (
        <section className='space-y-15'>
            <DashboardHeader title='Add Category'/>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center mt-10 gap-5 mx-auto'>
                <div className='flex flex-col gap-4 md:gap-5 md:w-2xl justify-between'>
                    <div className='flex flex-col gap-4'>
                        <Input 
                            {...register('name', { required: "Enter dish name" })} 
                            label='Name' 
                            type='text'
                            className='sm:w-72' 
                            placeholder='Dish Name'
                        />
                        {errors.name && <span className='-mt-4 text-red-500'>{errors.name.message}</span>}

                        <label className='block text-secondary font-medium text-lg -mb-3'>Image:</label>
                        <div className='flex flex-col'>
                             <Input 
                                {...register('image', { required: "Upload an image" })}
                                className='w-60 sm:w-72 cursor-pointer'  
                                type='file' 
                                placeholder='Upload Image' 
                            />
                            {errors.image && <span className='text-red-500'>{errors.image.message}</span>}
                        </div>
                    </div>
                    <Button 
                        type='submit'
                        className='bg-primary font-medium text-sm w-52 sm:w-52 py-3 px-4 rounded text-gray-50 hover:bg-secondary cursor-pointer transition duration-300 ease-in-out'
                    >
                        Add Dish
                    </Button>
                </div>
            </form>
            <ShowCategoryData isDishAdded={isDishAdded}/>
            <div className='h-16'></div>
        </section>
    )
}

import React, { useEffect, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import { Input } from '../../components/index';
import dish from '../../appwrite/addDish';

export default function Table(props) {
    const { register, handleSubmit, formState: { errors }, setFocus, setValue } = useForm();
    const [editableDishId, setEditableDishId] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [dishes, setDishes] = useState([]);

    // fetching all the dishes from the database
    const fetchDishes = async () => {
        try {
            const allDishes = await dish.getDishes();
            
            if (allDishes) {
                const newDishes = allDishes.documents.map(dish => ({
                    id: dish.$id,
                    name: dish.name,
                    price: dish.price,
                    category: dish.category,
                    image: dish.image,
                    description: dish.description,
                }));
                setDishes(newDishes); 
            }
            
        } catch (error) {
            console.log('Error fetching dishes: ', error);
        }
    };

    // fetching all the dishes from the database
    useEffect(() => {
        fetchDishes();        
    }, []);

    // setting all the data in the form fields
    useEffect(() => {
        // Update form values with the fetched dish data
        dishes.forEach(dish => {
            // setvalue("field name", "value")
            setValue(`name_${dish.id}`, dish.name);
            setValue(`price_${dish.id}`, dish.price);
            setValue(`category_${dish.id}`, dish.category);
            setValue(`image_${dish.id}`, dish.image);
            setValue(`description_${dish.id}`, dish.description);
        });
    }, [dishes, setValue]);

    const editButton = (id) => {
        setEditableDishId(id === editableDishId ? null : id);
    };


    // for updating the dish logic
    const updateDish = async (id, data) => {
        try {
            const updateDishData = {
                name: data[`name_${id}`],
                price: data[`price_${id}`],
                category: data[`category_${id}`],
                image: data[`image_${id}`],
                description: data[`description_${id}`],
            }
            // Appwrite API call to update dish
            const updatedDish = await dish.updateDish(id, updateDishData);
            console.log('Updated dish: ', updatedDish);

            // fetching all the dishes from the database after updating the dish
            fetchDishes();

        } catch (error) {
            console.log('Error updating dish: ', error);
        }
    };

    // for updateing the dish when clicked on save button 
    const onSubmit = async (data) => {
        console.log(editableDishId);
        
        if (editableDishId) {
            updateDish(editableDishId, data);
        }
        console.log('row data:',data);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
            <div className="pb-4">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search" className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-68 bg-gray-50 focus:ring-secondary focus:border-secondary" placeholder="Search for dishes"/>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs uppercase bg-secondary text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-2 py-3">Price</th>
                        <th scope="col" className="px-2 py-3">Category</th>
                        <th scope="col" className="px-2 py-3">Image</th>
                        <th scope="col" className="px-2 py-3">Description</th>
                        <th scope="col" className="px-2 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dishes.map((dish) => (
                        <tr key={dish.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                            <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <Input 
                                    {...register(`name_${dish.id}`, { required: "Enter dish name" })}
                                    type='text'
                                    onChange={(e) => setValue(`name_${dish.id}`, e.target.value)} 
                                    value={dish.name}
                                    disabled={dish.id !== editableDishId}
                                    className={dish.id !== editableDishId ? 'border-none w-36' : 'border-1 border-secondary w-36'}
                                />
                                {/* {errors[`name_${dish.id}`] && <span className='text-red-500'>{errors[`name_${dish.id}`].message}</span>} */}
                            </th>
                            <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap">
                                <Input 
                                    {...register(`price_${dish.id}`, { required: "Enter price", minLength: { value: 1, message: "Price must be greater than 0" } })}
                                    type='number'
                                    value={dish.price}
                                    disabled={dish.id !== editableDishId}
                                    className={dish.id !== editableDishId ? 'border-none w-16' : 'border-1 border-secondary w-16'}
                                />
                                {/* {errors[`price_${dish.id}`] && <span className='text-red-500'>{errors[`price_${dish.id}`].message}</span>} */}
                            </th>
                            <td className="px-2 py-1">
                                <Input 
                                    {...register(`category_${dish.id}`, { required: "Enter category" })}
                                    type='text'
                                    value={dish.category}
                                    disabled={dish.id !== editableDishId}
                                    className={dish.id !== editableDishId ? 'border-none w-36' : 'border-1 border-secondary w-36'}
                                />
                                {/* {errors[`category_${dish.id}`] && <span className='text-red-500'>{errors[`category_${dish.id}`].message}</span>} */}
                            </td>
                            <td className="px-2 py-1">
                                <Input 
                                    {...register(`image_${dish.id}`, { required: "Upload an image" })}
                                    className={`${dish.id !== editableDishId ? 'border-none' : ''} w-36`} 
                                    type='file'
                                    disabled={dish.id !== editableDishId} 
                                />
                                {/* {errors[`image_${dish.id}`] && <span className='text-red-500'>{errors[`image_${dish.id}`].message}</span>} */}
                            </td>
                            <td className="px-2 py-1">
                                <textarea 
                                    {...register(`description_${dish.id}`, { required: "Enter description" })}
                                    name="description" 
                                    value={dish.description}
                                    disabled={dish.id !== editableDishId}
                                    className={`${dish.id !== editableDishId ? 'border-none' : 'outline-none rounded border focus:border-2 focus:border-secondary'} w-36`}
                                />
                                {/* {errors[`description_${dish.id}`] && <span className='text-red-500'>{errors[`description_${dish.id}`].message}</span>} */}
                            </td>
                            <td className="px-2 py-1 space-x-2">
                                <button onSubmit={handleSubmit} onClick={() => editButton(dish.id)} className="font-medium text-blue-600 hover:underline cursor-pointer">{dish.id !== editableDishId ? 'Edit' : 'Save'}</button>
                                <button className="font-medium text-red-600 hover:underline cursor-pointer">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </form>
    );
}

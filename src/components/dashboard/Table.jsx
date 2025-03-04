import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/index';
import dish from '../../appwrite/addDish';
import { toast } from 'sonner'

export default function Table({isDishAdded}) {
    const { register, handleSubmit, formState: { errors }, setFocus, setValue, getValues } = useForm();
    const [editableDishId, setEditableDishId] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [toBeDeleteImageId, setToBeDeleteImageId] = useState(null);
    
    // Fetching all the dishes from the database
    const fetchDishes = useCallback(async () => {
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
            toast.error('Failed to fetch dishes');
        }
    }, [refresh, isDishAdded]);

    useEffect(() => {
        fetchDishes();        
    }, [fetchDishes]);

    const editButton = (id) => {
        setEditableDishId(id === editableDishId ? null : id); // Toggle edit mode for the dish
        if (editableDishId) {
            onSubmit(); // Save the changes when the user clicks on the Save button
        }
    };

    const handleDishChange = useCallback((id, field, value) => {
        setDishes(prevDishes => 
            prevDishes.map(dish => 
                dish.id === id ? { ...dish, [field]: value } : dish
            )
        );
    }, []);

    const onSubmit = async (data) => {
        // console.log('data', getValues('image_${editableDishId}'));
        
        // Only proceed when editableDishId is set (i.e., save action triggered)
        if (editableDishId) {
            const updatedDishName = getValues(`name_${editableDishId}`);
            const updatedDishPrice = getValues(`price_${editableDishId}`);
            const updatedDishCategory = getValues(`category_${editableDishId}`);
            const updatedDishImage = getValues(`image_${editableDishId}`);
            const updatedDishDescription = getValues(`description_${editableDishId}`);

                // delete the previous image of the dish before udating content of the dish
                const deleteImageResponse = await dish.deleteImage(toBeDeleteImageId);
                if (!deleteImageResponse) {
                    toast.error('Failed to delete image dish');
                    return;
                }
                // upload the new image of the dish before udating content of the dish
                const uploadDishImage = await dish.uploadImage(updatedDishImage[0], editableDishId);
                // now update the dish with new content
                const updatedDishResponse = await dish.updateDish({
                    name: updatedDishName,
                    price: updatedDishPrice,
                    category: updatedDishCategory,
                    image: updatedDishImage,
                    description: updatedDishDescription,
                    ID: editableDishId
                } );
                
                // toast message based on the response
                if (updatedDishResponse.$id) {
                    toast.success('Dish updated successfully');
                } else if (updatedDishResponse === 'Image is not provided') {
                    toast.error('Image is not provided');
                } else {
                    toast.error('Failed to update dish');
                }
        }
    };
    const deleteDish = async (id) => {
            // delete the image of the dish before deleting the dish
            const imageDeleteResponse = await dish.deleteImage(id);
            if (!imageDeleteResponse) {
                toast.error('Failed to delete image');
                return;
            }else{
                setToBeDeleteImageId(null);
            }
            // delete the dish
            const deleteResponse = await dish.deleteDish({ ID: id });
            if (deleteResponse) {
                toast.success('Dish deleted successfully');
                setRefresh(!refresh);
            } else {
                toast.error('Failed to delete dish');
            }
    };

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
                        {dishes.map((dish1) => (
                            <tr key={dish1.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <Input 
                                        {...register(`name_${dish1.id}`, { required: "Enter dish name" })}
                                        type="text"
                                        value={dish1.name}
                                        disabled={dish1.id !== editableDishId}
                                        className={dish1.id !== editableDishId ? 'border-none w-36' : 'border-1 border-secondary w-36'}
                                        onChange={(e) => handleDishChange(dish1.id, 'name', e.target.value)}
                                    />
                                </th>
                                <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap">
                                    <Input 
                                        {...register(`price_${dish1.id}`, { required: "Enter price", minLength: { value: 1, message: "Price must be greater than 0" } })}
                                        type="number"
                                        value={dish1.price}
                                        onChange={(e) => handleDishChange(dish1.id, 'price', e.target.value)}
                                        disabled={dish1.id !== editableDishId}
                                        className={dish1.id !== editableDishId ? 'border-none w-16' : 'border-1 border-secondary w-16'}
                                    />
                                </th>
                                <td className="px-2 py-1">
                                    <Input 
                                        {...register(`category_${dish1.id}`)}
                                        type="text"
                                        value={dish1.category}
                                        disabled={dish1.id !== editableDishId}
                                        className={dish1.id !== editableDishId ? 'border-none w-36' : 'border-1 border-secondary w-36'}
                                        onChange={(e) => handleDishChange(dish1.id, 'category', e.target.value)}
                                    />
                                </td>
                                <td className="px-2 py-1">
                                    {dish1.id !== editableDishId ? (
                                    <img src={dish.getDishImagePreview(dish1.id)} alt={dish1.name} className="w-20 h-15" />
                                    ) : (
                                    <Input
                                        {...register(`image_${dish1.id}`)}
                                        className={`${dish1.id !== editableDishId ? 'border-none' : ''} w-36`} 
                                        type="file"
                                        disabled={dish1.id !== editableDishId}
                                        onClick={() => {
                                            if (dish1.id === editableDishId) {
                                              setToBeDeleteImageId(dish1.id);
                                            }
                                        }}
                                    />
                                    )}
                                </td>
                                <td className="px-2 py-1">
                                    <textarea 
                                        {...register(`description_${dish1.id}`)}
                                        value={dish1.description}
                                        disabled={dish1.id !== editableDishId}
                                        className={`${dish1.id !== editableDishId ? 'border-none' : 'outline-none rounded border focus:border-2 focus:border-secondary'} w-36`}
                                        onChange={(e) => handleDishChange(dish1.id, 'description', e.target.value)}
                                    />
                                </td>
                                <td className="px-2 py-1 space-x-2">
                                    <button 
                                        type="button" // Edit button doesn't submit the form
                                        onClick={() => editButton(dish1.id)} 
                                        className="font-medium text-blue-600 hover:underline cursor-pointer">
                                            {dish1.id !== editableDishId ? 'Edit' : 'Save'}
                                    </button>
                                    <button onClick={() => deleteDish(dish1.id)} className="font-medium text-red-600 hover:underline cursor-pointer">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </form>
    );
}

import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/index';
import fetchCategories from '../../appwrite/addCategory';
import { toast } from 'sonner'

export default function ShowCategoryData({isDishAdded}) {
    const { register, handleSubmit, formState: { errors }, setFocus, setValue, getValues } = useForm();
    const [editableDishId, setEditableDishId] = useState(null); // Dish ID in edit mode
    const [dishes, setDishes] = useState([]); // All dishes fetched from the database
    const [refresh, setRefresh] = useState(false);  // Refresh state for fetching dishes
    const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering dishes
    const [displayDishes, setDisplayDishes] = useState([]); // Filtered dishes based on search query
    const [isUpdating, setIsUpdating] = useState(false); // Loading state for update action
    
    // Fetching all the dishes from the database
    const getCategories = useCallback(async () => {
        try {
            const allDishes = await fetchCategories.getCategories();            
            if (allDishes) {
                const newDishes = allDishes.documents.map(dish => ({
                    id: dish.$id,
                    category: dish.category,
                    originalCategory: dish.category // Keep the original category for filtering
                }));
                setDishes(newDishes);
                setDisplayDishes(newDishes);
            }
        } catch (error) {
            toast.error('Failed to fetch dish categories');
        }
    }, [refresh, isDishAdded]);

    useEffect(() => {
        getCategories();        
    }, [getCategories]);

    // Filter dishes based on search query
    useEffect(() => {
        const filtered = dishes.filter(dish => 
            dish.originalCategory.toLowerCase().includes(searchQuery.toLowerCase()) 
        );
        setDisplayDishes(filtered);
    }, [searchQuery, dishes]);

    const editButton = (id) => {
        // Toggle edit mode for the dish
        setEditableDishId(id === editableDishId ? null : id); 
        if (editableDishId) {
            // Save the changes when the user clicks on the Save button
            onSubmit(); 
        }
    };

    const handleDishChange = useCallback((id, field, value) => {
        setDisplayDishes(prevDishes => 
            prevDishes.map(dish => 
                dish.id === id ? { ...dish, [field]: value } : dish
            )
        );
    }, []);

    const onSubmit = async (data) => {
        setIsUpdating(true);
        // Only proceed when editableDishId is set (i.e., save action triggered)
        if (editableDishId) {
            const updatedDishCategory = getValues(`category_${editableDishId}`);
            const updatedDishImage = getValues(`image_${editableDishId}`);

             // delete the previous image of the dish before udating content of the dish
             if (updatedDishImage && updatedDishImage[0]) {
                const deleteImageResponse = await fetchCategories.deleteImage(editableDishId);
                // upload the new image of the dish before udating content of the dish
                const uploadDishImage = await fetchCategories.uploadImage(updatedDishImage[0], editableDishId);
                if (!deleteImageResponse) {
                    toast.error('Failed to delete image dish');
                    return;
                }  
            }

                // now update the dish with new content
                const updatedDishResponse = await fetchCategories.updateCategory({
                    category: updatedDishCategory,
                    ID: editableDishId,
                });
                
                // toast message based on the response
                if (updatedDishResponse.$id) {
                    setRefresh(prevRefresh => !prevRefresh);
                    toast.success('Category updated successfully');
                    setSearchQuery(''); // Reset the search query
                    setEditableDishId(null);
                } else {
                    toast.error('Failed to update Category');
                }
            }
            setIsUpdating(false);
            
    };
    
    const deleteDish = async (id) => {
            // delete the image of the dish before deleting the dish
            
            const imageDeleteResponse = await fetchCategories.deleteImage(id);
            if (!imageDeleteResponse) {
                toast.error('Failed to delete image');
                return;
            }
            // delete the dish
            const deleteResponse = await fetchCategories.deleteCategory({ ID: id });
            if (deleteResponse) {
                toast.success('category deleted successfully');
                setRefresh(prevRefresh => !prevRefresh);
            } else {
                toast.error('Failed to delete category');
            }
    };

    return (
        <>     
            <div className="relative overflow-x-auto sm:rounded-lg mx-10 mt-4 translate-y-10">
                {/* search bar */}
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mb-2">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        id="table-search" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-68 bg-gray-50 focus:ring-secondary focus:border-secondary" 
                        placeholder="Search for dishes"
                    />
                </div>
            </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
                {/* Table */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs uppercase bg-secondary text-white">
                        <tr>
                            <th scope="col" className="text-center py-3">No.</th>
                            <th scope="col" className="px-2 py-3">Category</th>
                            <th scope="col" className="px-2 py-3">Image</th>
                            <th scope="col" className="px-2 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayDishes.map((dish1, index) => (
                            <tr key={dish1.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                <th scope="row" className="text-center py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {index + 1}
                                </th>
                                <th scope="row" className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                                    <Input 
                                        {...register(`category_${dish1.id}`)}
                                        type="text"
                                        value={dish1.category}
                                        onChange={(e) => handleDishChange(dish1.id, 'category', e.target.value)}
                                        disabled={dish1.id !== editableDishId}
                                        className={dish1.id !== editableDishId ? 'border-none w-full' : 'border-1 border-secondary w-full'}
                                    />
                                </th>
                                <td className="px-2 py-1">
                                {dish1.id !== editableDishId ? (
                                    !isUpdating && dish1.category ? (  // Only show the image after update
                                        <img src={fetchCategories.getDishImagePreview(dish1.id)} alt={dish1.name} className="w-20 h-15" />
                                    ) : (
                                        <div className="w-20 h-15 bg-gray-200">Loading...</div>  // Loading placeholder
                                    )
                                ) : (
                                    <Input
                                        {...register(`image_${dish1.id}`)}
                                        className={`${dish1.id !== editableDishId ? 'border-none' : ''} w-36`} 
                                        type="file"
                                        disabled={dish1.id !== editableDishId}
                                    />
                                    )}
                                </td>
                                <td className="px-2 py-1 space-x-2">
                                    <button 
                                        type="button"
                                        onClick={() => editButton(dish1.id)} 
                                        className="font-medium text-blue-600 hover:underline cursor-pointer">
                                            {dish1.id !== editableDishId ? 'Edit' : 'Save'}
                                    </button>
                                    <button 
                                        onClick={() => deleteDish(dish1.id)} 
                                        className="font-medium text-red-600 hover:underline cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </form>
    </>
    );
}
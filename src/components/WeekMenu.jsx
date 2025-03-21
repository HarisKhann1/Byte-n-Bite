import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from './index'
import beefHaleemImage from '../assets/images/Beef Haleem.jpg'
import { useParams } from 'react-router-dom';
import { use } from 'react';
import appwriteDishService from '../appwrite/addDish'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/addToCartSlice'
import { toast } from 'sonner';

export default function WeekMenu({ category }) {
    
    const { categoryName } = useParams();
    const [filteredDishes, setFilteredDishes] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();

    const fetchDishesByCategory = async () => {
        try {
            const response = await appwriteDishService.getFilterDishes(categoryName ? categoryName : category);
            if (response) {
                const data = response.documents.map((item) => {
                    return {
                        id: item.$id,
                        name: item.name,
                        price: item.price,
                        description: item.description,
                    };
                });
                setFilteredDishes(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchDishesByCategory();
    }, [categoryName])
    
    const orderBtnHandler = (id, name, price) => {
        if (authStatus) {
            dispatch(addToCart({id, name, price}));
            toast.success('Dish added to cart');
        }
    }

    return (
        <Container>
            <section className={`${category ? '' : 'my-20'}`}>
                <div className='py-8 flex flex-col gap-8'>
                    <div className='flex justify-between items-center flex-wrap gap-2'>
                        <h2 className='text-secondary text-[1.2rem] font-medium md:font-semibold md:text-3xl lg:text-4xl'>{categoryName ? categoryName : category} Menu</h2>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-4'>
                        {/* card */}
                        { filteredDishes.map((item, idx) => (
                            <div key={item.id} className='flex gap-4 flex-col rounded-2xl shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105'>
                                <div>
                                    <img 
                                        className='w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105'
                                        src={appwriteDishService.getDishImagePreview(item.id)} 
                                        alt={item.name} 
                                    />
                                </div>
                                <div className='px-4 pb-4 flex flex-col gap-3'>
                                    <div className='flex gap-4 flex-wrap justify-between items-center'>
                                        <h3 className='font-medium'>{ item.name }</h3>
                                        <p className='text-secondary text-sm'>Rs.{ item.price }</p>
                                    </div>
                                    <p className='text-gray-600 text-sm'>{ item.description }</p>
                                    <Link to={!authStatus ? '/login' : ''}>
                                        <Button 
                                            onClick={() => orderBtnHandler(item.id, item.name, item.price)}
                                            type='button' 
                                            className='bg-primary text-sm font-medium w-32 sm:max-w-36 text-center cursor-pointer'>
                                                Add to cart
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )) }
                        {/* card end */}
                    </div>
                </div>
            </section>
        </Container>
    )
}

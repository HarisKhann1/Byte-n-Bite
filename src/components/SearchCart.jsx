import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {addToCart} from '../store/addToCartSlice'
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Container, Button } from './index';
import appwriteDishService from '../appwrite/addDish';

export default function SearchCart({ id, name, price, description }) {
    
    const authStatus = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();

    const orderBtnHandler = (id, name, price) => {
        if (authStatus) {
            dispatch(addToCart({id, name, price}));
            toast.success('Dish added to cart');
        }
    }
    return (
        <Container>
            <section>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10'>
                        {/* card */}
                            <div className='flex gap-4 flex-col rounded-2xl shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105'>
                                <div>
                                    <img 
                                        className='w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105'
                                        src={appwriteDishService.getDishImagePreview(id)} 
                                        alt={name} 
                                    />
                                </div>
                                <div className='px-4 pb-4 flex flex-col gap-3'>
                                    <div className='flex gap-4 flex-wrap justify-between items-center'>
                                        <h3 className='font-medium'>{ name }</h3>
                                        <p className='text-secondary text-sm'>Rs.{ price }</p>
                                    </div>
                                    <p className='text-gray-600 text-sm'>{ description }</p>
                                    <Link to={!authStatus ? '/login' : ''}>
                                        <Button 
                                            onClick={() => orderBtnHandler(id, name, price)}
                                            type='button' 
                                            className='bg-primary text-sm font-medium w-32 sm:max-w-36 text-center cursor-pointer'>
                                                Add to cart
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        {/* card end */}
                    </div>
            </section>
        </Container>
    )
}

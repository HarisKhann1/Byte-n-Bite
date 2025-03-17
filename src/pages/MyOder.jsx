import React, { useEffect, useState } from 'react';
import { Button, Container, Input } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from '../store/addToCartSlice';
import orderService from '../appwrite/order'
import { toast } from 'sonner';
import Order from '../components/order';
import authService from '../appwrite/auth'

export default function MyOrders(props) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const authData = useSelector((state) => state.auth.userData);    
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [user_id, setUser_id] = useState('')
    const authStatus = useSelector((state) => state.auth.status);


    // Sync Redux cart state to localStorage when cart changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart)); // Sync Redux cart to localStorage
        }
    }, [cart]);

    const getUser_id = async () => {
        const response = await authService.getCurrentUser();
        if (response) {            
            setUser_id(response.$id);            
        }
    }
    // Sync the Redux store with localStorage only on initial mount (when the component first loads)
    useEffect(() => {
        getUser_id();
        const data = localStorage.getItem('cart');
        if (data && cart.length === 0) { // If there is data in localStorage and the cart is empty
            try {
                const parsedData = JSON.parse(data);
                // Add items to the Redux store if they are not already present
                    parsedData.forEach(dish => {
                        dispatch(addToCart(dish, dish.quantity));
                    });
            } catch (error) {
                console.error('Failed to parse localStorage data:', error);
            }
        }
    }, []); // This effect runs only once when the component mounts.

    // Decrease quantity handler
    const decreaseQuantityHandler = (id) => {
        dispatch(decreaseQuantity({ id }));
    };

    // Increase quantity handler
    const increaseQuantityHandler = (id) => {
        dispatch(increaseQuantity({ id }));
    };

    const orderHandler = async (name, price, quantity, total, id) => {
        
        if (!address || !phone) {
            toast.error('Please provide address and phone number');
            return;
        } else if (!/^\d{11}$/.test(phone)) {  // Regular expression for exactly 11 digits
            toast.error('Phone number must be exactly 11 digits');
            return;
        }  

        const username = authData.name;
        const placeOrderResponse = await orderService.addOrder(name, price, quantity, total, user_id, username, address, phone);
        if (placeOrderResponse) {
            toast.success('Order placed successfully');
            deleteHandler(id);
        }else {
            toast.error('Failed to place order');
        }
    };

    const clearCardHandler = () => {
        dispatch(clearCart());
        localStorage.removeItem('cart');
    };

    const deleteHandler = (id) => {
        if (cart.length === 1) {
            localStorage.removeItem('cart');
        }
        dispatch(removeFromCart(id));
    };  

    return (
        <Container>
            <section className='my-20 flex flex-col gap-10'>
                <div className='flex justify-between items-center flex-wrap gap-2'>
                    <h2 className='text-secondary text-[1.2rem] font-medium md:font-semibold md:text-3xl lg:text-4xl'>Items in Cart</h2>
                </div>
                
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
                    {/* Table */}
                    <button 
                        onClick={clearCardHandler}
                        className='mb-2 text-white bg-secondary px-4 py-2 rounded-md'
                    >
                        clear cart
                    </button>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs uppercase bg-secondary text-white">
                            <tr className='text-center'>
                                <th scope="col" className="text-center px-1 py-3">No.</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-2 py-3">Price</th>
                                <th scope="col" className="px-2 py-3">Quantity</th>
                                <th scope="col" className="px-2 py-3">Total amount</th>
                                <th scope="col" className="px-2 py-3">Address</th>
                                <th scope="col" className="px-2 py-3">Phone</th>
                                <th scope="col" className="px-2 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((dish1, index) => (
                                <tr key={dish1.id} className="text-center bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <th scope="row" className="text-center py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {index + 1}
                                    </th>
                                    <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {dish1.name}
                                    </th>
                                    <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap">
                                        {dish1.price}
                                    </th>
                                    <td className="px-2 py-1 space-x-2 font-semibold text-lg flex lg:flex-row flex-col lg:pt-3 items-center justify-center">
                                        <button
                                            onClick={() => decreaseQuantityHandler(dish1.id)} 
                                            className='ml-1 px-2  bg-secondary text-white'>
                                            -
                                        </button>
                                        <span className='px-2'>
                                            {dish1.quantity}
                                        </span>
                                        <button 
                                            onClick={() => increaseQuantityHandler(dish1.id)}
                                            className='ml-1 px-2 bg-secondary text-white'>
                                            +
                                        </button>
                                    </td>
                                    <td className="px-2 py-1 space-x-2">
                                        {dish1.quantity * dish1.price}
                                    </td>
                                    <td className='px-2 py-1 space-x-2'>
                                         <textarea onChange={(e) => setAddress(e.target.value)} className='space-x-2 pl-2 border border-secondary rounded' name="" id=""></textarea>
                                    </td>
                                    <td className='px-2 py-1 space-x-2'>
                                        <input 
                                            pattern='[0-9]{11}'
                                            onChange={(e) => setPhone(e.target.value)} 
                                            type="tel" 
                                            className='space-x-2 border border-secondary rounded py-2 pl-2' 
                                            placeholder='Enter phone no.'
                                            required
                                        />
                                    </td>
                                    <td className="px-2 py-1 space-x-2">
                                        <button 
                                            onClick={() => orderHandler(dish1.name, dish1.price, dish1.quantity, dish1.quantity * dish1.price, dish1.id)}
                                            className='text-primary text-lg font-medium'>
                                            Order
                                        </button>
                                        <button 
                                            onClick={() => deleteHandler(dish1.id)}
                                            className='text-red-500 text-lg font-medium'>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {cart.length === 0 && (
                                <tr className='text-center'>
                                    <td colSpan='8'>
                                        <h2 className='text-lg font-medium text-secondary'>Cart is empty</h2>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Order id={user_id}/>
            </section>
        </Container>
    );
}
import React,{useEffect, useState} from 'react'
import orderService from '../appwrite/order'
import { useSelector } from 'react-redux';
import { set } from 'react-hook-form';

export default function Order({ id }) {
    const [orders, setOrders] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    const fetchData = async () => {
        const response = await orderService.getOrders(id);        
        setOrders(response.documents);
    }
    
    useEffect(() => {
        if (!authStatus) {
            setOrders([]);
            return;
        }
        fetchData();
    }, [id, authStatus]);
    return (
        <>
            <div className='mt-10 flex justify-between items-center flex-wrap gap-2'>
                 <h2 className='text-secondary text-[1.2rem] font-medium md:font-semibold md:text-3xl lg:text-4xl'>My Orders list</h2>
            </div>
            <table className="-mt-6 w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs uppercase bg-secondary text-white">
                            <tr className='text-center'>
                                <th scope="col" className="text-center px-1 py-3">No.</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-2 py-3">Price</th>
                                <th scope="col" className="px-2 py-3">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((dish1, index) => (
                                <tr key={index} className="text-center bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <th scope="row" className="text-center py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {index + 1}
                                    </th>
                                    <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {dish1.dish_name}
                                    </th>
                                    <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap">
                                        {dish1.price}
                                    </th>
                                    <td className="px-2 py-1 space-x-2">
                                        {dish1.quantity}
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
        </>
    )
}

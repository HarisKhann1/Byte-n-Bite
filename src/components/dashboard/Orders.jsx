import React, {useEffect, useState} from 'react'
import orderService from '../../appwrite/order';
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { DashboardHeader } from '..';

export default function Orders(props) {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const adminAuthStatus = useSelector((state) => state.adminAuth.status);

    useEffect(() => {
        if (!adminAuthStatus) {
            navigate('/dashboard/login');
            return;
        }
        orderService.getAllOrders().then((response) => {
            if (response) {
                setOrders(response.documents);
            }
        });
    }, []);

    return (
        <>
                <DashboardHeader title='Orders List'/>
                <div className='mt-10 lg:mt-32'>
                    <div className='pl-10 my-4 flex justify-between items-center flex-wrap gap-2'>
                             <h2 className='text-secondary text-[1.2rem] font-medium md:font-semibold md:text-3xl lg:text-4xl'>Reservation list</h2>
                    </div>

                    {/* table start */}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs uppercase bg-secondary text-white">
                                <tr className='text-center'>
                                    <th scope="col" className="text-center px-1 py-3">No.</th>
                                    <th scope="col" className="px-6 py-3">Dish</th>
                                    <th scope="col" className="px-2 py-3">Price</th>
                                    <th scope="col" className="px-2 py-3">Quantity</th>
                                    <th scope="col" className="px-2 py-3">Total</th>
                                    <th scope="col" className="px-2 py-3">Name</th>
                                    <th scope="col" className="px-2 py-3">Address</th>
                                    <th scope="col" className="px-2 py-3">Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index} className="text-center bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <th scope="row" className="text-center py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {index + 1}
                                        </th>
                                        <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {order.dish_name}
                                        </th>
                                        <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {order.price}
                                        </th>
                                        <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap">
                                            {order.quantity}
                                        </th>
                                        <td className="px-2 py-1">
                                            {order.total}
                                        </td>
                                        <td className="px-2 py-1">
                                            {order.name}
                                        </td>
                                        <td className="px-2 py-1">
                                            {order.address}
                                        </td>
                                        <td className="px-2 py-1">
                                            {order.phone}
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr className='text-center'>
                                        <td colSpan='8'>
                                            <h2 className='text-lg font-medium text-secondary'>No order yet.</h2>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* table end */}
                </div>
        </>
    )
}

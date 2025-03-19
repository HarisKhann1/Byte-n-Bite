import React, {useEffect, useState} from 'react'
import Container from '../Container'
import reservationService from '../../appwrite/reservation';
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { DashboardHeader } from '..';

export default function ShowReservation(props) {
    const navigate = useNavigate();
    const user_id = useSelector(state => state.adminAuth.status);
    const [reservation, setReservation] = useState([]);
    const adminAuthStatus = useSelector((state) => state.adminAuth.status);

    useEffect(() => {
        if (!adminAuthStatus) {
            navigate('/dashboard/login');
            return;
        }
        reservationService.getAllReservation().then((response) => {
            if (response) {
                setReservation(response.documents);
            }
        });
    }, []);

    return (
        <>
                <DashboardHeader title='Reservation List'/>
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
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-2 py-3">People</th>
                                    <th scope="col" className="px-2 py-3">Phone No</th>
                                    <th scope="col" className="px-2 py-3">Date</th>
                                    <th scope="col" className="px-2 py-3">Start Time</th>
                                    <th scope="col" className="px-2 py-3">End Time</th>
                                    <th scope="col" className="px-2 py-3">Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservation.map((reservation, index) => (
                                    <tr key={index} className="text-center bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <th scope="row" className="text-center py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {index + 1}
                                        </th>
                                        <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {reservation.name}
                                        </th>
                                        <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {reservation.people}
                                        </th>
                                        <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap">
                                            {reservation.phone_no}
                                        </th>
                                        <td className="px-2 py-1">
                                            {reservation.date.split('T')[0]}
                                        </td>
                                        <td className="px-2 py-1">
                                            {reservation.start_time}
                                        </td>
                                        <td className="px-2 py-1">
                                            {reservation.end_time}
                                        </td>
                                        <td className="px-2 py-1">
                                            {reservation.comments}
                                        </td>
                                    </tr>
                                ))}
                                {reservation.length === 0 && (
                                    <tr className='text-center'>
                                        <td colSpan='8'>
                                            <h2 className='text-lg font-medium text-secondary'>No Reservation yet.</h2>
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

import React from 'react'

export default function Table(props) {
    
    return (
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
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                1
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                            <td className="px-6 py-4 space-x-2">
                                <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                                <a href="#" className="font-medium text-red-600 hover:underline">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
    )
}

import React from 'react'
import { Sidebar, DashboardHeader } from '../../components/index'
import { Outlet } from 'react-router-dom'

export function Layout(props) {
    

    return (
        <div className='h-screen flex flex-row'>
            <aside className="">
                <Sidebar />
            </aside>
            <main className="w-full">
                <Outlet />
            </main>
        </div>
    )
}

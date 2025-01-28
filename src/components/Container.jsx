import React from 'react'

export default function Container({ children }) {
    

    return (
        <div className='container mx-auto overflow-hidden px-4 sm:px-6 lg:px-10 xl:px-14'>
            {children}
        </div>
    )
}

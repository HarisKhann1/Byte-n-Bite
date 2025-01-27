import React from 'react'

export default function Container({ children }) {
    

    return (
        <div className='container mx-auto overflow-hidden px-2'>
            {children}
        </div>
    )
}

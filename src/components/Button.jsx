import React from 'react'

export default function Button({ 
    children,
    type = '',
    className = '',
    ...props
 }) {
    

    return (
        <>
           <button type={type} className={ `bg-amber-500 px-4 py-2 rounded-md ${className}` } {...props}>
                {children}
           </button>
        </>
    )
}

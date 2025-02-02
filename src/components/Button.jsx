import React from 'react'

export default function Button({ 
    children,
    type = "button",
    className = '',
    ...props
 }) {
    

    return (
        <>
           <button type={type} className={`bg-primary px-4 py-2 rounded-md ${className}` } {...props}>
                {children}
           </button>
        </>
    )
}

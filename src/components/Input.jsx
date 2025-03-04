import React, {useId} from 'react'

function Input(
{
    label,
    type = 'text',
    className = '',
    placeholder = '',
    ...props
}, 
    ref
) {
    const id = useId();

    return (
        <div>
            {label && <label htmlFor={id} className='block text-secondary font-medium text-lg mb-1'>{ label }:</label>}
            <input
                ref={ref}
                className={`border-1 border-gray-500 rounded outline-none px-2 py-[0.5rem]
                            sm:text-[1rem]  text-gray-700 duration-100 ease-in-out
                             focus:border-2
                            ${className}
                         `} 
                placeholder={placeholder}
                type={type}
                id={id}
                {...props} 
            />
        </div>
    )
}

export default React.forwardRef(Input)



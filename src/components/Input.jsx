import React, {useId} from 'react'

function Input(
{
    label,
    type = 'text',
    className = '',
    placeholder = 'Enter your text here',
    ...props
}, 
    ref
) {
    const id = useId();

    return (
        <div>
            {label && <label htmlFor={id} className='block text-secondary font-medium text-lg mb-1'>{ label }:</label>}
            <input
                className={`border-1 border-gray-500 rounded outline-none px-2 py-[0.5rem]
                            sm:text-[1rem] sm:font-medium text-gray-700 duration-100 ease-in-out focus:border-primary
                             focus:border-2
                            ${className}
                         `} 
                placeholder={placeholder}
                type={type}
                ref={ref} 
                id={id}
                {...props} 
            />
        </div>
    )
}

export default React.forwardRef(Input)

import React from 'react'
import { Container, Button } from './index' 
import friends_section_image from '../assets/images/Friend_Section_Image.jpg'

export default function FreinedsSection(props) {

    return (
        <section>
                <div className='pt-12 flex flex-col gap-6'>
                    <Container>
                        <h2 className='text-xl font-medium md:font-semibold md:text-3xl lg:text-4xl'>Take your friends out to lunch</h2>
                    </Container>
                    <div>
                        <img 
                            className='w-full h-56 lg:h-96 object-cover' 
                            src={friends_section_image} 
                            alt="friends gathered for dinner" 
                        />
                    </div>
                    <div className='flex flex-col gap-2 sm:gap-3 md:gap-4 bg-white p-4 md:p-6 rounded-xl shadow-md sm:max-w-lg md:max-w-2xl -translate-y-20 md:-translate-y-25 mx-10'>
                        <h3 className='text-secondary font-bold md:text-2xl'>Lunch with Friends, Made Easy!</h3>
                        <p className='text-gray-600 text-sm md:text-[16px]'>"Good food, great friends, unforgettable moments—Byte&Bite restaurant has it all. Reserve your table now!"</p>
                        <Button type='button' className='bg-primary text-black text-sm font-medium sm:max-w-36 text-center md:px-5 md:py-3 cursor-pointer hover:bg-amber-500  transition-transform duration-300 transform hover:scale-110'>
                            Reserve a table
                        </Button>
                    </div>
                </div>
        </section>
    )
}

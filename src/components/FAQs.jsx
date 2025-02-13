import React from 'react'
import { Container } from './index'
import downArrow from '../assets/images/angle_down.png'

export default function FAQs(props) {
    const [openId, setOpenId] = React.useState(null)

    const faqs = [
        {
            id: 1,
            question: 'What is Byte&Bite restaurant?',
            answer: 'Byte&Bite is a restaurant that offers a variety of delicious meals and unforgettable moments.'
        },
        {
            id: 2,
            question: 'What is the restaurant\'s location?',
            answer: 'Byte&Bite is located at 1234 Byte&Bite street, Biteville, Byte Country.'
        },
        {
            id: 3,
            question: 'What are the restaurant\'s hours of operation?',
            answer: 'Byte&Bite is open from 9:00 AM to 9:00 PM every day of the week.'
        },
        {
            id: 4,
            question: 'Does the restaurant offer catering services?',
            answer: 'Yes, Byte&Bite offers catering services for all types of events.'
        },
        {
            id: 5,
            question: 'Does the restaurant offer delivery services?',
            answer: 'Yes, Byte&Bite offers delivery services within a 10-mile radius.'
        },
        {
            id: 6,
            question: 'Does the restaurant offer vegan and vegetarian options?',
            answer: 'Yes, Byte&Bite offers a variety of vegan and vegetarian options.'
        },
    ]

    return (
       <section className='-mt-6 py-20 bg-[#ebf1f4]'>
            <Container>
                <div className='flex flex-col gap-6 pb-3'>
                    <h2 className='text-xl font-medium md:font-semibold md:text-3xl lg:text-4xl'>Frequently Asked Questions</h2>
                    <div className='flex flex-col gap-4'>
                        {
                            faqs.map((faq, idx) => (
                                <div key={faq.id} className={`py-3 px-5 rounded-xl shadow md:max-w-2xl lg:max-w-3xl flex flex-col gap-2 
                                    ${openId === faq.id ? 'border border-secondary' : ''}`
                                }>    
                                    <div className='flex justify-between items-start gap-2'>
                                        <h3 className='text-sm sm:text-lg font-medium sm:font-semibold w-[85%]'>{faq.question}</h3>
                                        <button onClick={() => setOpenId(openId === faq.id ? null : faq.id)} className='focus:outline-none'>
                                            <img 
                                                className={`transform ${openId === faq.id ? 'rotate-180' : 'rotate-0'} w-4 h-4 sm:w-6 sm:h-6 cursor-pointer`}
                                                src={downArrow} 
                                                alt="down arrow" 
                                            />
                                        </button>
                                    </div>
                                    <div className={`transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-40' : 'max-h-0'}`}>
                                        <p className={`${openId === faq.id ? 'block' : 'hidden'} text-gray-500 text-sm sm:text-[16px] mt-2`}>{ faq.answer }</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Container>
       </section>
    )
}

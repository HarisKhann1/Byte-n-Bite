import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from './index'
import beefHaleemImage from '../assets/images/Beef Haleem.jpg'
import appwriteCategoryService from '../appwrite/addCategory'

export default function Category(props) {
    const [categories, setCategories] = useState([])

    const fetchCategories = async () => {
        try {
            const response = await appwriteCategoryService.getCategories()
            if (response) {
                const data = response.documents.map((item) => {
                    return {
                        id: item.$id,
                        categoryName: item.category,
                    }
                })
                setCategories(data)
            }
        } catch (error) {
            console.error('error', error)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <Container>
            <section>
                <div className='py-8 flex flex-col gap-8'>
                    <div className='flex justify-between items-center flex-wrap gap-2'>
                        <h2 className='text-[1.2rem] font-medium md:font-semibold md:text-3xl'>Discover Our Exciting Range of Categories!</h2>
                        <Link to={'/menu'}>
                        <Button type='button' className='bg-primary text-sm font-medium w-32 sm:max-w-36 text-center cursor-pointer'>
                            Explore menu
                        </Button>
                        </Link>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-4'>
                        {/* card */}
                        { categories.map((item, idx) => (
                            <div key={item.id} className='flex gap-4 flex-col rounded-2xl shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105'>
                                <div>
                                    <img 
                                        className='w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105'
                                        src={appwriteCategoryService.getDishImagePreview(item.id)} 
                                        alt={item.categoryName} 
                                    />
                                </div>
                                <div className='px-4 pb-4 flex flex-col gap-3'>
                                    <div className='flex gap-4 flex-wrap justify-between items-center'>
                                        <h3 className='font-medium'>{ item.categoryName }</h3>
                                    </div>
                                    <Link to={`/category/${item.categoryName}`}>
                                        <Button type='button' className='bg-primary text-sm font-medium w-32 sm:max-w-36 text-center cursor-pointer'>
                                            View all items
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )) }
                        {/* card end */}
                    </div>
                </div>
            </section>
        </Container>
    )
}

import React, {useEffect, useState} from 'react'
import { Container } from '../components';
import categoryService from '../appwrite/addCategory';
import DishByCategory from '../components/WeekMenu'

export default function Menu(props) {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);

    const fetchMenu = async () => {
        // Fetch menu from API
        setLoading(true);
        const categoryResponse = await categoryService.getCategories();
        
        if (categoryResponse) {
            setCategory(categoryResponse.documents);
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchMenu();
    }, []);

    return (
        <div className='my-16'>
            <Container>
                {
                    loading ? <h1>Loading...</h1> : 
                    category.map((item) => {
                        <h2 className='text-secondary text-[1.2rem] font-medium md:font-semibold md:text-3xl lg:text-4xl'>{item.category} Menu</h2>
                        return <DishByCategory category={item.category} key={item.$id} />
                    })
                }
            </Container>
        </div>
    )
}

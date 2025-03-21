import { useLocation } from 'react-router-dom'
import { Container, WeekMenu } from '../components/index'
import SearchCart from '../components/SearchCart';
import React, { useState, useEffect, useRef } from 'react'
import disheService from '../appwrite/addDish'
import { useNavigate } from 'react-router-dom';

export default function SearchDish(props) {
    const location = useLocation();
    const filteredMenuLocation = location.state.filteredMenu || [];
    const search = location.state.search || '';
    const [searchInput, setSearch] = useState('');

    const [menu, setMenu] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);
    const searchInputRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const fetchMenuResponse = await disheService.getDishes();
                if (fetchMenuResponse) {
                    setMenu(fetchMenuResponse.documents);
                }
            } catch (error) {
                console.log('Error fetching menu:', error);
            }
        }

        fetchMenu();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        const search = searchInputRef.current.value;
        if (!search) {
            // If search is empty, return null
            return;
        }
        setSearch(search);

        const filtered = menu.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredMenu(filtered);
        navigate('/search', { state: { filteredMenu: filtered}});
        searchInputRef.current.value = ''; // Reset the input field
    }
    return (
        <div className='mt-20'>
            <Container>
                {/* search Input start */}
                <div className='flex justify-end mb-4'>
                <form className="bg-secondary rounded-2xl" onSubmit={submitHandler}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative w-[14rem] md:w-md">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        id="default-search" 
                        ref={searchInputRef}
                        className="block w-full pr-24 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none"
                        placeholder="dish name"
                        required 
                    />
                    <button type="submit" className="text-white absolute end-0 bottom-0 bg-secondary md:bg-primary md:hover:bg-[#f57c0b] hover:bg-[#2c3a35] cursor-pointer font-medium rounded-lg text-sm px-4 py-2">
                        Search
                    </button>
                </div>
            </form>
                </div>
                {/* search Input end */}

                <h2 className='text-secondary text-[1.4rem] font-medium md:font-semibold md:text-3xl lg:text-4xl mb-10 mt-5'>Showing result for: { search ? search : searchInput } </h2>
                {/* Display filtered menu */}
                {filteredMenuLocation.length > 0 ? (
                    filteredMenuLocation.map(dish => (
                        <SearchCart 
                            key={dish.$id} 
                            id={dish.$id}  
                            name={dish.name}
                            price={dish.price}
                            description={dish.description}
                        />
                    ))
                ) : (
                    <h2 className='text-center bg-red-400 p-3 rounded-xl text-[1.4rem] font-medium md:font-semibold md:text-3xl mb-10 mt-5'>No dishes found </h2>
                )}
                </Container>
        </div>
    )
}

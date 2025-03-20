// src/components/Sidebar.jsx
import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../store/adminAuthSlice'
import auth from '../../appwrite/auth'
import { useSelector } from 'react-redux';

const Sidebar = () => {
        const adminAuth = useSelector((state) => state.adminAuth.status);

        const dispatch = useDispatch();
        const navItem = [
                { title: 'Add Dish', link: '/dashboard/add-dish' },
                { title: 'Add Category', link: '/dashboard/add-category' },
                { title: 'Orders', link: '/dashboard/order' },
                { title: 'Reservations', link: '/dashboard/reservations' },
        ]
        const handleLogout = async () => {
                dispatch(adminLogout()); 
        };
        

return (
            <div className="bg-gray-800 w-72 p-5 text-white h-screen hidden lg:block">
                    <div className='hidden md:block text-center'>
                            <h2 className='border-2 border-secondary py-2 font-medium px-4 rounded-2xl'>Byte&Bite Dashboard</h2>
                    </div> 
                    <nav className="mt-10 font-medium">
                        {navItem.map((nav) => (
                        <NavLink to={nav.link} key={nav.title} 
                                className={({isActive}) => isActive ? 'border border-primary block py-2 px-4 hover:bg-gray-700 rounded' : 'block py-2 px-4'}
                        >
                                {nav.title}
                        </NavLink>
                        ))}
                    </nav>
                    {adminAuth ? (
                    <button 
                            onClick={handleLogout}
                            className="mt-8 py-2 px-4 bg-red-600 rounded text-white w-full hover:bg-red-700">
                                    Logout
                    </button>
                        ) : (
                                <Link 
                                to='/dashboard/login' 
                                        className='font-medium block py-2 px-4 mt-5 bg-primary text-white rounded hover:bg-primary-dark'>
                                        Login
                                </Link>
                        )}
            </div>
    );
};

export default Sidebar;

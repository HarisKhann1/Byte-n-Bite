import React, {useEffect} from 'react'
import AddCateg from '../../components/dashboard/AddCategory'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function AddCategory(props) {
    const navigate = useNavigate();
    const adminAuthStatus = useSelector((state) => state.adminAuth.status);

    useEffect(() => {
        if (!adminAuthStatus) {
            navigate('/dashboard/login');
        }
    }, [adminAuthStatus]);

    return (
        <>
            {adminAuthStatus && <AddCateg />}
        </>
    )
}

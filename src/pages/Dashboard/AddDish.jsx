import React, {useEffect} from 'react'
import {AddDishes} from '../../components/index'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function AddDish(props) {
    const navigate = useNavigate();
    const adminAuthStatus = useSelector((state) => state.adminAuth.status);

    useEffect(() => {
        if (!adminAuthStatus) {
            navigate('/dashboard/login');
        }
    }, [adminAuthStatus]);

    return (
        <>
            { adminAuthStatus && <AddDishes />}
        </>
    )
}

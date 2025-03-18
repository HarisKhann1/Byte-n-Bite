import React, {useEffect} from 'react'
import { ReservationForm } from '../components/index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
export default function Reservation(props) {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authStatus) {
            navigate('/login');
        }
    }, [authStatus]);
    return (
        <section>
            {authStatus && <ReservationForm />}
        </section>
    )
}

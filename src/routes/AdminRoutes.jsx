import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const AdminRoutes = ({children}) => {

    const {user, loading} = useAuth();
    
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation()

    if(loading || isAdminLoading){
        return <process className="process w-56 "></process>
    }
    
    if (user && isAdmin ) {
        return children
    }
    


    return ( 
        toast.warning('Please login first!!'),
        <ToastContainer></ToastContainer>,
    <Navigate state={{from: location}} to="/" replace></Navigate>
    
    );
};

export default AdminRoutes;
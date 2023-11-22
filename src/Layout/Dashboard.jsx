import React from 'react';
import { FaAccessibleIcon, FaBook, FaCalendar, FaCartShopping, FaChrome, FaHouseMedicalCircleCheck, FaUsers, FaUtensils } from 'react-icons/fa6';
import { FaCommentAlt, FaCommentsDollar, FaHome, FaShoppingCart, FaAd , FaList, FaMagnet, FaMenorah } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";
import { NavLink, Outlet } from 'react-router-dom';
import useCarts from '../hooks/useCarts';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {

    const [cart] = useCarts()

    const [isAdmin] = useAdmin();

    const {userLogout} = useAuth();

    const handleLogout = ()=> {
        userLogout()
        .then( () => {
          setTimeout(() => {
            toast.success("Logout Successful");
          }, 200);
          navigate('/login') 
        })
        .catch(error => console.error(error))
      }

    return (
        <div className='flex max-w-screen-xl mx-auto'>
            <div className="w-64 min-h-screen bg-orange-500">
                <ul className='menu  p-4'>
                {
                    isAdmin ? <><li><NavLink to={'/dashboard/'}><FaHome/> Admin Home</NavLink></li>
                    <li><NavLink to={'/dashboard/add-items'}><FaUtensils/> Add Items</NavLink></li>
                    <li><NavLink to={'/dashboard/manage-item'}><FaList/> Manage Items</NavLink></li>
                    <li><NavLink to={'/dashboard/paymenthistory'}><FaList/> Admin Payment History</NavLink></li>
                    <li><NavLink to={'/dashboard/booking'}><FaBook/>Manage Bookings</NavLink></li>
                    <li><NavLink to={'/dashboard/users'}><FaUsers/>All Users</NavLink></li></> 
                    : <>
                    <li>
                                    <NavLink to="/dashboard/">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation">
                                        <FaCalendar></FaCalendar>
                                        Reservation</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaAd></FaAd>
                                        Add a Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/paymenthistory'}><FaList/> Payment History</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaList></FaList>
                                        My Bookings</NavLink>
                                </li>
                    </>
                }
                <div className='divider'>OR</div>
                <li><NavLink to={'/'}><FaHome/> Home</NavLink></li>
                <li><NavLink to={'/menu'}><HiMenuAlt1/> Menu</NavLink></li>
                <div className='divider'>OR</div>
                <li onClick={handleLogout} className='btn btn-sm capitalize hover:bg-orange-600 hover:text-white'>Logout</li> 

                </ul>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
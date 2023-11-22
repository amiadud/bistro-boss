import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaCartFlatbed } from "react-icons/fa6";
import useAuth from '../../hooks/useAuth';
import useCarts from '../../hooks/useCarts';
import Swal from 'sweetalert2';

const Header = () => {

  const [cart] = useCarts();
  console.log(cart);

  const navigate = useNavigate();

  const {user, userLogout} = useAuth();

  const handleLogout = ()=> {
    userLogout()
    .then( () => {
      setTimeout(() => {
        Swal.fire({
          title: "Logout Success!",
          icon: "success"
        });
      }, 200);
      navigate('/login') 
    })
    .catch(error => console.error(error))
  }

    const navLinks = <>
            <li ><NavLink to={'/'}>Home</NavLink></li>
            <li ><NavLink to={'/menu'}>Our Menu</NavLink></li>
            <li ><NavLink to={'/order/salad'}>Our Order</NavLink></li>
            <li ><NavLink to={'/'}>Secret</NavLink></li>
            <li className='btn btn-sm flex items-center'><NavLink to={'/dashboard/cart'}><FaCartFlatbed />{cart.length}</NavLink></li>
            {user ? <li onClick={handleLogout} className='btn btn-sm capitalize hover:bg-orange-600 hover:text-white'>Logout</li> 
            :
             <>
              <li ><NavLink className=" capitalize bg-slate-500 hover:bg-orange-600 hover:text-white" to={'/login'}>Login</NavLink></li>
             </>}
    </>

    return (
        <>
          <div className=" max-w-screen-xl navbar fixed z-50 bg-opacity-60 text-white bg-gray-600">
  <div className="navbar-start">
    <div className="dropdown ">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu  menu-sm  dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <div className='space-y-2 '>
        {navLinks}
        </div>
      </ul>
    </div>
    <a className="btn btn-primary  normal-case text-xl">Bistro Bos</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu  menu-horizontal  px-1">
    <div className='flex gap-2 '>
        {navLinks}
    </div>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Get Started</a>
  </div>
</div>  
        </>
    );
};

export default Header;
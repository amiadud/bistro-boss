import React from 'react';
import Header from '../components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Footer/Footer';

const MainLayout = () => {

    const location = useLocation();
    console.log(location);

    const hideNavFooter = location.pathname.includes('login') || location.pathname.includes('register')

    return (
        <div className='max-w-screen-xl mx-auto '>
            {hideNavFooter || <Header/>}
            <Outlet/>
            {hideNavFooter || <Footer/>}
        </div>
    );
};

export default MainLayout;
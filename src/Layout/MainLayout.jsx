import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='max-w-screen-xl mx-auto '>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;
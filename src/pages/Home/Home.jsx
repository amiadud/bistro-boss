import React from 'react';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import Banner2 from './Banner2/Banner2';
import PopularMenu from './PopularMenu/PopularMenu';
import ContactNum from './ContactNum/ContactNum';
import CardItem from './CardItem/CardItem';
import Featured from './Featured/Featured';
import Testimonials from './Testimonials/Testimonials';
import { Helmet } from 'react-helmet';

const Home = () => {

    
    return (
        <div className=''>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>

            <Banner/>
            <Category/>
            <Banner2/>
            <PopularMenu/>
            <ContactNum/>
            <CardItem/>
            <Featured/>
            <Testimonials/>
        </div>
    );
};

export default Home;
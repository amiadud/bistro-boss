import React from 'react';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import Banner2 from './Banner2/Banner2';
import PopularMenu from './PopularMenu/PopularMenu';
import ContactNum from './ContactNum/ContactNum';
import CardItem from './CardItem/CardItem';

const Home = () => {
    return (
        <div className=''>
            <Banner/>
            <Category/>
            <Banner2/>
            <PopularMenu/>
            <ContactNum/>
            <CardItem/>
        </div>
    );
};

export default Home;
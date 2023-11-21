import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import featuredImg from '/home/featured.jpg'

const Featured = () => {
    return (
        <div 
        style={{backgroundImage: 'url(/home/featured.jpg)'}}
        className=' bg-cover items-center hero relative bg-no-repeat my-4 pb-5 md:pb-0  md:h-[550px]'>
<div className='hero-overlay bg-black bg-opacity-60'></div>
<div className='absolute md:top-10 ' >
<SectionTitle
                    heading={'Check it out'}
                    subHeading={'FROM OUR MENU'}
        />
        <div className='flex gap-10 hero-content justify-between items-center '>
            
        <div className='flex-1 flex justify-end items-center  py-10'>
            <img className='md:w-7/12' src="./home/featured.jpg" alt="" />
        </div>
        <div className='flex-1  text-white pr-20 '>
            <h2 className='text-xl'>March 20, 2023</h2>
            <h2>WHERE CAN I GET SOME?</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
            <button className='btn btn-outline border-t-0 border-r-0 border btn-success border-b-4 border-l-0'>Read More</button>
        </div>
        </div>
</div>
            </div>
    );
};

export default Featured;
import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

//import category image

import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const Category = () => {
    return (
        <div>
            <SectionTitle 
            heading={'From 11.00 am to 10.00pm'} 
            subHeading={"Order Online"}
            />

<Swiper
        slidesPerView={4}
        spaceBetween={70}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
        <div className='flex justify-center'>
        <img src={slide1} alt="" />
        </div>
            <h2 className='-mt-16 text-white rounded-lg  text-4xl uppercase text-center'>Salads</h2>
            </SwiperSlide>
        <SwiperSlide>
        <div className='flex justify-center'>
        <img src={slide2} alt="" />
        </div>
            <h2 className='-mt-16 pb-5 text-white  text-4xl uppercase text-center'>Soups</h2>
            </SwiperSlide>
        <SwiperSlide>
        <div className='flex justify-center'>
        <img src={slide3} alt="" />
        </div>
            <h2 className='-mt-16 text-4xl text-white uppercase text-center'>pizzas</h2>
            </SwiperSlide>
        <SwiperSlide>
        <div className='flex justify-center'>
        <img src={slide4} alt="" />
        </div>
            <h2 className='-mt-16 text-4xl text-white uppercase text-center'>desserts</h2>
            </SwiperSlide>
        <SwiperSlide>
        <div className='flex justify-center'>
        <img src={slide5} alt="" />
        </div>
            <h2 className='-mt-16 text-4xl text-white uppercase text-center'>Salads</h2>
            </SwiperSlide>
      </Swiper>
        </div>
    );
};

export default Category;
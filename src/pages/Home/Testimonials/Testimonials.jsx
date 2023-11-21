import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';


const Testimonials = () => {
    const [reviews, setReviews] = useState([''])
    console.log(reviews);

    useEffect( ()=> {
        fetch('reviews.json')
        .then(res => res.json())
        .then( data => setReviews(data))
    },[])

    return (
        <div>
            <SectionTitle
            heading={'What Our Clients Say'}
            subHeading={'TESTIMONIALS'}
            />

        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {
            reviews.map(review => 
                <SwiperSlide >
                    <div className=' flex flex-col space-y-5 text-center items-center mx-auto mt-10 mb-10'>
                    <Rating
      style={{ maxWidth: 200 }}
      value={review?.rating}
      readOnly
    />
                    <p className='mx-20'>{review?.details}</p>
                    <h2 className='text-2xl text-yellow-600'>{review?.name}</h2>
                    </div>
                    </SwiperSlide> 
                )
        }
      </Swiper>

        </div>
    );
};

export default Testimonials;
import React from 'react';

import bannerimg from '/home/chef-service.jpg'

const Banner2 = () => {
    return (
        <div >
            <div className= {`bg-[url('${bannerimg}')]  my-5 md:bg-cover md:bg-no-repeat bg-center  `}>
            <div className=' w-10/12 md:w-10/12 mx-auto md:h-[450px] flex justify-center items-center '>
                    <div className='bg-white md:h-[250px] rounded-lg  flex justify-center  items-center' >
                    <div className='space-y-4  '>
                    <h2 className='text-4xl uppercase text-center'>Bistro Boss</h2>
                    <p className='mx-40 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner2;
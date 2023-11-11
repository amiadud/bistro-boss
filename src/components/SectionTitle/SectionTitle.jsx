import React from 'react';

const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className='w-4/12   mx-auto my-3 text-center' >
            <h2 className='text-lg italic text-[#D99904]'>---{heading}---</h2>
            <div className='border-y-2 py-3 mt-2'>
            <h3 className='uppercase text-4xl'>{subHeading}</h3>
            </div>

        </div>
    );
};

export default SectionTitle;
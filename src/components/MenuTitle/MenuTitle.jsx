import React from 'react';

const MenuTitle = ({menuTitle, menuDes, menuPrice}) => {
    return (
        <div>
            <h2 className='text-lg uppercase font-medium'>{menuTitle}</h2>
            <p className='text-base text-gray-500 '>{menuDes}</p>
            <h2 className='text-base text-[#BB8506] font-normal'>{menuPrice}</h2>
        </div>
    );
};

export default MenuTitle;
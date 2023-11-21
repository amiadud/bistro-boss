import React from 'react';

const OrderPage = ({items, page, setPage}) => {
    return (
        <div className=" my-6">
        {items.map(( item, index)=> 
        <button onClick={()=> setPage(index)} 
        className={` rounded-md btn-sm md:btn-sm ml-2 ${page == index ? " bg-violet-800 text-white" : " text-white bg-violet-600  "}  `}>
            {index + 1}</button>
        
        )}
</div>
    );
};

export default OrderPage;
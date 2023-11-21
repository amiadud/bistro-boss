import React from 'react';
import OrderCard from '../OrderCard/OrderCard';

const OrderTab = ({items, }) => {



    return (
        <div className='grid grid-cols-3'>
        {
            items.map(item => 
               <OrderCard item = {item._id} items = {item}></OrderCard> 
                )
        }
        </div>
    );
};

export default OrderTab;
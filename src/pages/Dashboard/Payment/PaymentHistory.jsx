import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom/dist';
import { IoBagRemove, IoVolumeHigh } from "react-icons/io5";
import { FaEdit, FaUser, FaUsers } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';

const PaymentHistory = () => {

    const axiosSecure = useAxios();

    const { user } = useAuth()
    
    const { data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async()=> {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data
        }

    })
    console.log(payments);
    return (
        <>
        <SectionTitle heading={'At a Glance!'} subHeading={'PAYMENT HISTORY'}/>
           <h2 className='text-4xl mx-6'>Total Payments:{payments?.length}</h2>
        <div className="overflow-x-auto">
  <table className="table ">
    {/* head */}
    <thead >
      <tr>
        <th>
          <label>
            <h2> No: </h2>
          </label>
        </th>
        <th>Total Price</th>
        <th>TransactionId</th>
        <th>Payment Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
       {
        payments?.map((payment, index) => 
        <tr key={payment?._id} >
        <th>
          <label>
            {index + 1}
          </label>
        </th>
        <td>
            ${payment?.price}
        </td>
        <td>{payment?.TransactionId}</td>
        <td>{payment?.date}</td>
        <th>
          <h2>{payment?.status}</h2>
        </th>
      </tr>
        
        )
       }

        
      
    </tbody>

  </table>
</div>
    {/* <div className=" my-6">
            {pages.map(( item, index)=> 
            <button key={item._id} onClick={()=> setPage(index)} 
            className={` rounded-md btn-sm md:btn-sm ml-2 ${page == index ? " bg-violet-800 text-white" : " text-white bg-violet-600  "}  `}>
                {index+ 1}</button>
            
            )}
    </div> */}
        </>
    );
};

export default PaymentHistory;
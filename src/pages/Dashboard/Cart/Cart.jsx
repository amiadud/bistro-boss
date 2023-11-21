import React, { useState } from 'react';
import useCarts from '../../../hooks/useCarts';
import { IoBagRemove } from "react-icons/io5";
import Cover from '../../../components/shared/Cover/Cover';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Cart = () => {

    const [cart, refetch] = useCarts();
    const axiosSecure = useAxios()

    const totalPrice = cart.reduce((total, currentItem)=> total + currentItem.price ,0)



    const handleDelete = (_id) => {
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
            
            axiosSecure.delete(`/carts/${_id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Cart has been deleted.",
                        icon: "success"
                      });
                }
            })

            }
          });


    }

    return (
        <>
        <SectionTitle heading={'my Cart'} subHeading={'Wanna Add More?'}/>
        <div className='flex justify-around items-center my-5'>
           <h2 className='text-4xl'>Items:{cart.length}</h2>
           <h2 className='text-4xl'>Total Price: ${totalPrice}</h2>
         {cart.length ?  <Link to={'/dashboard/payment'}>
         <button className='btn btn-primary'>Pay</button>
          </Link> :
          <button disabled className='btn btn-primary'>Pay</button>}

        </div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <h2> No:</h2>
          </label>
        </th>
        <th>Item Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        cart.map((item,index) =>

            <tr>
        <th>
          <label>
            {index+1}
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-15 h-12">
                <img src={item?.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td>
          {item?.name}
          <br/>
        </td>
        <td>${item?.price}</td>
        <th>
          <button onClick={()=> handleDelete(item._id)} className="btn btn-ghost text-2xl text-white outline bg-slate-600"><IoBagRemove/></button>
        </th>
      </tr>
            
            )
      }
      
    </tbody>

  </table>
</div>

        </>
        
    );
};

export default Cart;
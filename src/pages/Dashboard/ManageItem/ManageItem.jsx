import React, { useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { IoBagRemove, IoVolumeHigh } from "react-icons/io5";
import { FaEdit, FaUser, FaUsers } from "react-icons/fa";
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageItem = () => {

  const axiosSecure = useAxios();
  const [page, setPage] = useState(0);


  const {data:{result, postCount}, refetch} = useQuery({
    queryKey: ['items', page],
    queryFn: async()=> {
      const res = await axiosSecure.get(`/items/?page=${page}`)
      return res.data;
  },
  initialData:{result:[], postCount:0}
})
const totalPages = Math.ceil(postCount / 10)
console.log(totalPages);
const pages = [...new Array(totalPages).fill(0)]

    // delete item
    const handleDeleteItem = (items) => {

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
        axiosSecure.delete(`/items/${items._id}`)
        .then(res => {
            console.log(res.data);
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

    const handleUpdateItem = (item) => {
      console.log(item?._id);
    }


    return (
        <>
        <SectionTitle heading={'my Cart'} subHeading={'Wanna Add More?'}/>
           <h2 className='text-6xl'>Items:</h2>

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
        <th>Update</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        result.slice(0,10).map((item,index) =>
            <tr key={item?._id}>
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
        <td><Link to={`/dashboard/update-item/${item?._id}`} className="btn btn-ghost hover:text-black text-white outline-none bg-green-600"><FaEdit className='text-xl'/></Link></td>
        <th>
          <button onClick={()=> handleDeleteItem(item)} className="btn btn-ghost text-2xl hover:text-black text-white outline-none bg-red-600"><IoBagRemove/></button>
        </th>
      </tr>)
      }
      
    </tbody>

  </table>
</div>
    <div className=" my-6">
            {pages.map(( item, index)=> 
            <button key={item._id} onClick={()=> setPage(index)} 
            className={` rounded-md btn-sm md:btn-sm ml-2 ${page == index ? " bg-violet-800 text-white" : " text-white bg-violet-600  "}  `}>
                {index+ 1}</button>
            
            )}
    </div>
        </>
    );
};

export default ManageItem;
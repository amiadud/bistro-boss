import React, { useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useUsers from '../../../hooks/useUsers';
import { MdDelete } from "react-icons/md";
import { FaUser, FaUsers } from "react-icons/fa";
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllUser = () => {

    const [users, refetch]= useUsers();
    const axiosSecure = useAxios();

    // make admin

    const handleMakeAdmin = (user) => {
      axiosSecure.patch(`users/admin/${user._id}`)
      .then(res => {
        console.log(res.data);
        if(res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Good job!",
            icon: "success"
          });
        }
      })
   
    }

    // delete users

    const handleDeleteUser = (user) => {

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
        
        axiosSecure.delete(`/users/${user._id}`)
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

    

    return (
        <div>
            <SectionTitle heading={'How Many??'} subHeading={'Manage All users'}/>
            <h2 className='text-3xl'>Total Users: {users?.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <h2>No.</h2>
          </label>
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map((item, index) =>
          <tr key={item?._id}>
        <th>
          <label>
            {index + 1}
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">{item?.name}</div>
            </div>
          </div>
        </td>
        <td>{item?.email}</td>
        <td> 
          {
            item?.role ? <>Admin</> : <><button onClick={()=> handleMakeAdmin(item)} className='hover:text-blue-600 btn my-3  bg-orange-600 text-white hover:cursor-pointer '><FaUsers className='text-2xl'/></button></>
          }
        </td>
        <th>
          <button onClick={()=> handleDeleteUser(item)} className="text-2xl text-red-500"><MdDelete/></button>
        </th>
      </tr>
          
          )
          
      }
    </tbody>
    
  </table>
</div>
        </div>
    );
};

export default AllUser;
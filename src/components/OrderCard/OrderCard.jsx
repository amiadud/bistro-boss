import React from 'react';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCarts from '../../hooks/useCarts';

const OrderCard = ({items}) => {
  const { name, image, price, recipe, _id} = items
  const {user} = useAuth();
  const location = useLocation();

  const axiosSecure = useAxios()

  const navigate = useNavigate()

  const [, refetch ] = useCarts()

  const handleAddtoCart = ()=> {

    if(user && user.email){
      // send cart item to the database
      console.log(user.email);

      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price
      }
      axiosSecure.post('/carts', cartItem)
      .then( res => {
        console.log(res.data);
        if(res.data.insertedId) {
          Swal.fire({
            title: "Good job!",
            text: "You Cart Item Added SuccessFull!",
            icon: "success"
          });
           //refetch the cart item
           refetch()
        }
       
      })
      
    }
    else{
      Swal.fire({
        title: "You are not Logged in",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        refetch()
        if (result.isConfirmed) {
          navigate('/login', {state: {from: location}} )
        }
        
      });

    }


  }

  

    
    return (
        <div className="card w-96 m-2 bg-base-100 shadow-xl relative">
  <figure><img src={image} alt="Shoes" /></figure>
  <p className='absolute right-0 mr-4  mt-4 px-2 bg-black text-white'>{price}</p>
  <div className="card-body text-center ">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions justify-end">
      <button onClick={handleAddtoCart} className="btn btn-primary">Add to Cart</button>
    </div>
  </div>
</div>
    );
};

export default OrderCard;
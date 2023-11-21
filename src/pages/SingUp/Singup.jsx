import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosOpen from '../../hooks/useAxiosOpen';

const Singup = () => {
  
  const {userSingup, updateUserProfile} = useAuth();

  const navigate = useNavigate();

  const axiosOpen = useAxiosOpen();

    const handleRegister = (event) => {
      
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const userImage = form.userimg.value
        const email = form.email.value;
        const password = form.password.value;
        const FormData = {name, userImage, email, password }
        console.log(FormData);

        userSingup(email, password)
        .then(res => {
          updateUserProfile(name, userImage)
          .then(() => {
            const userInfo = {
              name: name,
              email: email
            }
            axiosOpen.post('/users',userInfo)
            .then(res => {
              if(res.data.insertedId){
              // FormData.reset();
              Swal.fire({
              postion:'top-end',
              title: "User Created Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
                navigate('/');
              }
            })
            
          })
        })
        .catch(err => {
          console.log(err.message);
        })

    }

    return (
        <div className="hero min-h-screen bg-[url('./others/authentication.png')]">
        <div className="hero-content flex-col lg:flex-row-reverse bg-[url('./others/authentication.png')] md:min-h-[600px] shadow-lg md:w-5/6">
          <div className="text-center lg:text-left ">
            <img className='md:w-[450px]' src="./others/authentication2.png" alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl font-bold text-center my-6 -mb-2 ">Sign Up!</h1>
            <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input name='name' type="text" placeholder="Name" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">User Image</span>
                </label>
                <input name='userimg' type="text" placeholder="User Image..." className="input input-bordered" required />
            </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input name='email' type="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input name='password' type="password" placeholder="password" className="input input-bordered" required />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <label className="label">
            <span className="label-text text-yellow-600">Already registered? <Link className='font-semibold text-yellow-600' to={'/login'}>Go to log in </Link></span>
            </label>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Singup;
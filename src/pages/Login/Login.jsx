import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import SocialLogin from './SocialLogin';

const Login = () => {

    const {user, userlogin} = useAuth()

    const location = useLocation()

    const from = location?.state?.from?.pathname || "/"

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        const FormData = {email, password }
        console.log(FormData);
        userlogin(email, password)
        .then(result => {
          console.log(result.user);
          Swal.fire({
            title: "User Login SuccessFull",
            icon: "success"
          });
          navigate(from, {replace: true})

        })
        .catch(err => {
          console.log(err.message);
        })
        
    }

    return (
        <div className="hero min-h-screen bg-[url('./others/authentication.png')]">
  <div className="hero-content flex-col lg:flex-row bg-[url('./others/authentication.png')] md:min-h-[520px] shadow-lg md:w-5/6">
    <div className="text-center lg:text-left ">
      <img className='md:w-[450px]' src="./others/authentication2.png" alt="" />
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <h1 className="text-5xl font-bold text-center my-6 -mb-2 ">Login now!</h1>
      <form onSubmit={handleLogin} className="card-body">
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
          <button className="btn btn-primary">Login</button>
        </div>
        <label className="label">
            <span className="label-text text-yellow-600">New here? <Link className='text-yellow-600 font-semibold' to={'/register'}>Create a New Account</Link></span>
        </label>
      </form>
      <SocialLogin/>
    </div>

  </div>
</div>
    );
};

export default Login;
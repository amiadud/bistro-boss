import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosOpen from '../../hooks/useAxiosOpen';

const SocialLogin = () => {

    const { googleLogin } = useAuth();

    const axiosOpen = useAxiosOpen();

    const from = location?.state?.from?.pathname || "/"

    const navigate = useNavigate()

    const handleSocialLogin = (media) => {
        media()
        .then(res => {
            console.log(res.user);
            const userInfo = {
                email: res.user?.email,
                name: res.user?.displayName
            }
            axiosOpen.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    title: "User Login SuccessFull",
                    icon: "success"
                  });
                navigate(from, {replace: true})
            })
            
        })
    }
    return (
        <div >
        <button onClick={()=> handleSocialLogin(googleLogin) } className='btn mr-2 btn-sm'><img className='mr-2 h-3.5 w-3.5' src="https://imgdb.net/storage/uploads/211d852a18a9fe0f80616a1c3623bb84cd49d2325143f7448f59d0c511d3fbe6.png" alt="" />Google</button>
      </div>
    );
};

export default SocialLogin;
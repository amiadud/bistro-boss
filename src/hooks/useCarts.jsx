import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useCarts = () => {

    // tan stack query
    const axiosSecure = useAxios()
    
    const {user} = useAuth();

    const { refetch ,data: cart = [] } = useQuery({
        queryKey: ['carts'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/carts?email=${user.email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data;
        }
    })
    return [cart, refetch]
};

export default useCarts;
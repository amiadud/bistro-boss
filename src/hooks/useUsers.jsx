import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useUsers = () => {

    const axiosSecure = useAxios()

    const {user} = useAuth()

    const { refetch, data: users=[]} = useQuery({
        queryKey: ['users'],
        queryFn: async()=> {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    return [users, refetch];
};

export default useUsers;
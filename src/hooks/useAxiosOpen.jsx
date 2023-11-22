import axios from 'axios';

const axiosOpen = axios.create({
    baseURL: 'https://bistro-boss-server-nine-kappa.vercel.app',
})
const useAxiosOpen = () => {
    return axiosOpen
};

export default useAxiosOpen;
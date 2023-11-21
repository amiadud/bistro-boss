import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import useAxiosOpen from "./useAxiosOpen";

const useMenu = () =>{
   
    const axiosOpen = useAxiosOpen();
    

    const {refetch ,data: menuItem = [], isLoading: loading  } = useQuery({
        queryKey: ['menuItem'],
        queryFn: async()=> {
            const res = await axiosOpen.get('/menu')
            return res.data;
        }
    })
    return [menuItem, loading, refetch]

}
export default useMenu
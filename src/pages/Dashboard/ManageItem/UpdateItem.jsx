import React from 'react';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxios from '../../../hooks/useAxios';
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosOpen from '../../../hooks/useAxiosOpen';

const image_hosting_key = '80fd26d461aa4b2ae1c1ca7dda2f47ec'
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}` 

const UpdateItem = () => {
  const {name, price, recipe, image, category, _id} = useLoaderData()

  const axiosOpen = useAxiosOpen();
    
  const axiosSecure = useAxios();
    
  const { register, formState: { errors }, handleSubmit } = useForm();

    
  const onSubmit = async (data) => {
        
        // // image upload to imgbb and then get an url
        const imageFile = {image: data.item_image[0]}
        const res = await axiosOpen.post(image_hosting_api,imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        } )
        if(res.data.success){
            const menuData = {
                name: data.name,
                category: data.item_category,
                price: parseInt(data.item_price),
                recipe: data.item_recipe,
                image: res.data.data.display_url
            }
            console.log(menuData);

            axiosSecure.patch(`/menu/${_id}`, menuData)
            .then(res => {
                
                console.log(res.data);
               if(res.data.modifiedCount > 0){
                Swal.fire({
                    title: "Your Item Updated successfully!",
                    icon: "success"
                  });
               }
            })
        }
        console.log('with image URL', res.data);
        
    };
    return (
        <div className='w-10/12 mx-auto'>
        <SectionTitle heading={"'What's new?"} subHeading={'add an item'}/>
        <div className=" hero ">
<div className="hero-content flex-col lg:flex-row-reverse">
<div className="card shrink-0 w-full shadow-2xl bg-base-100">
  <form onSubmit={handleSubmit(onSubmit)} className="card-body">
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Recipe name*</span>
      </label>
      <input defaultValue={name} {...register("name", { required: true })} type='text' placeholder="Recipe name" className="input input-bordered"  />
      {errors.name?.type === 'required' && <p className='text-red-400' role="alert">Name is required</p>}
    </div>
    <div className='flex gap-4'>
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Email</span>
      </label>
      <select className='input input-bordered' defaultValue={category} {...register("item_category")}>
      <option  selected disabled >Category</option>
      <option  value="popular">Popular</option>
      <option  value="dessert">Disserts</option>
      <option  value="drinks">Drinks</option>
      <option  value="soups">Soups</option>
      <option  value="salads">Salads</option>
      <option  value="offered">Offered</option>
      </select>
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Price*</span>
      </label>
      <input defaultValue={price} {...register("item_price", { required: true })} type="number" placeholder="Price" className="input input-bordered" />
      {errors.item_price?.type === 'required' && <p className='text-red-400' role="alert">Price is required</p>}
    </div>
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Recipe Details...</span>
      </label>
     <textarea defaultValue={recipe} {...register("item_recipe", { required: true })} className='border  p-2' placeholder="Recipe Details*" id="" cols="30" rows="7" ></textarea>
     {errors.item_recipe?.type === 'required' && <p className='text-red-400' role="alert">Recipe is required</p>}
     <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Item Image</span>
      </label>
      <input {...register("item_image")} type="file" className="file-input file-input-bordered w-full max-w-xs" />
    </div>
    </div>
    <div className="form-control mt-6">
      <button className="btn btn-primary">Update Item</button>
    </div>
  </form>
</div>
</div>
</div>
    </div>
    );
};

export default UpdateItem;
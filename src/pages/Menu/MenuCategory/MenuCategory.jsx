import { Link } from 'react-router-dom';
import MenuTitle from '../../../components/MenuTitle/MenuTitle';
import Cover from '../../../components/shared/Cover/Cover';

const MenuCategory = ({items, title, img}) => {
    return (
        <div className='my-10'>
        <div className='grid md:grid-cols-2 gap-6'>
       {
        items.map(offer => 
            <div className='flex gap-3 my-2 item-center'>
        <div>
            <h2
            style={{'--image-url': `url(${offer?.image})`}} 
            
            className={`w-20 h-20 bg-[image:var(--image-url)] bg-cover bg-no-repeat bg-gray-300 rounded-tl-0 rounded-bl-full rounded-br-full rounded-tr-full`}></h2>
            
        </div>
        <div>
            <MenuTitle
            menuTitle={offer?.name}
            menuDes={offer?.recipe}
            />
        </div>
        <div >
            <MenuTitle
            menuPrice={`$${offer?.price}`}
            />
        </div>
        </div>
        
        )
        
       }
        </div>
        <div className='text-center my-3'>
        <Link to={`/order/${title}`}><button className='btn border-b-4 border-t-0 border-l-0 border-r-0 text-center btn-outline border'>ORDER YOUR FAVOURITE FOOD</button></Link>
        </div>
        </div>
    );
};

export default MenuCategory;
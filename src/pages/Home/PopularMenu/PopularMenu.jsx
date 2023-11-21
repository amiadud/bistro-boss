import React, { useCallback, useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuTitle from '../../../components/MenuTitle/MenuTitle';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {

    // const [menuItem, setMenuItem] = useState(['']) // fetch the menu item
    const [showAll, setShowAll] = useState(false); //show all menu items
    // console.log(menuItem);

    // useEffect( ()=> {
    //     fetch('menu.json') // api menus
    //     .then(res => res.json())
    //     .then(data => setMenuItem(data))
    // },[])

    const [ menuItem ] = useMenu();

    const popular = menuItem.filter(item => item.category === 'popular');

    const handleShowAllClick = () => {
        setShowAll(true);
      };

    return (
        <>
            <SectionTitle
            heading={'Check it out'}
            subHeading={'FROM OUR MENU'}
            />

        <div className='grid md:grid-cols-2 gap-6'>
        {
            showAll ? popular.map(menus => 
                <div className='flex gap-3 my-2 item-center'>
        <div key={menus._id}>
            <h2
            style={{'--image-url': `url(${menus?.image})`}} 
            
            className={`w-20 h-20 bg-[image:var(--image-url)] bg-cover bg-no-repeat bg-gray-300 rounded-tl-0 rounded-bl-full rounded-br-full rounded-tr-full`}></h2>
            
        </div>
        <div>
            <MenuTitle
            menuTitle={menus?.name}
            menuDes={menus?.recipe}
            />
        </div>
        <div >
            <MenuTitle
            menuPrice={menus?.price}
            />
        </div>
        </div>
        )
        :
        popular.slice(0, 6).map(menus => 
            <div className='flex gap-3 my-2 item-center'>
    <div>
        <h2
        style={{'--image-url': `url(${menus?.image})`}} 
        
        className={`w-20 h-20 bg-[image:var(--image-url)] bg-cover bg-no-repeat bg-gray-300 rounded-tl-0 rounded-bl-full rounded-br-full rounded-tr-full`}></h2>
        
    </div>
    <div>
        <MenuTitle
        menuTitle={menus?.name}
        menuDes={menus?.recipe}
        />
    </div>
    <div >
        <MenuTitle
        menuPrice={menus?.price}
        />
    </div>
    </div>
    )
        }

        </div>
        <div className='text-center my-5'>
        {
            !showAll && <button className='btn border-b-4 border-t-0 border-l-0 border-r-0 text-center btn-outline border' onClick={handleShowAllClick}>View Full Menu</button>
        }
        </div>
        </>
    );
};

export default PopularMenu;
import React from 'react';
import { Helmet } from 'react-helmet';
import Cover from '../../components/shared/Cover/Cover';
import menuimg from '../../../public/menu/banner3.jpg'
import dessertImg from '/menu/dessert-bg.jpeg'
import pizzaImg from '/menu/pizza-bg.jpg'
import saladImg from '/menu/salad-bg.jpg'
import soupImg from '/menu/soup-bg.jpg'

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import MenuTitle from '../../components/MenuTitle/MenuTitle';
import useMenu from '../../hooks/useMenu';
import MenuCategory from './MenuCategory/MenuCategory';

const Menu = () => {

    const [MenuData] = useMenu()
    const offered = MenuData.filter(item => item.category === 'offered')
    const dessert = MenuData.filter(item => item.category === 'dessert')
    const soup = MenuData.filter(item => item.category === 'soup')
    const salad = MenuData.filter(item => item.category === 'salad')
    const pizza = MenuData.filter(item => item.category === 'pizza')
    const drinks = MenuData.filter(item => item.category === 'drinks')
    console.log(offered);

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Our Menu</title>
            </Helmet>
            <Cover title={'OUR MENU'} description={'Would you like to try a dish?'} img={menuimg}/>
            <SectionTitle heading={"Don't miss"} subHeading={"TODAY'S OFFER"}/>
            {/* {offered Menus} */}
            <MenuCategory items={offered} title="offered"></MenuCategory>
            {/* {dessert Menus} */}
            <Cover title={'DESSERTS'} description={'Would you like to try a dish?'} img={dessertImg}/>
            <MenuCategory items={dessert} title="dessert" img={dessertImg} ></MenuCategory>
            {/* {pizza Menus} */}
            <Cover title={'PIZZA'} description={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} img={pizzaImg}/>
            <MenuCategory items={pizza} title="pizza" ></MenuCategory>
            <Cover title={'SALADS'} description={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} img={saladImg}/> 
            <MenuCategory items={salad}  title="salad" ></MenuCategory>
            <Cover title={'SOUPS'} description={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} img={soupImg}/> 
            <MenuCategory items={soup} title={'soup'}></MenuCategory>
            <Cover title={'Drinks'} description={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} img={soupImg}/> 
            <MenuCategory items={drinks} title={'drinks'}></MenuCategory>


        </div>
    );
};

export default Menu;
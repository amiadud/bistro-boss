import React, { useEffect, useState } from 'react';
import Cover from '../shared/Cover/Cover';
import orderimgs from '/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OderTab from '../OrderTab/OrderTab';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Order = () => {
    // const [MenuData] = useMenu()
    const [page, setPage] = useState(0);
    const {category} = useParams()
    const categories = ['salad', 'pizza', 'soup','dessert','drinks' ]
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex)

    const {data:{result, postCount}} = useQuery({
        queryKey: ['menus', page],
        queryFn: () => fetch(`https://bistro-boss-server-nine-kappa.vercel.app/menus?category=${category}&page=${page}`).then((res) => res.json()),
        initialData:{result:[], postCount:0}
    })
    const totalPages = Math.ceil(postCount / 6)
    console.log(totalPages);
    const pages = [...new Array(totalPages).fill(0)]
    return (
        <div>
            <Cover title={'OUR SHOP' } description={'Would you like to try a dish?' } img={orderimgs} ></Cover>
            <Tabs className="tabs tabs-lifted" defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
    <TabList >
    <Tab>Salad</Tab>
    <Tab>Pizza</Tab>
    <Tab>Soups</Tab>
    <Tab>Disserts</Tab>
    <Tab>Drinks</Tab>
    </TabList>

    <TabPanel>
        <OderTab items={result}></OderTab>
        <div className=" my-6 ">
        {pages.map(( item, index)=> 
        <button onClick={()=> setPage(index)} 
        className={` rounded-md btn-sm md:btn-sm ml-2 ${page == index ? " bg-violet-800 text-white" : " text-white bg-violet-600  "}  `}>
            {index + 1}</button>
        
        )}
        </div>
        </TabPanel>
    <TabPanel>
        <OderTab items={result}></OderTab>
        <div className=" my-6">
        {pages.map(( item, index)=> 
        <button onClick={()=> setPage(index)} 
        className={` rounded-md btn-sm md:btn-sm ml-2 ${page == index ? " bg-violet-800 text-white" : " text-white bg-violet-600  "}  `}>
            {index + 1}</button>
        
        )}
        </div>
        </TabPanel>
    <TabPanel>
        <OderTab items={result }></OderTab>
        <div className=" my-6">
        {pages.map(( item, index)=> 
        <button onClick={()=> setPage(index)} 
        className={` rounded-md btn-sm md:btn-sm ml-2 ${page == index ? " bg-violet-800 text-white" : " text-white bg-violet-600  "}  `}>
            {index + 1}</button>
        
        )}
        </div>
        </TabPanel>
    <TabPanel>
        <OderTab items={result}></OderTab>
        <div className=" my-6">
        {pages.map(( item, index)=> 
        <button onClick={()=> setPage(index)} 
        className={` rounded-md btn-sm md:btn-sm ml-2 ${page == index ? " bg-violet-800 text-white" : " text-white bg-violet-600  "}  `}>
            {index + 1}</button>
        
        )}
        </div>
        </TabPanel>
    <TabPanel><OderTab items={result ? result : "drinks"}></OderTab>
    <div className=" my-6">
        {pages.map(( item, index)=> 
        <button onClick={()=> setPage(index)} 
        className={` rounded-md btn-sm md:btn-sm ml-2 ${page == index ? " bg-violet-800 text-white" : " text-white bg-violet-600  "}  `}>
            {index + 1}</button>
        
        )}
    </div>
    </TabPanel>

  </Tabs>
        </div>
    );
};

export default Order;
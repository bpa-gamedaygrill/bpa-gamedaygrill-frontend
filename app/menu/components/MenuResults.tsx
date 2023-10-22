"use client";
import MenuSkeleton from '../../components/Skeleton/MenuSkeleton';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MenuItem from './MenuItem';
import { MenuCategoryFilterType } from '../../redux/features/menuCategoryFilterSlice';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useSearchParams } from 'next/navigation'

export interface MenuItemInterface {
  id: string;
  imageUrl: string;
  itemDescription: string;
  itemName: string;
  itemPrice: string;
}

const MenuResults = () => {
  const searchParams = useSearchParams()
  const defaultCategory = searchParams.get('category') as MenuCategoryFilterType;
  const dispatch = useAppDispatch();
  const menuCategoryFilter = useAppSelector((state) => state.menuCategoryFilterReducer.filter);
  const menuNameFilter = useAppSelector((state) => state.menuItemNameReducer.itemName)


  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [menuItems, setMenuItems] = useState<MenuItemInterface[] | null>(null);


  // useEffect(() => {
  //   console.log("[INITIAL_USEEFFECT] has occured")
  //   fetchMenuItems();
  // }, [defaultCategory])
  //
  useEffect(() => {
    console.log("[MENU_FILTERS] Have Changed!", menuCategoryFilter, menuNameFilter)
    fetchMenuItems()
  }, [menuCategoryFilter, menuNameFilter])
  //
  //   useEffect(() => {
  //   console.log("[MENU_NAME_FILTER] Has Changed!", menuNameFilter)
  //   fetchMenuItems()
  // }, [menuNameFilter])


  const fetchMenuItems = ( enableLoading?: boolean ) => {
    if(enableLoading) setIsLoading(() => true);
    axios.post('/api/menu/getallitems')
    .then(response => {
      console.log(response);
        console.log("BEGAN FETCH!")
        console.log("WORKING WITH THIS CATEGORY FILTER:", menuCategoryFilter);
        let menuItemData = response.data.data;
        if (menuCategoryFilter) {
          // Filter the response.data.data based on menuCategoryFilter
          menuItemData = response.data.data.filter((item: any) => item.type === menuCategoryFilter);
        } 

        if (menuNameFilter) {
          if(menuNameFilter.trim() != "") {
            menuItemData = menuItemData.filter((item: any) => item.itemName.toLowerCase().includes(menuNameFilter.trim().toLowerCase()));
          }
        }

        setMenuItems(menuItemData);
      })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(() => false);
    })
  }


return (
    <>
      <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-7 mb-28 justify-center items-center">
        {isLoading ? (
          <>
            <MenuSkeleton />
            <MenuSkeleton />
            <MenuSkeleton />
            <MenuSkeleton />
            <MenuSkeleton customStyles='hidden md:flex' />
            <MenuSkeleton customStyles='hidden md:flex' />
          </>
        ) : (
          menuItems && menuItems.map((item) => (
          <>
            <MenuItem key={item.id} itemData={item} />
          </>
          ))
        )}
        { !isLoading && menuItems?.length===0 && <p className="text-neutral-600 font-medium text-lg">No items match your search.</p> }
      </section>
    </>
  );
}

export default MenuResults;

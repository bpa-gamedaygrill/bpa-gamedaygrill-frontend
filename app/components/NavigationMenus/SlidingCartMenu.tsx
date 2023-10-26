"use client";
import React from 'react'

import { close } from "../../redux/features/cartModalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { X, Info as InfoIcon, Calendar as CalendarIcon, Briefcase as BriefcaseIcon ,BookOpen as MenuOrderingIcon, Bookmark as EventsIcon, Gift as RewardsIcon, Briefcase } from "react-feather";
import Link from 'next/link';

// Component imports 
import MenuLogo from './components/MenuLogo';

const SlidingCartMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cartModalReducer.isActive);

  const slideLinkStyles: string = "flex items-center justify-start gap-4 w-full py-2 px-2 bg-white rounded-md";

  return (
    <>
      <section className={`hidden md:block top-0 left-0 fixed w-full h-full bg-black/40 backdrop-blur-[2px] z-[100] ${ cartState===false && "pointer-events-none opacity-0 delay-300 transition-all duration-100 ease-in-out" }`}>
        <nav className={`h-full flex flex-col items-start w-full bg-white max-w-[330px] px-5 py-6 ${cartState===false ? "right-[-100%]" : "right-[0%]"} absolute top-0 transition-all duration-300 ease-in-out overflow-y-auto`}>
          <div className={`flex w-full flex-row-reverse items-center justify-between`}>
            <MenuLogo />
            <button className="w-[45px] h-[45px] bg-white border-2 border-light-gray hover:bg-neutral-100 flex items-center justify-center rounded-full p-1" onClick={() => dispatch(close())}>
              <X 
              color="gray"
              size={25}
              />
            </button>
          </div>

          <section className="w-full py-5 mt-7 flex flex-col items-start gap-2">
            CART ITEMS

            <div className="w-full h-[1px] bg-neutral-200 mt-5"/>

            <button className="flex items-center justify-center gap-4 hover:bg-neutral-100 w-full py-3 px-5 bg-neutral-200 rounded-md mt-7">
              <p className="text-neutral-600 text-sm font-semibold">Clear Cart</p>
            </button>

            <Link href="checkout" className="flex items-center justify-center gap-4 hover:bg-red-700 w-full py-3 px-5 bg-primary-red rounded-md ">
              <p className="text-white font-semibold text-sm">Checkout</p>
            </Link>
          </section>
        </nav>
      </section>
    </>
  )
}

export default SlidingCartMenu

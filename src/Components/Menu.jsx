'use client'
import React from 'react'
import { AiOutlineHome } from "react-icons/ai";
import { FaRankingStar } from "react-icons/fa6";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const Menu = () => {
    const pathname = usePathname()
    return(
            <div  className='fixed h-14 bg-white bottom-0 flex w-screen justify-around items-center rounded-t-2xl'>
                <Link className={pathname === '/' ? 'text-indigo-500' : 'text-black'} href={'/'}><AiOutlineHome className='text-3xl '/></Link>
                <Link   className={pathname === '/ranking' ? 'text-indigo-500' : 'text-black'} href={'/ranking'}><FaRankingStar className='text-3xl '/></Link>

                
                
            </div>  
    )
   
}


export default Menu
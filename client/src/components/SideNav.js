import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {AiFillHome,AiFillHeart,AiOutlineHistory} from 'react-icons/ai'
import {GiEarthAmerica} from 'react-icons/gi'
import {BsFillCartFill} from 'react-icons/bs'
import {MdPerson2,MdAdminPanelSettings} from 'react-icons/md'
const SideNav = (location) => {
  const token = localStorage.getItem('access') ? localStorage.getItem('access') : null
  return (
    <div className='w-[300px] h-screen bg-[color:var(--black)] nav:block fixed hidden z-20'>
      <h1 className="text-2l text-center p-4 text-[color:var(--blue)] font-extrabold">Central Tech</h1>
      <div className="flex justify-center  flex-col p-6">
        <section className="flex flex-col gap-8 mb-8">
        <NavLink to="/" exact ><div className={null ? "bg-[color:var(--blue)] text-[color:var(--blue)] absolute -left-[10px] w-[25px] h-[25px] rounded-full animate-slideleft" : "hidden"}>.</div><div className="flex gap-4 hover:text-black items-center justify-center px-4 text-white hover:bg-white w-full py-2 rounded-full transition-all"><AiFillHome/><p className="text-1l">Home</p></div></NavLink>
        <NavLink to="/explore"><div className={null ? "bg-[color:var(--blue)] text-[color:var(--blue)] absolute -left-[10px] w-[25px] h-[25px] rounded-full animate-slideleft" : "hidden"}>.</div><div className="flex gap-4 hover:text-black items-center justify-center px-4 text-white hover:bg-white w-full py-2 rounded-full transition-all"><GiEarthAmerica/><p className="text-1l">Explore</p></div></NavLink>
        </section>
        {token && 
          <section className="flex flex-col gap-8">
            <NavLink to="/saved"><div className={null  ? "bg-[color:var(--blue)] text-[color:var(--blue)] absolute -left-[10px] w-[25px] h-[25px] rounded-full animate-slideleft" : "hidden"}>.</div><div className="flex gap-4 hover:text-black items-center justify-center px-4 text-white hover:bg-white w-full py-2 rounded-full transition-all"><AiFillHeart/><p className="text-1l">Saved</p></div></NavLink>
            <Link to="/history" ><div className={null ? "bg-[color:var(--blue)] text-[color:var(--blue)] absolute -left-[10px] w-[25px] h-[25px] rounded-full animate-slideleft" : "hidden"}>.</div><div className="flex gap-4 hover:text-black items-center justify-center px-4 text-white hover:bg-white w-full py-2 rounded-full transition-all"><AiOutlineHistory/><p className="text-1l">Purchase History</p></div></Link>
            <Link to="/admin"><div className={null ? "bg-[color:var(--blue)] text-[color:var(--blue)] absolute -left-[10px] w-[25px] h-[25px] rounded-full animate-slideleft" : "hidden"}>.</div><div className="flex gap-4 hover:text-black items-center justify-center px-4 text-white hover:bg-white w-full py-2 rounded-full transition-all"><MdAdminPanelSettings/><p className="text-1l">Admin Panel</p></div></Link>
          </section>
        
        }
      </div>
    </div>
  )
}

export default SideNav
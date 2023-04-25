import React, { useState,useRef } from 'react'
import {TbBellFilled,TbBellRingingFilled} from 'react-icons/tb'
import {BsFillPersonFill,BsFillPersonCheckFill,BsPersonFillCheck} from 'react-icons/bs'
import {ImCart} from 'react-icons/im'
import {RxHamburgerMenu} from 'react-icons/rx'
import {AiOutlineSearch} from 'react-icons/ai'
import { Link } from 'react-router-dom'
const TopNav = ({smallerMenu,setSmallerMenu}) => {
  const windowSize = useRef([window.innerWidth, window.innerHeight])
  return (
    <>
    <div className="w-full flex flex-col-reverse gap-4 topnavbreak:gap-0 topnavbreak:flex-row p-6 pb-0">
      <div className="topnavbreak:w-[70%] flex items-center justify-end">
        <input type="text" className="bg-white w-[100%] text-black p-4 px-8 border-[0.5px] border-[color:var(--black)]" placeholder="Search for items by name or category..."/>
        <div className="absolute mr-2 hover:cursor-pointer  p-2">
          <AiOutlineSearch className="" size={32}/>
        </div>
      </div>
      <div className="topnavbreak:w-[30%] flex justify-evenly items-center">
        <Link to="/cart"><ImCart className="text-[color:var(--black)]" size={32}/></Link>
        {localStorage.getItem('access') !== '' ? 
        <Link to="/profile"><BsPersonFillCheck className="text-[color:var(--black)]" size={32}/></Link>
        :
        <Link to="/login"><BsFillPersonFill className="text-[color:var(--black)]" size={32}/></Link>
        }
        <TbBellFilled className="text-[color:var(--black)] animate-bellShake hover:animate-none hover:cursor-pointer hover:text-[color:var(--highlight-blue)]" size={32}/>
        <RxHamburgerMenu className={!smallerMenu?"text-[color:var(--black)] hover:cursor-pointer z-20 nav:hidden":"text-[color:var(--light)] hover:cursor-pointer z-20 nav:hidden"} size={32} 
        onClick={()=>{
            setSmallerMenu(!smallerMenu)
        }}/>
      </div>
    </div>
    <div className={smallerMenu?"absolute flex flex-col justify-center items-center w-full h-[300px] top-0 bg-[color:var(--black)] text-white gap-2 nav:invisible":"invisible"}>
      <Link to="/">Home</Link>
      <Link to="/explore">Explore</Link>
      <Link to="/saved">Saved</Link>
      <Link to="/history">Purchase History</Link>
      <Link to="/admin">Admin Panel</Link>
    </div>
    </>
  )
}

export default TopNav
import React, { useState} from 'react'
import {TbBellFilled} from 'react-icons/tb'
import {BsFillPersonFill,BsPersonFillCheck} from 'react-icons/bs'
import {ImCart} from 'react-icons/im'
import {RxHamburgerMenu} from 'react-icons/rx'
import {AiOutlineSearch} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
const TopNav = ({smallerMenu,setSmallerMenu}) => {
  const nav = useNavigate()
  const [query, setQuery] = useState(null)
  const search=()=> {
    nav(`/search/${query}`)
  }
  const handleKeyDown =(event)=> {
    if (event.key === 'Enter'){
      nav(`/search/${query}`)
    }
  }
  return (
    <>
    <div className="w-full flex flex-col-reverse gap-4 topnavbreak:gap-0 topnavbreak:flex-row p-6 pb-0">
      <div className="topnavbreak:w-[70%] flex items-center justify-end">
        <input type="text" className="bg-white w-[100%] text-black p-4 px-8 border-[0.5px] border-[color:var(--black)]" placeholder="Search for items by name or category..." onChange={(e)=>setQuery(e.target.value)} onKeyDown={handleKeyDown}/>
        <div className="absolute mr-2 hover:cursor-pointer  p-2">
          <AiOutlineSearch className="text-[color:var(--highlight-blue)] hover:scale-110 hover:cursor-pointer" size={32} onClick={()=>search()}/>
        </div>
      </div>
      <div className="topnavbreak:w-[30%] flex justify-evenly items-center">
        <Link to="/cart"><ImCart className="text-[color:var(--black)] hover:text-[color:var(--highlight-blue)]" size={32}/></Link>
        {localStorage.getItem('access') !== '' ? 
        <Link to="/profile"><BsPersonFillCheck className="text-[color:var(--black)] hover:text-[color:var(--highlight-blue)]" size={32}/></Link>
        :
        <Link to="/login"><BsFillPersonFill className="text-[color:var(--black)] hover:text-[color:var(--highlight-blue)]" size={32}/></Link>
        }
        <TbBellFilled className="text-[color:var(--black)] animate-bellShake hover:animate-none hover:cursor-pointer hover:text-[color:var(--highlight-blue)]" size={32}/>
        <RxHamburgerMenu className={!smallerMenu?"text-[color:var(--black)] hover:cursor-pointer z-20 nav:hidden hover:text-[color:var(--highlight-blue)]":"text-[color:var(--light)] hover:cursor-pointer z-20 nav:hidden hover:text-red-500"} size={32} 
        onClick={()=>{
            setSmallerMenu(!smallerMenu)
        }}/>
      </div>
    </div>
    <div className={smallerMenu?"absolute flex flex-col justify-center items-center w-full h-[300px] top-0 bg-[color:var(--black)] text-white gap-2 nav:invisible":"invisible"}>
      <Link to="/" className="hover:scale-105 hover:cursor-pointer hover:text-[color:var(--highlight-blue)]" onClick={()=>setSmallerMenu(!smallerMenu)}>Home</Link>
      <Link to="/explore" className="hover:scale-105 hover:cursor-pointer hover:text-[color:var(--highlight-blue)]" onClick={()=>setSmallerMenu(!smallerMenu)}>Explore</Link>
      <Link to="/saved" className="hover:scale-105 hover:cursor-pointer hover:text-[color:var(--highlight-blue)]" onClick={()=>setSmallerMenu(!smallerMenu)}>Saved</Link>
      <Link to="/history" className="hover:scale-105 hover:cursor-pointer hover:text-[color:var(--highlight-blue)]" onClick={()=>setSmallerMenu(!smallerMenu)}>Purchase History</Link>
      <Link to="/admin" className="hover:scale-105 hover:cursor-pointer hover:text-[color:var(--highlight-blue)]" onClick={()=>setSmallerMenu(!smallerMenu)}>Admin Panel</Link>
    </div>
    </>
  )
}

export default TopNav
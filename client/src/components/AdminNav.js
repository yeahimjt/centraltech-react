import React from 'react'
import {BsChevronDown} from 'react-icons/bs'

const AdminNav = ({setSection, smallerMenu}) => {
  return (
    <div className={smallerMenu ? "hidden" : "flex gap-6 justify-center productsbreak:justify-start bg-[color:var(--black)] text-white px-6 py-4 m-6 shadow-all rounded-lg font-bold"}>
        <div>
            <h1 className="hover:text-[color:var(--highlight-blue)] hover:cursor-pointer transition-all" onClick={()=>setSection('Dashboard')}>Dashboard</h1>
        </div>
        <div  className="group z-20 "><h1 className="flex justify-center items-center gap-2 hover:text-[color:var(--highlight-blue)] transition-all">Database <BsChevronDown size={20}/></h1>
            <div className="group-hover:visible invisible flex flex-col absolute px-6 py-4 gap-2 bg-white shadow-all text-black">
                <p className=" hover:cursor-pointer hover:text-[color:var(--highlight-blue)]"onClick={()=>setSection('Products')}>Products</p>
                <p className=" hover:cursor-pointer hover:text-[color:var(--highlight-blue)]"onClick={()=>setSection('Users')}>Users</p>
                <p className=" hover:cursor-pointer hover:text-[color:var(--highlight-blue)]"onClick={()=>setSection('Orders')}>Orders</p>
            </div>
        </div>
    </div>
  )
}

export default AdminNav
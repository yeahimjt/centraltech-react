import React from 'react'

const AdminNav = ({setSection}) => {
  return (
    <div className="flex gap-6 justify-center productsbreak:justify-start bg-[color:var(--black)] text-white px-6 py-4 m-6 shadow-all rounded-lg font-bold">
        <div>
            <h1 onClick={()=>setSection('Dashboard')}>Dashboard</h1>
        </div>
        <div  className="group z-20 "><h1>Database</h1>
            <div className="group-hover:visible invisible flex flex-col absolute px-6 py-4 gap-2 bg-white">
                <p className="group-hover:text-black text-white hover:cursor-pointer"onClick={()=>setSection('Products')}>Products</p>
                <p className="group-hover:text-black text-white hover:cursor-pointer"onClick={()=>setSection('Users')}>Users</p>
                <p className="group-hover:text-black text-white hover:cursor-pointer"onClick={()=>setSection('Orders')}>Orders</p>
            </div>
        </div>
    </div>
  )
}

export default AdminNav
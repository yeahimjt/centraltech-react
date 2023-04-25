import React, {useContext, useEffect, useState} from 'react'
import TopNav from '../components/TopNav'
import { getOrders } from '../services/orderActions'
import { UserContext } from '../services/centralContext'
import { useNavigate } from 'react-router-dom'

const History = () => {
  const {user, setUser} = useContext(UserContext)
  const [userSpending, setUserSpending] = useState(null)
  const [orders, setOrders] = useState(null)
  const nav = useNavigate()
  useEffect(()=>{
    getOrders(user?.id, {setOrders})
  
  },[])

  return (
    <div className="flex flex-col nav:w-[calc(100vw-300px)] w-full h-screen bg-right-bg overflow-x-hidden relative nav:left-[300px]">
        <TopNav/>
        <div className="p-6 flex flex-col gap-6">
          {orders?.length > 0 ?
          <>
          <div className="flex gap-6">
            <div className="flex-[0.5] flex justify-center items-center gap-6 bg-white shadow-all p-4"><h1 className="text-2l">Total Spent</h1><p className="text-1l">$32,000</p></div>
            <div className="flex-[0.5] flex justify-center items-center gap-6 bg-white shadow-all p-4"><h1 className="text-2l">Total Saved</h1><p className="text-1l">$32,000</p></div>
          </div>
          <div className="flex gap-6">
            <button className="bg-[color:var(--highlight-blue)] rounded-md py-2 px-4 w-[150px] text-white hover:scale-105 hover:cursor-pointer transition-all"><h1>All</h1></button>
            <button className="bg-[color:var(--highlight-blue)] rounded-md py-2 px-4 w-[150px] text-white hover:scale-105 hover:cursor-pointer transition-all"><h1>Pending</h1></button>
            <button className="bg-[color:var(--highlight-blue)] rounded-md py-2 px-4 w-[150px] text-white hover:scale-105 hover:cursor-pointer transition-all"><h1>Fulfilled</h1></button>
          </div>
          <div className="flex flex-col">
            <table className="bg-white shadow-all ">
              <tr className="">
                  <th className="border-b-2 p-2">Order Id</th>
                  <th className="border-b-2 p-2 text-left ">Products</th>
                  <th className="border-b-2 p-2 text-center">Status</th>
                  <th className="border-b-2 p-2 text-center">Saved</th>
                  <th className="border-b-2 p-2 text-center">Spent</th>
                </tr>
              {orders?.map((item)=> 
                <tr className="">
                  <td className="border-b-2 p-2">{item._id}</td>
                  <td className="border-b-2 p-2 text-left">{item?.items_name.map((single,index)=> 
                  <p className="hover:text-[color:var(--highlight-blue)] hover:cursor-pointer" onClick={()=>nav(`/product/${item?.items_category[index]}/${item?.items_id[index]}`)}>{single},</p>
                  )}</td>
                  <td className={item.fulfilled ? "border-b-2 p-2 text-center text-[color:var(--highlight-blue)]" : "border-b-2 p-2 text-center text-red-500"}>{item.fulfilled ? 'Fulfilled' : 'Pending'}</td>
                  <td className="border-b-2 p-2 text-center">${item.saved}</td>
                  <td className="border-b-2 p-2 text-center">${Math.round(item.total)}</td>
                </tr>
              )}
            </table>
          </div>
          </>
          :
          <p className="text-center text-2l text-red-500 animate-scaleup">You must add items to your cart and purchase to populate purchase history data.</p>
          }
        </div>
    </div>
  )
}

export default History
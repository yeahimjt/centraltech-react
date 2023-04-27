import React, {useContext, useEffect, useState} from 'react'
import TopNav from '../components/TopNav'
import { getOrders, userSpendings } from '../services/orderActions'
import { UserContext } from '../services/centralContext'
import { useNavigate } from 'react-router-dom'

const History = ({smallerMenu ,setSmallerMenu}) => {
  const {user, setUser} = useContext(UserContext)
  const [userSpending, setUserSpending] = useState(null)
  const [orders, setOrders] = useState(null)
  const [status, setStatus] = useState(null) // Status false = pending, true = fulfilled
  let pending = []
  let fulfilled = []
  const nav = useNavigate()
  useEffect(()=>{
    getOrders(user?.id, {setOrders})
    userSpendings(user?.id, {setUserSpending})
  },[])
  useEffect(()=> {
    orders?.map((item)=> {
      console.log(item)
      if (item?.fulfilled) {
        fulfilled.push(item)
      }
      else {
        pending.push(item)
      }
      return ''
    })
  },orders)
  console.log(fulfilled)
  console.log(pending)
  console.log(status)
  return (
    <div className="flex flex-col nav:w-[calc(100vw-300px)] w-full h-screen bg-right-bg overflow-x-hidden relative nav:left-[300px]">
        <TopNav smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu}/>
        <div className={smallerMenu ? "p-2 td:p-6 flex flex-col gap-6 relative top-[230px] nav:top-[0px]": "p-2 td:p-6 flex flex-col gap-6"}>
          {orders?.length > 0 ?
          <>
          <div className="flex gap-6 flex-col history:flex-row">
            <div className="flex-[0.5] flex justify-center items-center gap-6 bg-white shadow-all p-4"><h1 className="text-2l">Total Spent</h1><p className="text-1l">${Math.round(userSpending?.total)}</p></div>
            <div className="flex-[0.5] flex justify-center items-center gap-6 bg-white shadow-all p-4"><h1 className="text-2l">Total Saved</h1><p className="text-1l">${Math.round(userSpending?.total_saved)}</p></div>
          </div>
          {/* <div className="flex gap-6">
            <button className="bg-[color:var(--highlight-blue)] rounded-md py-2 px-4 w-[150px] text-white hover:scale-105 hover:cursor-pointer transition-all" onClick={()=> setStatus(null)}><h1>All</h1></button>
            <button className="bg-[color:var(--highlight-blue)] rounded-md py-2 px-4 w-[150px] text-white hover:scale-105 hover:cursor-pointer transition-all" onClick={()=> setStatus(false)}><h1>Pending</h1></button>
            <button className="bg-[color:var(--highlight-blue)] rounded-md py-2 px-4 w-[150px] text-white hover:scale-105 hover:cursor-pointer transition-all" onClick={()=> setStatus(true)}><h1>Fulfilled</h1></button>
          </div> */}
          <div className="flex flex-col">
            <table className="bg-white shadow-all">
              <tr className="">
                  <th className="border-b-2 p-1 td:p-2 text-xss td:text-base">Order Id</th>
                  <th className="border-b-2 p-2 td:p-2 text-left  text-xss td:text-base">Products</th>
                  <th className="border-b-2 p-0 td:p-2 text-center text-xss td:text-base">Status</th>
                  <th className="border-b-2 p-0 td:p-2 text-center text-xss td:text-base">Saved</th>
                  <th className="border-b-2 p-0 td:p-2 text-center text-xss td:text-base">Spent</th>
                </tr>
              {orders?.map((item,index)=> 
                <tr className="">
                  <td className="border-b-2 p-0 text-xss history:text-base text-center">{index}</td>
                  <td className="border-b-2 p-0 text-left text-xss history:text-base">{item?.items_name.map((single,index)=> 
                  <p className="hover:text-[color:var(--highlight-blue)] hover:cursor-pointer text-xss history:text-base" onClick={()=>nav(`/product/${item?.items_category[index]}/${item?.items_id[index]}`)}>{single},</p>
                  )}</td>
                  <td className={item.fulfilled ? "border-b-2 p-0 text-center text-[color:var(--highlight-blue)] text-xss history:text-base" : "border-b-2 p-0 text-center text-red-500 text-xss history:text-base"}>{item.fulfilled ? 'Fulfilled' : 'Pending'}</td>
                  <td className="border-b-2 p-0 text-center text-xss history:text-base">${item.saved}</td>
                  <td className="border-b-2 p-0 history:p-2 text-center text-xss history:text-base">${Math.round(item.total)}</td>
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
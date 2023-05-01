import React, {useContext, useEffect, useState, useMemo, memo} from 'react'
import TopNav from '../components/TopNav'
import { getOrders, userSpendings } from '../services/orderActions'
import { UserContext } from '../services/centralContext'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const History = ({smallerMenu ,setSmallerMenu}) => {
  const {user, setUser} = useContext(UserContext)
  const [userSpending, setUserSpending] = useState(null)
  const [orders, setOrders] = useState(null)
  const [status, setStatus] = useState(null) // Status false = pending, true = fulfilled
  let pending = []
  let fulfilled = []
  const nav = useNavigate()

  const spent = useMemo(() => { return (
    
    orders && 
    orders.map(({total, saved, createdAt, status,index})=> {
      var date = new Date(createdAt)
      if (status === 'Fulfilled') {
        fulfilled.push(orders[index])
      }
      else {
        pending.push(orders[index])
      }
      return {
        name: date.toLocaleString('en-gb', {day:'2-digit', month:'short', year:'numeric'}),
        total: Number(total),
        saved: Number(saved)
      }
    })
  )
},[orders])
console.log(spent)
  useEffect(()=>{
    getOrders(user?.id, {setOrders})
    userSpendings(user?.id, {setUserSpending})
  },[user])


  return (
    <div className="flex flex-col nav:w-[calc(100vw-300px)] w-full h-screen bg-right-bg overflow-x-hidden relative nav:left-[300px] pb-16">
        <TopNav smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu}/>
        <div className={smallerMenu ? "p-2 td:p-6 flex flex-col gap-6 relative top-[230px] nav:top-[0px]": "p-2 td:p-6 flex flex-col gap-6"}>
        <h1 className="text-[color:var(--blue)] drop-shadow-text text-1l homemobbreak:text-2l mb-2" style={{textShadow:"0.5px 0.5px 0px black"}}>Purchase History</h1>

        <div className=' w-full bg-white shadow-all py-4' style={{height:300}}>
          <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={100}
            data={spent}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#004299" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="saved" stroke="#64A1FF" />
        </LineChart>
      </ResponsiveContainer>
      </div>
          {orders?.length > 0  ?
          <>
          <div className="flex gap-6 flex-col history:flex-row">
            <div className="flex-[0.5] flex justify-center items-center gap-6 bg-white shadow-all p-4"><h1 className="text-2l">Total Spent</h1><p className="text-1l">${Math.round(userSpending?.total)}</p></div>
            <div className="flex-[0.5] flex justify-center items-center gap-6 bg-white shadow-all p-4"><h1 className="text-2l">Total Saved</h1><p className="text-1l">${Math.round(userSpending?.total_saved)}</p></div>
          </div>
          
          <div className="flex flex-col">
            <table className="bg-white shadow-all">
              <tbody>
              <tr className="">
                  <th className="border-b-2 p-1 td:p-2 text-xss td:text-base">Order Id</th>
                  <th className="border-b-2 p-2 td:p-2 text-left  text-xss td:text-base">Products</th>
                  <th className="border-b-2 p-0 td:p-2 text-center text-xss td:text-base">Status</th>
                  <th className="border-b-2 p-0 td:p-2 text-center text-xss td:text-base">Saved</th>
                  <th className="border-b-2 p-0 td:p-2 text-center text-xss td:text-base">Spent</th>
                </tr>
              {orders?.map((item,index)=> 
                <tr className="" key={index}>
                  <td className="border-b-2 p-0 text-xss history:text-base text-center">{index}</td>
                  <td className="border-b-2 p-0 text-left text-xss history:text-base">{item?.items_name.map((single,index)=> 
                  <p key={index} className="hover:text-[color:var(--highlight-blue)] hover:cursor-pointer text-xss history:text-base" onClick={()=>nav(`/product/${item?.items_category[index]}/${item?.items_id[index]}`)}>{single},</p>
                  )}</td>
                  <td className={item.fulfilled ? "border-b-2 p-0 text-center text-[color:var(--highlight-blue)] text-xss history:text-base" : "border-b-2 p-0 text-center text-red-500 text-xss history:text-base"}>{item.fulfilled ? 'Fulfilled' : 'Pending'}</td>
                  <td className="border-b-2 p-0 text-center text-xss history:text-base">${item.saved}</td>
                  <td className="border-b-2 p-0 history:p-2 text-center text-xss history:text-base">${Math.round(item.total)}</td>
                </tr>
              )}
              </tbody>
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
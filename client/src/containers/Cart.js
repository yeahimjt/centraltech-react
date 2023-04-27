import React, { useState, useEffect, useContext } from 'react'
import TopNav from '../components/TopNav'
import RowItem from '../components/RowItem'
import { getCart } from '../services/productActions'
import { UserContext } from '../services/centralContext'
import { Current, purchaseCart } from '../services/userActions'
import Purchase from '../assets/login/purchase.png'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {user, setUser} = useContext(UserContext);
  const [cart, setCart] = useState(null)
  const [response,setResponse] = useState(null)
  const [alertt,setAlertt] = useState(null)
  const [err,setErr] = useState(null)
  const nav = useNavigate()
  useEffect(()=>{
    Current(localStorage.getItem('access'),setUser)
    getCart(user?.id,setCart,12);
  },[response])
  const handlePurchase=()=> {
    purchaseCart(user?.id, cart)
    setCart(null)
    nav('/')
  }
  console.log(cart)
  return (
    <div className="nav:w-[calc(100vw-300px)] relative nav:left-[300px]  bg-right-bg h-screen overflow-x-hidden">
        <TopNav />
        <div className="flex gap-4 p-6">
          <div className="flex-[0.6] bg-white shadow-all p-4"> 
            <div className="flex justify-between items-center">
              <h1 className="text-2l">Cart</h1>
            </div>
            <hr/>
            <div className="mt-6">
              {cart?.length > 0 && cart?.map((item)=>
                <RowItem key={item?._id} item={item} setResponse={setResponse} setAlertt={setAlertt} setErr={setErr}/>
              )}
            </div>
          </div>
          <div className="flex-[0.4] bg-white shadow-all p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2l">Checkout</h1>
            </div>
            <hr/>
            <div className="flex flex-col gap-4 w-[75%] mx-auto mt-6">
              <div className="flex justify-between">
                <h1>Original Price</h1>
                {cart?.length > 0 ? 
                <p>${cart?.reduce((total,item)=>total+(Number(item.price)),0)}</p>
                :
                <p>0.00</p>
                }
              </div>
              <div className="flex justify-between">
                <h1>Shipping</h1>
                {cart?.length > 0 ? 
                <p>$8.00</p>
                :
                <p>0.00</p>
                }
              </div>
              <div className="flex justify-between">
                <h1>Tax</h1>
                {cart?.length > 0 ? 
                <p>${cart?.reduce((total,item)=>total+(Number(item.sale) ? Number(item.sale) : Number(item.price)),0)*0.10}</p>
                :
                <p>0.00</p>

                }
              </div>
              <div className="flex justify-between">
                <h1>Sales applicable</h1>
                {cart?.length > 0 ? 
                <p>-${Math.round(cart?.reduce((total,item)=>total+(Number(item.sale) ? Number(item.price)-Number(item.sale) : 0),0))}</p>
                :
                <p>0.00</p>
                }
              </div>
              <div className="flex justify-between">
                <h1>Actual</h1>
                {cart?.length > 0 ?
                <p>${cart?.reduce((total,item)=>total+(Number(item.sale) ? Number(item.sale) : Number(item.price)),0)+cart?.reduce((total,item)=>total+(Number(item.sale) ? Number(item.sale) : Number(item.price)),0)*0.10+8}</p>
                :
                <p>0.00</p>
                }
              </div>
                <button className="bg-[color:var(--highlight-blue)] hover:scale-105 hover:cursor-pointer transition-all text-white rounded-md py-2 mt-6 flex justify-center items-center gap-6" onClick={()=>handlePurchase()}><img className="w-[30px] h-[20px]" src={Purchase} alt="Purchase Icon"/>Purchase</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart
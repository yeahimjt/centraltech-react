import React, { useContext, useState } from 'react'
import {BsFillTrashFill} from 'react-icons/bs'
import { ProductContext, UserContext } from '../services/centralContext'
import { addItemToCart } from '../services/productActions'
import { removeCartItem } from '../services/userActions'
import { useNavigate } from 'react-router-dom'
import { getByID } from '../services/productActions'
const RowItem = ({item, setResponse, setAlertt,setErr}) => {
    const {user,setUser} = useContext(UserContext)
    const {proudct, setProduct} = useContext(ProductContext)
    const nav = useNavigate()
    const handleClick =()=> {
        getByID(item?._id,{setProduct})
        nav(`/product/${item?.category}/${item?._id}`)
    }
    const addItem = () => {
        if (user) {
            addItemToCart(item?._id,user?.id,{setResponse})
            setAlertt(true)
        }
        else {
            setErr(["Unable to add item to cart", "Please login to access all features."])
            setAlertt(true)
        }
    }
    const removeItem = () => {
        if (user) {
            removeCartItem(user?.id, item?._id, {setResponse})
            setAlertt(true)
            nav('/cart')
        }
        else {
        }
    }
    return (
    <div className="flex  gap-4  items-center hover:bg-[color:var(--light-blue)] hover:text-[color:var(--black)] hover:cursor-pointer rounded-full transition-all pl-4 pr-8 py-2" onClick={()=>handleClick()}>
        <div className="rounded-full   w-[60px] h-[60px] flex items-center bg-white shadow-all">
            <img className="rounded-full object-scale-down w-[60px] h-[40px]" src={item?.path_url} alt="Beats"/>
        </div>
        <div className="flex flex-[1] flex-col w-full">
            <div className="flex justify-between items-center gap-4 overflow-hidden text-ellipsis w-full">
                <h1 className={window.location.pathname==='/cart' ? "text-ellipsis w-[50px] homemobbreak:w-full overflow-hidden whitespace-nowrap text-xm" :"text-ellipsis w-[50px] homemobbreak:w-[250px] overflow-hidden whitespace-nowrap text-xm"}>{item?.name}</h1>
                <div>
                    {item?.sale &&
                        <>
                        <p className="line-through text-text ">${item?.price}</p>
                        <p className=" text-text text-[color:var(--highlight-blue)] ">${item?.sale}</p>
                        </>
                    }
                    {!item?.sale &&
                        <p className="text-[color:var(--highlight-blue)] text-text ">${item?.price}</p>
                    }
                </div>
            </div>
            <div className="flex justify-between gap-4">
                <h1 className="homemobbreak:text-xss">560 reviews</h1>
                <p className="homemobbreak:text-xss">1029 Orders</p>
                {window.location.pathname === '/cart' ? 
                    <button className="bg-[color:var(--blue)] p-2 text-white rounded-lg hover:bg-[color:var(--highlight-blue)]" onClick={(e)=>{e.stopPropagation(); removeItem()}}><BsFillTrashFill/></button>
                    :
                    <button className="bg-[color:var(--blue)] px-2 text-white rounded-lg hover:bg-[color:var(--highlight-blue)]" onClick={(e)=>{e.stopPropagation(); addItem()}}>+</button>
                }
            </div>
        </div>
    </div>
    )
}

export default RowItem
import React, {useContext, useState} from 'react'
import {AiFillStar} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { ProductContext, UserContext } from '../services/centralContext'
import { addItemToCart, getByID } from '../services/productActions'
const ColumnCard = ({item, setResponse, setErr, setAlertt}) => {
    console.log(item)
    const {user, setUser} = useContext(UserContext)
    const nav = useNavigate()
    const {product, setProduct} = useContext(ProductContext)
    const handleClick = () => {
            setProduct(null)
            redirect()
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
    const redirect = () => {
        getByID(item?._id,{setProduct})
        nav(`/product/${item?.category}/${item?._id}`)
    }
    return (
    <div className="w-[100px] min-w-[150px] homemobbreak:w-[188px] bg-white hover:rounded-2xl flex flex-col justify-center p-2 shadow-all hover:scale-[1.01] hover:cursor-pointer transition-all" value={item?._id} onClick={()=>handleClick()}>
        <div className="h-[150px]  flex flex-[0.5] justify-center items-center relative">
            <img className="object-scale-down h-[150px]" src={item?.path_url} alt="Product"/>
        </div>
        <div className="flex-[0.5] flex flex-col justify-between">
            <div>
                <h1 className="text-text mt-4 h-[20px] text-ellipsis overflow-hidden whitespace-nowrap">{item?.name}</h1>
                <p className="text-xss">Price ${item?.price}</p>
            </div>
            <div className="flex justify-between items-end">
                <section className="flex gap-2">
                    <AiFillStar className="text-[color:var(--highlight-blue)]"/>
                    <p className="text-xss">{item?.rating}</p>
                </section>
                <button className="bg-[color:var(--blue)] px-2 text-white rounded-lg hover:bg-[color:var(--highlight-blue)] hover:scale-105 hover:cursor-pointer" onClick={(e)=>{e.stopPropagation(); addItem()}}>+</button>
            </div>
        </div>
    </div>
)
}

export default ColumnCard
import React, {useState, useContext, useEffect} from 'react'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { addItemToSave,addItemToCart, checkItemToSave, removeItemToSave, getByID } from '../services/productActions'
import { ProductContext } from '../services/centralContext'
const RowCard = ({user,recommended, setResponse, setErr, setAlert, setLoading}) => {
    const {product, setProduct} = useContext(ProductContext)
    const [itemSaved, setItemSaved] = useState(null)
    const nav = useNavigate()
    useEffect(()=> {
        checkItemToSave(recommended?._id,user?.id,{setItemSaved})
    },[recommended])
    const addItem = () => {
        if (user) {
            addItemToCart(recommended?._id,user?.id,{setResponse})
            setAlert(true)
            setErr(null)
        }
        else {
            setErr(["Unable to add item to cart", "Please login to access all features."])
            setAlert(true)
        }
    }
    const saveItem = () => {
        if (user) {
            addItemToSave(recommended?._id,user?.id,{setResponse,setItemSaved})
            setAlert(true)
        }
        else {
            setErr(["Unable to add item to save","Please login to access all features."])
            setAlert(true)
        }
    }
    const unSaveItem = () => {
        if (user) {
            removeItemToSave(recommended?._id,user?.id,{setResponse,setItemSaved})
            setAlert(true)
        }
        else {
            setErr(["Unable to remove item from save","Please login to access all features."])
            setAlert(true)
        }
    }
    const handleClick = () => {
        getByID(recommended?._id,{setProduct})
        nav(`/product/${recommended?.category}/${recommended?._id}`)
    }
  return (
    <div className="flex gap-4    p-4 shadow-all recommendbreak:flex-row flex-col bg-white hover:scale-[1.01] hover:cursor-pointer transition-all hover:rounded-2xl" onClick={()=>handleClick()}>
        <div className="flex items-center recommendbreak:justify-center mx-auto"><img className="w-[191px] h-[203px] object-scale-down" src={recommended?.path_url} alt="Recommended computer"/></div>
            <div className="flex flex-col flex-[1] justify-evenly p-4" value={recommended?._id}>
                <h1 className="text-1l">{recommended?.name}</h1>
                {recommended?.sale ?
                    <>
                    <div className="flex gap-4">
                    <p className="line-through">${recommended?.price}</p>
                    <p className="text-[color:var(--highlight-blue)]">${recommended?.sale}</p>
                    </div>
                    </>
                    :
                    <p className="text-[color:var(--highlight-blue)]">${recommended?.price}</p>
                }
                <p className="text-text">{recommended?.description}</p>
            <div className="flex gap-4 justify-end">
            {itemSaved ? 
                                <button className="border-2 border-[color:var(--light-blue)] rounded-lg px-4 py-1 text-xss hover:border-[color:var(--highlight-blue)] hover:scale-105 hover:cursor-pointer" onClick={(e)=>{e.stopPropagation(); unSaveItem()}}>
                                    <AiFillHeart className="text-[color:var(--light-blue)] transition-all" size={20}/>
                                </button>
                                :
                                <button className="border-2 border-[color:var(--light-blue)] rounded-lg px-4 py-1 text-xss hover:border-[color:var(--highlight-blue)] hover:scale-105 hover:cursor-pointer" onClick={(e)=>{e.stopPropagation(); saveItem()}}>
                                    <AiOutlineHeart className=" text-[color:var(--light-blue)] transition-all" size={20}/>
                                </button>
                            }
                <button className="border-2 border-[color:var(--light-blue)] rounded-lg w-[100px] py-1 text-xss hover:border-[color:var(--highlight-blue)] hover:scale-105 hover:cursor-pointer transition-all" onClick={(e)=>{e.stopPropagation(); addItem()}}>Add to Cart</button>
                <button className="bg-[color:var(--blue)] rounded-lg px-4 w-[100px] py-1 text-xss hover:scale-105 hover:cursor-pointer hover:bg-[color:var(--highlight-blue)] hover:text-white transition-all" onClick={(e)=>{e.stopPropagation(); addItem()}}>Buy Now</button>
            </div>
        </div>
    </div>
  )
}

export default RowCard
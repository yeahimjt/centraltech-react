import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import TopNav from '../components/TopNav'
import { addItemToCart, addItemToSave, checkItemToSave, getByID, removeItemToSave } from '../services/productActions'
import { AiOutlineHeart, AiFillStar, AiFillHeart } from 'react-icons/ai'
import {MdError} from 'react-icons/md'
import { Current } from '../services/userActions'
import Alert from '../components/Alert'
import { getCategory } from '../services/productActions'
import { ProductContext, UserContext } from '../services/centralContext'
import ColumnCard from '../components/ColumnCard'

const Product = () => {
    const {category,id} = useParams()
    const {user, setUser} = useContext(UserContext)
    const {product, setProduct} = useContext(ProductContext)
    const [simProduct, setSimProduct] = useState(null)
    const [response, setResponse] = useState(null)
    const [err, setErr] = useState(null)
    const [alert, setAlert] = useState(true)
    const [itemSaved, setItemSaved] = useState(null)
    useEffect(()=>{
        getByID(id,{setProduct})
        checkItemToSave(id,user?.id,{setItemSaved})
        getCategory(category,{setPopularHP: setSimProduct}, 6)
    },[id])


    
    const star = Math.round(Number(product?.rating))
    const addItem = () => {
        if (user) {
            addItemToCart(id,user?.id,{setResponse})
            setAlert(true)
        }
        else {
            setErr(["Unable to add item to cart", "Please login to access all features."])
            setAlert(true)
        }
    }
    const saveItem = () => {
        if (user) {
            addItemToSave(id,user?.id,{setResponse,setItemSaved})
            setAlert(true)
        }
        else {
            setErr(["Unable to add item to save","Please login to access all features."])
            setAlert(true)
        }
    }
    const unSaveItem = () => {
        if (user) {
            removeItemToSave(id,user?.id,{setResponse,setItemSaved})
            setAlert(true)
        }
        else {
            setErr(["Unable to remove item from save","Please login to access all features."])
            setAlert(true)
        }
    }


  return (
    <>
    <div className="flex flex-col nav:w-[calc(100vw-300px)] w-full h-screen bg-right-bg overflow-x-hidden relative nav:left-[300px]">
        <TopNav />
        <div className="flex flex-col p-6 gap-6">
            <div className="grid grid-cols-1 productbreak:grid-cols-2 gap-12 ">
                <div className='flex flex-col bg-white  shadow-all p-12 min-h-[600px]'>
                        <div className=''>
                            <div className="w-[150px] h-[150px] productimgbreak:w-[350px] productimgbreak:h-[350px] mx-auto mb-4">
                                <img className="object-scale-down w-[150px] h-[150px] productimgbreak:w-[350px] productimgbreak:h-[350px] flex items-center justify-center " src={product?.path_url} alt="Product"/>
                            </div>
                            <div className="">
                                <h1 className="text-1l font-medium">{product?.name}</h1>
                                <p className="text-base text-[color:var(--faded)]">{product?.seller}</p>
                                <p className="text-base">${product?.price}</p>
                                <div className="flex gap-2 items-center">
                                        {star === 1 ?
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/>
                                            :
                                            ''
                                        }
                                        {star === 2 ?
                                            <>
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/>
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/>
                                            </>
                                            :
                                            ''
                                        }
                                        {star === 3 ?
                                            <>
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/> 
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/> 
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/> 
                                            </>
                                            :
                                            ''
                                        }
                                        {star === 4 ?
                                            <>
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/>
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/>
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/>
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/>
                                            </>
                                            :
                                            ''
                                        }
                                        {star === 5 ?
                                            <>
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/>
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/>
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/>
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/>
                                            <AiFillStar className="text-[color:var(--highlight-blue)]" size={20}/>
                                            </>
                                            :
                                            ''
                                        }
                                    <p className="text-xss">(lots of reviews)</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 justify-between">
                        <h1>{product?.description}</h1>
                        <div className="flex gap-4 justify-center">
                            {itemSaved ? 
                                <button className="border-2 border-[color:var(--light-blue)] rounded-lg px-4 py-1 text-xss hover:scale-105 hover:cursor-pointer" onClick={()=>unSaveItem()}>
                                    <AiFillHeart className="text-[color:var(--light-blue)] transition-all" size={20}/>
                                </button>
                                :
                                <button className="border-2 border-[color:var(--light-blue)] rounded-lg px-4 py-1 text-xss hover:scale-105 hover:cursor-pointer" onClick={()=>saveItem()}>
                                    <AiOutlineHeart className="text-[color:var(--light-blue)] transition-all" size={20}/>
                                </button>
                            }
                            <button className="border-2 border-[color:var(--light-blue)] rounded-lg w-[100px] py-1 text-xss hover:scale-105 hover:cursor-pointer transition-all" onClick={()=>addItem()}>Add to Cart</button>
                            <button className="bg-[color:var(--blue)] rounded-lg px-4 w-[100px] py-1 text-xss hover:scale-105 hover:cursor-pointer hover:bg-[color:var(--highlight-blue)] hover:text-white transition-all">Buy Now</button>
                        </div>
                        </div>
                </div>
                <div className="">
                    <div className="w-full">
                        <div className="flex justify-between items-center">
                            <h1 className="text-[color:var(--blue)]  text-1l homemobbreak:text-2l mb-2" style={{textShadow:"0.5px 0.5px 0px black"}}>Reviews</h1>
                            <p className="">see all...</p>
                        </div>
                        <div className="flex flex-col gap-4">
                                {(product?.reviews || '').split("\",\"").map((review,i)=> 
                                <div key={i} className="bg-white rounded-xl gap-4 flex flex-col p-12 shadow-all">
                                <div className='flex gap-4 items-end'>
                                        <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14 0C10.15 0 7 4.03074 7 8.99719C7 13.9636 10.15 17.9944 14 17.9944C17.85 17.9944 21 13.9636 21 8.99719C21 4.03074 17.85 0 14 0ZM6.685 17.9944C2.975 18.1743 0 21.3053 0 25.1921V28.791H28V25.1921C28 21.3053 25.06 18.1743 21.315 17.9944C19.425 20.1897 16.835 21.5933 14 21.5933C11.165 21.5933 8.575 20.1897 6.685 17.9944Z" fill="black"/>
                                        </svg>
                                        <h1>Anonymous</h1>
                                    <div></div>
                                    </div>
                                    <div className="text-sm">{review.replace(/['"]+/g, '')}</div>
                                </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <h1 className="text-[color:var(--blue)]  text-1l homemobbreak:text-2l mb-2" style={{textShadow:"0.5px 0.5px 0px black"}}>More {product?.category} products</h1>
                <div className="flex gap-4 justify-start flex-wrap">
                    {simProduct?.length > 0 ?
                        simProduct.map((item)=> 
                            // If current product is fetched from Category call, do not display it.
                            item._id === id ? 
                            ''
                            :
                            <ColumnCard key={item._id} item={item} />
                        )
                    :
                    <h1>No other products exist in {product?.category}</h1>
                    }
                </div>
            </div>
        </div>
        {err && alert &&
        <Alert Icon={MdError} Header={err[0]} Text={err[1]} setAlert={setAlert}/>
        }
        {!err && alert && response &&
        <Alert Icon={MdError} Header={response[0]} Text={response[1]} setAlert={setAlert}/>
        }
    </div>
    
    </>
  )
}

export default Product
import React, {useContext, useEffect, useState} from 'react'
import TopNav from '../components/TopNav'
import ColumnCard from '../components/ColumnCard'
import { getByID, getCategory } from '../services/productActions'
import Keyboard from '../assets/login/keyboard.png'
import Mouse from '../assets/login/mouse.png'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {GrDesktop} from 'react-icons/gr'
import {BsLaptop,BsHeadphones,BsFillKeyboardFill} from 'react-icons/bs'
import Alert from '../components/Alert'
import RowCard from '../components/RowCard'
import { UserContext } from '../services/centralContext'
const Explore = ({smallerMenu, setSmallerMenu}) => {
    const {user, setUser} = useContext(UserContext)
    const [category, setCategory] = useState("All")
    const [computer, setComputer] = useState(null) // Replace with another name later
    const [response,setResponse] = useState(null)
    const [alertt,setAlertt] = useState(null)
    const [err,setErr] = useState(null)
    const [product,setProduct] = useState(null)
    useEffect(()=> {
        getCategory(category, {setPopularHP: setComputer},15)
        getByID('6444841e2c923711fc6fe7b0', {setProduct})
    },[category])
    console.log(product)
    return (
    <div className="">
        <div className={smallerMenu ? "nav:w-[calc(100vw-300px)] relative nav:left-[300px]  bg-right-bg nav:h-screen h-screen overflow-x-hidden" : "nav:w-[calc(100vw-300px)] relative nav:left-[300px] nav:top-[0px] bg-right-bg nav:h-screen h-screen overflow-x-hidden"}>
            <TopNav smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu}/>
            <div className={smallerMenu ? "flex flex-col p-6 relative top-[200px] nav:top-[0px]" : "flex flex-col p-6 "}>
                    <h1 className="text-[color:var(--blue)] drop-shadow-text text-1l homemobbreak:text-2l mb-2" style={{textShadow:"0.5px 0.5px 0px black"}}>Our Best Sale!</h1>
                <div className="flex flex-col recom:flex-row gap-16">
                    <div className="flex-[0.6] flex flex-col justify-start items-start">
                        <RowCard user={user} recommended={product} setResponse={setResponse} setErr={setErr} setAlert={setAlertt}/>
                    </div>
                    <div className="bg-[color:var(--highlight-blue)] shadow-all   px-8 py-4 rounded-md  recom:flex-[0.4] h-[235px]  mx-auto hover:scale-[1.01] hover:cursor-pointer transition-all z-10">
                        <h1 className="text-2l text-white z-20">Recommended products <br></br>to start gaming</h1>
                        <div className="flex justify-end -z-0">
                            <img className="w-[200px] h-[200px] images:w-[260px] images:h-[146px] object-scale-down relative left-52 -top-12 recom:left-64" src={Mouse} alt="Mouse"/>
                            <img className="w-[300px] h-[300px] images:w-[403px] images:h-[478px] object-scale-down relative left-20 -top-12 recom:left-24 recom:-top-24" src={Keyboard} alt="Keyboard"/>
                        </div>
                    </div>
                </div>
            <div className="flex flex-col z-20  pt-24 pb-6">
                <h1 className="mb-2">Explore by category...</h1>
                <div className="flex justify-center filters:justify-start gap-3 categories:gap-6 flex-wrap">
                    <button className="w-[90px] bg-[color:var(--light-blue)] text-white categories:w-[150px] border-2 hover:border-[color:var(--blue)] hover:cursor-pointer hover:scale-105  rounded-full hover:bg-white hover:text-black transition-all py-2 text-xss flex justify-center items-center gap-2 categories:gap-6 categories:text-xm" onClick={()=>setCategory('All')}>All</button>
                    <button className="w-[90px] bg-[color:var(--light-blue)] text-white categories:w-[150px] border-2 hover:border-[color:var(--blue)] hover:cursor-pointer hover:scale-105  rounded-full hover:bg-white hover:text-black transition-all py-2 text-xss flex justify-center items-center gap-2 categories:gap-6 categories:text-xm" onClick={()=>setCategory('Computers')}><GrDesktop size={18}/>Computers</button>
                    <button className="w-[90px] bg-[color:var(--light-blue)] text-white categories:w-[150px] border-2 hover:border-[color:var(--blue)] hover:cursor-pointer hover:scale-105  rounded-full hover:bg-white hover:text-black transition-all py-2 text-xss flex justify-center items-center gap-2 categories:gap-6 categories:text-xm" onClick={()=>setCategory('Laptops')}><BsLaptop size={18}/>Laptops</button>
                    <button className="w-[90px] bg-[color:var(--light-blue)] text-white categories:w-[150px] border-2 hover:border-[color:var(--blue)] hover:cursor-pointer hover:scale-105  rounded-full hover:bg-white hover:text-black transition-all py-2 text-xss flex justify-center items-center gap-2 categories:gap-6 categories:text-xm" onClick={()=>setCategory('Headphones')}><BsHeadphones size={18}/>Headphones</button>
                    <button className="w-[90px] bg-[color:var(--light-blue)] text-white categories:w-[150px] border-2 hover:border-[color:var(--blue)] hover:cursor-pointer hover:scale-105  rounded-full hover:bg-white hover:text-black transition-all py-2 text-xss flex justify-center items-center gap-2 categories:gap-6 categories:text-xm" onClick={()=>setCategory('Keyboards')}><BsFillKeyboardFill size={18}/>Keyboards</button>
                </div>
            </div>
            <div className="bg-white shadow-all p-6 flex flex-[0.5] flex-col z-20">
                    <div className="flex justify-between items-center">
                        <h1 className="text-1l homemobbreak:text-2l mb-2">{category}</h1>
                        <p>see all...</p>
                    </div>
                    <hr/>
                    <div className="flex justify-center gap-3 category:gap-8 flex-wrap mt-6">
                        {computer?.map((item) => 
                        <ColumnCard key={item._id} item={item} setResponse={setResponse} setAlertt={setAlertt} setErr={setErr}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    {/* Alert for stuff succeeding */}
    {alertt && response && !err &&
    <Alert Icon={AiOutlineCheckCircle} Header={response[0]} Text={response[1]} setAlert={setAlertt} />
    }
    {/* Alert for login */}
    </div>
  )
}

export default Explore
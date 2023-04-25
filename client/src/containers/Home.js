import React, {useEffect, useState, Suspense, useContext} from 'react'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import Alert from '../components/Alert'
import LaptopLeft from '../assets/laptop-left.png'
import LaptopRight from '../assets/laptop-right.png'
import Beats from '../assets/beats.png'
import {AiFillStar, AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import { getRecommended, getCategory, getSale } from '../services/productActions'
import RowCard from '../components/RowCard'
import ColumnCard from '../components/ColumnCard'
import Coins from '../assets/Expensive Price.png'
import {RiCoinsFill} from 'react-icons/ri'
import RowItem from '../components/RowItem'
import {MdError} from 'react-icons/md'
import { UserContext } from '../services/centralContext'

const Home = ({ setAlert, alert, smallerMenu, setSmallerMenu, loading,setLoading}) => {
  const [recommended, setRecommended] = useState(null)
  const [popularHP, setPopularHP] = useState(null)
  const [sale, setSale] = useState(null)
  const {user, setUser} = useContext(UserContext)
  // For alert 
  console.log(user)
  const [response, setResponse] = useState(null)
  const [err, setErr] = useState(null)
  const [alertt, setAlertt] = useState(null)
  const max = 4
  useEffect(()=>{
    getRecommended({setRecommended})
    getCategory("Headphones",{setPopularHP}, max)
    getSale({setSale},max)
  },[])

  return (
    <Suspense fallback={<div>Hi</div>}>
    <div className={!smallerMenu ? "flex nav:w-[calc(100vw-300px)] w-full h-screen bg-right-bg overflow-x-hidden relative nav:left-[300px]": "flex nav:w-[calc(100vw-300px)] w-full h-screen bg-right-bg overflow-x-hidden relative nav:left-[300px]"}>
      <div className="">
        {/* NAV GOES HERE SIDENAV REMOVE LEFT-[300px] FROM HERE AND MAKE NAV NOT FIXED */}
      </div>
      <header className="w-full">
        <TopNav smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu}/>
        <div className={!smallerMenu ? "p-6 w-full flex flex-col justify-center homebreak:flex-row gap-16":"p-6 w-full flex flex-col justify-center homebreak:flex-row gap-16 relative top-[200px] nav:top-[24px]"}>
          <div className=" flex flex-col ">
            <div>
              <h1 className="text-[color:var(--blue)] drop-shadow-text text-1l homemobbreak:text-2l mb-2" style={{textShadow:"0.5px 0.5px 0px black"}}>What we recommend</h1>
              <RowCard user={user} recommended={recommended} setResponse={setResponse} setErr={setErr} setAlert={setAlertt} loading={loading} setLoading={setLoading}/>
            </div>
            <div className="mt-[42px] flex flex-col">
              <div className="flex justify-between items-center">
              <h1 className="text-[color:var(--blue)] drop-shadow-text text-1l homemobbreak:text-2l mb-2" style={{textShadow:"0.5px 0.5px 0px black"}}>See Popular Headphones</h1>
              <p>see all...</p>
              </div>
              <div className="flex justify-center gap-8 flex-wrap">
                {popularHP?.map((item) => 
                  <ColumnCard key={item._id} item={item}/>
                )}
              </div>
            </div>
            <div className="mt-[42px]">
              <h1 className="text-[color:var(--blue)] drop-shadow-text text-1l homemobbreak:text-2l mb-2" style={{textShadow:"0.5px 0.5px 0px black"}}>See Popular Categories</h1>
              <div className="flex flex-col justify-between recommendbreak:flex-row gap-4 recommendbreak:gap-0">
                <div className="flex flex-[0.45] gap-4 items-center  bg-white shadow-all justify-center py-8 rounded-xl hover:scale-[1.01] hover:cursor-pointer transition-all">
                  <AiFillStar size={32} className="text-[color:var(--highlight-blue)]"/>
                  <h1>Top 5 Popular Brands</h1>
                </div>
                <div className="flex flex-[0.45] gap-4 items-center  bg-white shadow-all justify-center py-8 rounded-xl hover:scale-[1.01] hover:cursor-pointer transition-all">
                  <RiCoinsFill size={32} className="text-[color:var(--highlight-blue)]"/>
                  <h1>Most Selling</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  homebreak:w-[500px] w-full flex-col homebreak:mt-[53px]">
            <div className="bg-[color:var(--blue)] h-[204px] px-8 py-4 rounded-md flex flex-col hover:scale-[1.01] hover:cursor-pointer transition-all">
              <h1 className="text-2l text-white z-20">Laptops from <br></br>top brands</h1>
              <div className="flex relative left-20 justify-end">
                <img className="w-[260px] h-[146px] relative left-32 -top-12" src={LaptopLeft}/>
                <img className="w-[233px] h-[178px] relative -left-2 -top-12" src={LaptopRight}/>
              </div>
            </div>
            <div className="mt-[71px]">
              <div className="flex justify-between items-center">
              <h1 className="text-[color:var(--blue)] drop-shadow-text text-1l homemobbreak:text-2l mb-2" style={{textShadow:"0.5px 0.5px 0px black"}}>Exclusive Sale!</h1>
              <p>view all...</p>
              </div>
              <div className="flex flex-col gap-4">
                {sale?.map((item)=>
                  <RowItem key={item?._id} item={item} />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>

    {/* Alert for stuff failing */}
    {alert && err &&
    <Alert Icon={MdError} Header={err[0]} Text={err[1]} setAlert={setAlert}/>
    }
    {/* Alert for stuff succeeding */}
    {alertt && response && !err &&
    <Alert Icon={AiOutlineCheckCircle} Header={response[0]} Text={response[1]} setAlert={setAlertt} />
    }
    {/* Alert for login */}
    {alert  && !err &&
    <Alert Icon={AiOutlineCheckCircle} Header={`Greetings ${user?.username}`} Text={"Thank you, login was succesful!"} setAlert={setAlert}/>
    }
    </Suspense>
  )
}

export default Home
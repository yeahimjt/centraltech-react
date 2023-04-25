import React, {useEffect, useState} from 'react'
import TopNav from '../components/TopNav'
import ColumnCard from '../components/ColumnCard'
import { getCategory } from '../services/productActions'

const Explore = () => {
    const [computer, setComputer] = useState(null)
    const [headphone, setHeadphone] = useState(null)
    const [laptop, setLaptop] = useState(null)
    const [tablet, setTablet] = useState(null)

    useEffect(()=> {
        getCategory("Computers", {setPopularHP: setComputer},6)
        getCategory("Headphones", {setPopularHP: setHeadphone},6)
    },[])
  return (
    <div className="">
        <div className="nav:w-[calc(100vw-300px)] relative nav:left-[300px] bg-right-bg nav:h-screen h-full">
            <TopNav/>
            <div className="flex flex-col p-6 gap-6">
            <div className="mt-[42px] flex flex-col">
                    <div className="flex justify-between items-center">
                        <h1 className="text-[color:var(--blue)] drop-shadow-text text-1l homemobbreak:text-2l mb-2" style={{textShadow:"0.5px 0.5px 0px black"}}>See Popular Computers</h1>
                        <p>see all...</p>
                    </div>
                    <div className="flex justify-center gap-8 flex-wrap">
                        {computer?.map((item) => 
                        <ColumnCard key={item._id} item={item}/>
                        )}
                    </div>
                </div>
                <div className="mt-[42px] flex flex-col">
                    <div className="flex justify-between items-center">
                        <h1 className="text-[color:var(--blue)] drop-shadow-text text-1l homemobbreak:text-2l mb-2" style={{textShadow:"0.5px 0.5px 0px black"}}>See Popular Headphones</h1>
                        <p>see all...</p>
                    </div>
                    <div className="flex justify-center gap-8 flex-wrap">
                        {headphone?.map((item) => 
                        <ColumnCard key={item._id} item={item}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Explore
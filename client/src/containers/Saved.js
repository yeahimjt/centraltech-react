import React, { useContext, useEffect, useState } from 'react'
import TopNav from '../components/TopNav'
import { getSaved } from '../services/productActions'
import { UserContext } from '../services/centralContext'
import ColumnCard from '../components/ColumnCard'

const Saved = ({smallerMenu, setSmallerMenu}) => {
    const {user, setUser} = useContext(UserContext)
    const [saved, setSaved] = useState(null)
    useEffect(()=> {
        getSaved(user?.id,setSaved, 15)
    },[])
  return (
    <div className="nav:w-[calc(100vw-300px)] relative nav:left-[300px]   bg-right-bg h-screen overflow-x-hidden">
        <TopNav smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu}/>
        <div className={smallerMenu ? "p-6 relative top-[250px] nav:top-[0px]" : "p-6"}>
            {saved?.length>0 ? 
            <>
            <h1 className="text-[color:var(--blue)] drop-shadow-text text-1l homemobbreak:text-2l mb-2" style={{textShadow:"0.5px 0.5px 0px black"}}>Items you have saved</h1>
            <div className="flex gap-4 justify-around flex-wrap">
                {saved?.map((item)=> 
                    <ColumnCard key={item._id} item={item}/>
                )}
            </div>
            </>
            :
            <p className="text-red-500 text-center text-2l animate-scaleup">You must save items to populate this <i className="text-1l">(saved items)</i> page. To save an item you must click the heart icons viewable on both item cards and item product pages.</p>
            }
        </div>

    </div>
  )
}

export default Saved
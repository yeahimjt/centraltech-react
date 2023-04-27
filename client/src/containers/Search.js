import React, {useState, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import TopNav from '../components/TopNav'
import { searchFor } from '../services/productActions'
import ColumnCard from '../components/ColumnCard'
import Alert from '../components/Alert'
import {AiOutlineCheckCircle} from 'react-icons/ai'

const Search = ({smallerMenu, setSmallerMenu}) => {
    const {query} = useParams()
    const [results, setResults] = useState(null)
    const [response,setResponse] = useState(null)
    const [alertt,setAlertt] = useState(null)
    const [err,setErr] = useState(null)
    const [seller,setSeller] = useState([])
    const [category, setCategory] = useState([])
    const [remove,setRemove] = useState([])
    const [reset, setReset] = useState(false)
    useEffect(()=> {
        searchFor(query, null, {setResults})
    },[query])

    useEffect(()=> {
        searchFor(query, null, {setResults})
        setRemove([])
    },[reset])

    useEffect(()=> {
        searchFor(query, remove,{setResults})
    },[remove])

    useEffect(()=> {
        let temp = []
        let tempp = []
        setSeller([])
        setCategory([])
        results?.map((item) => {
            if (!temp.includes(item.seller)) {
                temp.push(item.seller)
                setSeller(oldArray=> [...oldArray, item.seller])
            }
            if (!tempp.includes(item.category)) {
                console.log(item.category)
                tempp.push(item.category)
                setCategory(oldArray=> [...oldArray, item.category])
            }
        })
    },[results])


    const handleUpdate = (e) => {
        // console.log(e.target.value)
        // results?.map((item,index)=> {
        //     if (item.seller === e.target.value) {
        //         console.log('Matches', item)
        //         results.splice(index,1)
        //     }
        // })
        if (!remove.includes(e.target.value)) {
            setRemove(oldArray=> [...oldArray, e.target.value])
        }
    }
  return (
    <div className="nav:w-[calc(100vw-300px)] relative nav:left-[300px]  bg-right-bg nav:h-screen h-screen overflow-x-hidden">
        <TopNav  smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu} />
        <h1 className={smallerMenu?"text-[color:var(--blue)] drop-shadow-text text-1l homemobbreak:text-2l  px-6 pt-6 mt-[200px] nav:mt-[0px]":"text-[color:var(--blue)] drop-shadow-text text-1l homemobbreak:text-2l mb-2 px-6"} style={{textShadow:"0.5px 0.5px 0px black"}}>Search results for '{query}'...</h1>
        <div className="flex flex-col searchbreak:flex-row p-12 pt-4 gap-6  overflow-x-hidden">
            <div className="bg-white shadow-all searchbreak:flex-[0.2]   flex flex-col gap-4 p-3 py-6">
                <div className="flex justify-between items-center ">
                    <h1 className="text-1l font-medium">Filters</h1>
                    <p className="text-[color:var(--faded)] text-xm hover:cursor-pointer hover:text-[color:var(--highlight-blue)]" onClick={()=>setReset(!reset)}>Reset filters</p>
                </div>
                <div className="flex flex-col ">
                    <h1>Seller</h1>
                    {seller.length > 0 && seller.map((item)=> 
                        <div className="flex gap-4 flex-wrap">
                            <input type="checkbox" checked value={item} onChange={(e)=>handleUpdate(e)}/>
                            <label>{item}</label>
                        </div>
                    )}
                    
                </div>
                {/* <div className="flex flex-col">
                    <h1>Price</h1>
                    <div className="w-full flex gap-4 justify-center ">
                        <input className="bg-[color:var(--light)] text-white max-w-[125px] rounded-lg px-4 py-1" type="text" placeholder="$ Min"/>
                        <input className="bg-[color:var(--light)] text-white max-w-[125px] rounded-lg px-4 py-1" type="text" placeholder="$ Max"/>
                    </div>
                </div> */}
                <div className="flex flex-col">
                    <h1>Category</h1>
                    {category.length > 0 && category.map((item)=> 
                        <div className="flex gap-4">
                            <input type="checkbox" checked value={item} onChange={(e)=>handleUpdate(e)}/>
                            <label>{item}</label>
                        </div>
                    )}
                </div>
            </div>
            <div className="searchbreak:flex-[0.8] flex flex-wrap justify-center searchbreak:justify-start gap-2 searchbreak:gap-6 h-full">{results?.map((item)=>
                <ColumnCard key={item._id} item={item} setResponse={setResponse} setAlertt={setAlertt} setErr={setErr}/>
            )}</div>
        </div>
        {/* Alert for stuff succeeding */}
    {alertt && response && !err &&
    <Alert Icon={AiOutlineCheckCircle} Header={response[0]} Text={response[1]} setAlert={setAlertt} />
    }
    </div>
  )
}

export default Search
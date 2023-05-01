import React, { useEffect, useState, PureComponent, useMemo } from 'react'
import TopNav from '../components/TopNav'
import { getCategory } from '../services/productActions'
import { getUsers } from '../services/userActions'
import ColumnCard from '../components/ColumnCard'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import Alert from '../components/Alert'
import { allOrders } from '../services/orderActions'
import { useNavigate } from 'react-router-dom'
import AdminNav from '../components/AdminNav'
import Pie from '../components/Pie'

const Admin = ({smallerMenu, setSmallerMenu}) => {
    const [section, setSection] = useState('Dashboard')
    const [product, setProduct] = useState(null)
    const [users, setUsers] = useState(null)
    const [orders, setOrders] = useState(null)
    const [category,setCategory] = useState('All')
    const [update, setUpdate] = useState(false)
    const [response,setResponse] = useState(null)
    const [alertt,setAlertt] = useState(null)
    const [err,setErr] = useState(null)
    const nav = useNavigate()
    
    const [totals, setTotals] = useState(Number(0))
    const [saveds, setSaveds] = useState(Number(0))
    useEffect(()=> {
        orders?.map(({total, saved})=> {
            setTotals(Number(total)+totals)
            setSaveds(Number(saved)+saveds)
        })
    },[orders])
    console.log(orders)
    console.log(totals,saveds)
    useEffect(()=>{
        getUsers(setUsers)
        allOrders(setOrders)
    },[])
    useEffect(()=> {
        getCategory(category, {setPopularHP: setProduct},15)
    },[category])
    useEffect(()=> {
        getCategory(category, {setPopularHP: setProduct},15)
    },[update])

  return (
    <div className="nav:w-[calc(100vw-300px)] relative nav:left-[300px]  bg-right-bg nav:h-screen h-screen overflow-x-hidden">
        <AdminNav setSection={setSection} />
        {section === 'Dashboard' ?
        <div className={smallerMenu ? "flex flex-col  gap-6 relative top-[240px] nav:top-[0px]":"flex flex-col  gap-6"}>
            <div className="p-6">
                <div className="flex flex-col">
                    <div className="flex gap-4">
                        <div className="flex flex-[0.5]  flex-col gap-4">
                            <div className="bg-white shadow-all flex justify-evenly">
                                <Pie percentage={32} colour="blue"/>
                                <h1>Total Revenue</h1>
                            </div>
                            
                        </div>
                        <div className="flex flex-[0.5] flex-col gap-4">
                            <div className="bg-white shadow-all flex justify-evenly">
                                <Pie percentage={32} colour="blue"/>
                                <h1>Total Revenue</h1>

                            </div>

                        </div>
                    </div>
                    <div>chart</div>
                </div>
            </div>
        </div>
        :
        ''
        }
        {section === 'Products' ?
        <div className={smallerMenu ? "flex flex-col  gap-6 relative top-[240px] nav:top-[0px]":"flex flex-col  gap-6"}>
            <div className="p-2 productsbreak:p-6">
            <div className="flex gap-6 flex-col productsbreak:flex-row">
                <div className="w-[200px] productsbreak:w-[0px] productsbreak:flex-[0.5] mx-auto h-[80px] flex bg-white rounded-md shadow-all justify-center items-center">
                    <div className="justify-between">
                        <p>Total # of Products: {product?.length}</p>
                    </div>
                </div> 
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex gap-6 flex-wrap justify-center productsbreak:justify-start">
                    <button className="bg-[color:var(--blue)] px-8 py-1 rounded-full text-white hover:scale-105 hover:cursor-pointer" onClick={()=>setCategory('All')}>All</button>
                    <button className="bg-[color:var(--blue)] px-8 py-1 rounded-full text-white hover:scale-105 hover:cursor-pointer" onClick={()=>setCategory('Computers')}>Computers</button>
                    <button className="bg-[color:var(--blue)] px-8 py-1 rounded-full text-white hover:scale-105 hover:cursor-pointer" onClick={()=>setCategory('Laptops')}>Laptops</button>
                    <button className="bg-[color:var(--blue)] px-8 py-1 rounded-full text-white hover:scale-105 hover:cursor-pointer" onClick={()=>setCategory('Headphones')}>Headphones</button>
                    <button className="bg-[color:var(--blue)] px-8 py-1 rounded-full text-white hover:scale-105 hover:cursor-pointer" onClick={()=>setCategory('Keyboards')}>Keyboards</button>
                </div>
                <div className="flex gap-4 justify-center productsbreak:justify-start flex-wrap">
                    {product?.map((item)=>
                        <ColumnCard key={item._id} item={item} setResponse={setResponse} setAlertt={setAlertt} setErr={setErr} update={update} setUpdate={setUpdate} setProducts={setProduct}/>
                    )}
                </div>
            </div>
            </div>
        </div>
        :
        ''
        }
        {section === 'Users' ? 
        <div className={smallerMenu ? "flex flex-col p-2 productsbreak:p-6 gap-6 relative top-[240px] nav:top-[0px]":"flex flex-col p-2 productsbreak:p-6 gap-6"}>
            <div className="flex gap-6 flex-col productsbreak:flex-row">
                <div className="w-[200px] productsbreak:w-[0px] productsbreak:flex-[0.5] mx-auto h-[80px] flex bg-white rounded-md shadow-all justify-center items-center">
                    <div className="justify-between">
                        <p>Total # of Users: {users?.users.length}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-all rounded-md p-6 w-full">
                <table className="w-full">
                    <tr className="">
                        <th className="text-xss td:text-base pb-2 border-b-2">User Id</th>
                        <th className="text-xss td:text-base pb-2 border-b-2">Created</th>
                        <th className="text-xss td:text-base pb-2 border-b-2">Username</th>
                        <th className="text-xss td:text-base pb-2 border-b-2">Email</th>
                        <th className="text-xss td:text-base pb-2 border-b-2">Saved</th>
                        <th className="text-xss td:text-base pb-2 border-b-2">Spent</th>
                        {/* <th>Edit</th> */}
                    </tr>
                    { users?.users.map((item,index)=> 
                        <tr key={item._id}>
                            <td className="border-b-2 text-center  text-xss td:text-base">{index}</td>
                            <td className="border-b-2 text-center  text-xss td:text-base">{item.createdAt.split('T')[0]}</td>
                            <td className="border-b-2 text-center text-xss td:text-base">{item.username}</td>
                            <td className="border-b-2 text-center text-xss td:text-base">{item.email}</td>
                            <td className="border-b-2 text-center text-xss td:text-base">{Math.round(item.total_saved * 100) / 100}</td>
                            <td className="border-b-2 text-center text-xss td:text-base">{Math.round(item.total*100)/100}</td>
                            {/* <td className="flex justify-center items-center hover:scale-105 hover:cursor-pointer transition-all" onClick={()=>setEditUser([true, item._id])}><MdEdit size={20} className="flex justify-center items-center"/></td> */}
                        </tr>
                    )
                    }
                </table>
            </div>
        </div>
        :
        ''
        }
        {section === 'Orders' ? 
        <div className={smallerMenu ? "flex flex-col p-2 productsbreak:p-6 gap-6 relative top-[240px] nav:top-[0px]":"flex flex-col p-2 productsbreak:p-6 gap-6"}>

            <div className="flex gap-6 flex-col productsbreak:flex-row">
                <div className="w-[200px] productsbreak:w-[0px] productsbreak:flex-[0.5] mx-auto h-[80px] flex bg-white rounded-md shadow-all justify-center items-center">
                    <div className="justify-between">
                        <p>Total # of Orders: {orders?.length}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
            <table className="bg-white shadow-all">
              <tr className="">
                  <th className="border-b-2 p-1 td:p-2 text-xss td:text-base">Order Id</th>
                  <th className="border-b-2 p-2 td:p-2 text-left  text-xss td:text-base">Products</th>
                  <th className="border-b-2 p-0 td:p-2 text-center text-xss td:text-base">Status</th>
                  <th className="border-b-2 p-0 td:p-2 text-center text-xss td:text-base">Saved</th>
                  <th className="border-b-2 p-0 td:p-2 text-center text-xss td:text-base">Spent</th>
                </tr>             
              {orders?.map((item,index)=> 
                <tr className="">
                  <td className="border-b-2 p-0 text-xss history:text-base text-center">{index}</td>
                  <td className="border-b-2 p-0 text-left text-xss history:text-base">{item?.items_name.map((single,index)=> 
                  <p className="hover:text-[color:var(--highlight-blue)] hover:cursor-pointer text-xss history:text-base" onClick={()=>nav(`/product/${item?.items_category[index]}/${item?.items_id[index]}`)}>{single},</p>
                  )}</td>
                  <td className={item.fulfilled ? "border-b-2 p-0 text-center text-[color:var(--highlight-blue)] text-xss history:text-base" : "border-b-2 p-0 text-center text-red-500 text-xss history:text-base"}>{item.fulfilled ? 'Fulfilled' : 'Pending'}</td>
                  <td className="border-b-2 p-0 text-center text-xss history:text-base">${item.saved}</td>
                  <td className="border-b-2 p-0 history:p-2 text-center text-xss history:text-base">${Math.round(item.total)}</td>
                </tr>
              )}
            </table>
          </div>
        </div>
        :
        ''
        }
        {alertt && response && !err &&
            <Alert Icon={AiOutlineCheckCircle} Header={response[0]} Text={response[1]} setAlert={setAlertt} />
        }
        {/* {editUser && 
        <>
            <div className="absolute top-0 left-0 w-screen h-screen bg-black opacity-40 z-10">
            .
            </div>
            <div className="absolute top-0 left-0 w-[calc(100vw-300px)] h-screen flex justify-center items-center z-20">
                <EditUser editUser={editUser} setEditUser={setEditUser} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
            </div>
        </>
        } */}
    </div>
  )
}

export default Admin
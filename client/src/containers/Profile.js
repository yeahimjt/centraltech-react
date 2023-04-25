import SideNav from '../components/SideNav'
import React, {useEffect, useState, Suspense} from 'react'
import TopNav from '../components/TopNav'
import adminicon from '../assets/admin_icon.png'
import {BsFillTrashFill} from 'react-icons/bs'
import {MdEdit} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import UpdateUserModal from '../components/UpdateUserModal'
import AlertModal from '../components/AlertModal'
import { Current, Delete, Update, getProfile } from '../services/userActions'
import { Link } from 'react-router-dom'
import Beats from '../assets/beats.png'
import { AiFillStar } from 'react-icons/ai'
import { checkItemToSave, getCart, getSaved } from '../services/productActions'
import ColumnCard from '../components/ColumnCard'
import { getOrders } from '../services/orderActions'
const Profile = ({user, setUser, token,setToken, smallerMenu, setSmallerMenu}) => {
    const [modal, setModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [profile, setProfile] = useState(null)
    const [saved, setSaved] = useState(null)
    const [cart, setCart] = useState(null)
    const [orders, setOrders] = useState(null)
    const nav = useNavigate()
    function logout() {
        localStorage.setItem('access', '')
        setToken(null)
        setUser(null)
        nav('/')
    }
    useEffect(()=> {
        Current(localStorage.getItem('access'),setUser)
        getProfile(user?.id, setProfile)
        getSaved(user?.id, setSaved,4)
        getCart(user?.id, setCart,4)
        getOrders(user?.id, {setOrders},4)
    },[])
    console.log(orders)
    return (
    <Suspense fallback={<div>Hi/</div>}>
    <div className="bg-right-bg flex  justify-center nav:justify-normal h-screen  overflow-x-hidden ">
        <div className="nav:w-[calc(100vw-300px)]  relative nav:left-[300px] w-full">
            <TopNav smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu}/>
            <div className="flex flex-col profilebreak:flex-row  nav:p-28  nav:pt-0  p-12 pt-6   gap-4 ">
                <div className="flex-[0.3] flex flex-col gap-4 ">
                    <div className="bg-white flex flex-col shadow-all">
                        <div className="flex justify-center items-center pt-6">
                            <img className="w-[100px] h-[10 0px] object-scale-down" src={adminicon} alt="Profile"/>
                        </div>
                        <div className='flex flex-col p-6 pb-0'>
                                <div>
                                    <div className="flex gap-4 justify-between items-center">
                                        <h1 className="text-1l">Username</h1>
                                        <MdEdit onClick={()=> setModal([true,"Username",user?.username])} size={20} className="hover:cursor-pointer hover:scale-105 transition-all"/>
                                    </div>
                                    <p className="text-xss">{user?.username}</p>
                                </div>
                                <div>
                                    <div className="flex gap-4 justify-between items-center">
                                        <h1 className="text-1l">Email Address</h1>
                                        <MdEdit onClick={()=>setModal([true, "Email",  user?.email])} size={20} className="hover:cursor-pointer hover:scale-105 transition-all"/>
                                    </div>
                                    <p className="text-xss">{user?.email}</p>
                                </div>
                                <div>
                                    <div className="flex gap-4 justify-between items-center">
                                        <h1 className="text-1l">Password</h1>
                                        <MdEdit onClick={()=> setModal([true,"Password", user?.password])} size={20} className="hover:cursor-pointer hover:scale-105 transition-all"/>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center justify-center bg-[color:var(--highlight-blue)]  py-2 rounded-lg w-full hover:scale-105 hover:cursor-pointer transition-all mt-4 " onClick={()=>logout()}>
                        <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.3903 12.3945C2.12025 12.3945 0.0175809 19.3214 0 22.7848H20.7806C20.763 19.3214 18.6603 12.3945 10.3903 12.3945Z" fill="white"/>
                            <circle cx="10.3903" cy="5.43249" r="5.43249" fill="white"/>
                            <circle cx="18.0909" cy="16.9304" r="3.32278" fill="#004299"/>
                            <path d="M25 16L20.2532 13.2594V18.7406L25 16ZM16 16.4747H20.7278V15.5253H16V16.4747Z" fill="white"/>
                        </svg>
                            <button className="text-white">Log Out</button>
                        </div>
                        <div className="flex flex-col gap-6 items-end mt-4 mb-4">
                                <BsFillTrashFill size={32} className="hover:cursor-pointer hover:scale-105 transition-all hover:text-red-400" onClick={()=>setDeleteModal(true)}/>
                            </div>
                            </div>
                    </div>
                </div>
                <div className="flex-[0.7] flex flex-col  gap-4">
                    <div className="bg-white flex gap-4 flex-col p-6 shadow-all">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2l">Saved</h1>
                            <Link to="/saved">view all...</Link>
                        </div>
                        <hr/>
                        <div className="flex gap-6 justify-start saved:justify-center overflow-x-scroll scroll:overflow-x-hidden h-[100%] p-2">
                            {saved && saved.map((item)=> 
                                <ColumnCard item={item}/>
                            )}
                            {saved?.length === 0 &&
                            <p>You currenlty have no items saved.</p>
                            }
                        </div>
                    </div>
                    <div className="flex gap-4 flex-col bg-white shadow-all p-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2l">Cart</h1>
                            <Link to="/cart">view all...</Link>
                        </div>
                        <hr/>
                        <div className="flex gap-6 justify-start saved:justify-center overflow-x-scroll scroll:overflow-x-hidden h-[100%] p-2">
                            {cart && cart.map((item)=> 
                                <ColumnCard item={item}/>
                            )}
                            {cart?.length === 0 &&
                            <p>You currently have no items in your cart.</p>
                            }
                        </div>
                    </div>
                    <div className="bg-white flex flex-col gap-4 shadow-all p-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2l">Purchase History</h1>
                            <Link to="/history">view all...</Link>
                        </div>
                        <hr/>
                        <div>
                            <table className="bg-white shadow-all w-full ">
                                <tr className="">
                                    <th className="border-b-2 p-2">Order Id</th>
                                    <th className="border-b-2 p-2 text-left ">Products</th>
                                    <th className="border-b-2 p-2 text-center">Status</th>
                                    <th className="border-b-2 p-2 text-center">Saved</th>
                                    <th className="border-b-2 p-2 text-center">Spent</th>
                                    </tr>
                                {orders?.map((item)=> 
                                    <tr className="">
                                    <td className="border-b-2 p-2">{item._id}</td>
                                    <td className="border-b-2 p-2 text-left">{item?.items_name.map((single,index)=> 
                                    <p className="hover:text-[color:var(--highlight-blue)] hover:cursor-pointer" onClick={()=>nav(`/product/${item?.items_category[index]}/${item?.items_id[index]}`)}>{single},</p>
                                    )}</td>
                                    <td className={item.fulfilled ? "border-b-2 p-2 text-center text-[color:var(--highlight-blue)]" : "border-b-2 p-2 text-center text-red-500"}>{item.fulfilled ? 'Fulfilled' : 'Pending'}</td>
                                    <td className="border-b-2 p-2 text-center">${item.saved}</td>
                                    <td className="border-b-2 p-2 text-center">${Math.round(item.total)}</td>
                                </tr>
                            )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {modal && 
            <>
            <div className="fixed w-screen h-screen opacity-50 bg-black overflow-x-hidden"></div>
            <UpdateUserModal setModal={setModal} options={[modal[1], modal[2]]} user={user} setUser={setUser} setToken={setToken} />
            </>
        }
        {deleteModal && 
            <>
            <div className="w-screen top-0 h-screen opacity-50 bg-black fixed overflow-x-hidden"></div>
            <AlertModal setDeleteModal={setDeleteModal} token={token} setToken={setToken} userId={user?.id} setUser={setUser}/>
            </>
        }
    </div>
    </Suspense>
  )
}

export default Profile
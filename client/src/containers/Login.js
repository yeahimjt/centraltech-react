import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'
import LoginPic from '../assets/login/login.png'
import {  Register, loginUser } from '../services/userActions'
import {BiTestTube} from 'react-icons/bi'
import { UserContext } from '../services/centralContext'

const Login = ({  token,setToken, setAlert, smallerMenu,setSmallerMenu }) => {
    const {user, setUser} = useContext(UserContext)
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loginErr, setLoginErr] = useState("")
    const [registerErr, setRegisterErr] = useState("")
    const [finished, setFinished] = useState(false)
    const nav =  useNavigate();

    // Handle input as typed
    const handleUsername  = (e) => {
        setUsername(e.target.value)
    }
    const handleEmail  = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword  = (e) => {
        setPassword(e.target.value)
    }

    // Handle any submits
    const handleLoginSubmit = (e) => {
        const res = loginUser(username,password, setToken, setFinished,setAlert)
        console.log(res)
        nav('/')

    }
    const handleRegisterSubmit = (e) => {
        if (!username || !email || !password) {
            setRegisterErr("All fields mandatory!")
        } else {
            Register(username,email,password, setUser, setRegisterErr)
        }
    }


   const handleAdminSubmit = (e) => {

   }


  return (
    <div className="bg-right-bg w-screen  overflow-x-hidden h-screen  ">
            <div className="nav:w-[calc(100vw-300px)] relative nav:left-[300px]  overflow-x-hidden h-full">
                <TopNav smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu}/>
            <div className={smallerMenu ? "grid grid-cols-2  loginbreak:p-32 loginbreak:pt-0 p-6 pb-8 py-0 gap-x-6 gap-y-6 relative top-[260px] nav:top-[0px]" :"grid grid-cols-2  loginbreak:p-32 loginbreak:pt-0 p-6 pb-8 py-0 gap-x-6 gap-y-6 "}>
                <div className="w-full bg-white h-[467px] shadow-all loginbreak:col-span-1 col-span-2">
                    <h1 className="font-extrabold text-2l text-center">Login</h1>
                    {loginErr && 
                    <div className="text-center text-red-500 animate-shake py-2 text-xm">{loginErr}</div>
                    }
                    <div className="flex flex-col p-6 w-[80%] mx-auto gap-6">
                        <section className="flex flex-col">
                            <label>Username *</label>
                            <input className="bg-[color:var(--light)] px-2 py-1" onChange={handleUsername}/>
                        </section>
                        <section className="flex flex-col">
                            <label>Password *</label>
                            <input className="bg-[color:var(--light)] px-2 py-1" onChange={handlePassword}/>
                        </section>
                        <div className="flex gap-4 flex-col loginbtnbreak:flex-row">
                            <div className="flex-[0.5] flex gap-4 justify-center bg-[color:var(--light-blue)] items-center hover:scale-105 hover:cursor-pointer transition-all rounded-md px-4 py-2 " onClick={()=>handleLoginSubmit()}>
                                <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.38121 9.91559C1.95971 9.91559 0.0727838 15.4571 0.0570068 18.2278H18.7054C18.6896 15.4571 16.8027 9.91559 9.38121 9.91559Z" fill="black"/>
                                    <ellipse cx="9.38107" cy="4.34599" rx="4.87509" ry="4.34599" fill="black"/>
                                    <ellipse cx="16.2913" cy="13.5443" rx="2.98185" ry="2.65823" fill="#88BBFF"/>
                                    <path d="M14.6395 13L18.437 15.1925V10.8075L14.6395 13ZM22.3071 12.6203H18.0572V13.3797H22.3071V12.6203Z" fill="black"/>
                                </svg>
                                <button className="">Login</button>
                            </div>
                            <div className="flex-[0.5] flex gap-4 justify-center bg-[color:var(--light-blue)] items-center hover:scale-105 hover:cursor-pointer transition-all rounded-md px-4 py-2 ">
                                <BiTestTube size={22}/>
                                <button className="">Login Test</button>
                            </div>
                        </div>
                        <p className="text-center text-text">Use test account to experience application as a customer. The test account will have all data fields in database propagated so you can navigate swiftly to see all functionality.</p>
                    </div>
                </div>
                <div className="w-full bg-white h-[467px] shadow-all loginbreak:col-span-1 col-span-2">
                    <h1 className="font-extrabold text-2l text-center">Register</h1>
                    {registerErr && 
                    <div className={registerErr === "Your account was successfully registered, try to log in!" ? "text-center text-[color:var(--highlight-blue)]" : "text-center text-red-500 animate-shake py-2"}>{registerErr}</div>
                    }
                    <div className="flex flex-col p-6 w-[80%] mx-auto gap-6">
                        <section className="flex flex-col">
                            <label>Username *</label>
                            <input className="bg-[color:var(--light)] px-2 py-1" onChange={handleUsername} required/>
                        </section>
                        <section className="flex flex-col">
                            <label>Email *</label>
                            <input className="bg-[color:var(--light)] px-2 py-1" onChange={handleEmail} required/>
                        </section>
                        <section className="flex flex-col">
                            <label>Password *</label>
                            <input className="bg-[color:var(--light)] px-2 py-1" onChange={handlePassword} required/>
                        </section>
                        <div className="flex justify-center items-center gap-4 bg-[color:var(--light-blue)] w-[50%] mx-auto rounded-md px-4 py-2 hover:scale-105 hover:cursor-pointer transition-all" onClick={()=>handleRegisterSubmit()}>
                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.31224 9.91559C1.6962 9.91559 0.0140647 15.4571 0 18.2278H16.6245C16.6104 15.4571 14.9283 9.91559 8.31224 9.91559Z" fill="black"/>
                                <circle cx="8.3123" cy="4.34599" r="4.34599" fill="black"/>
                                <circle cx="14.4726" cy="13.5443" r="2.65823" fill="#88BBFF"/>
                                <line x1="13" y1="13.5" x2="16" y2="13.5" stroke="black"/>
                                <line x1="14.5" y1="12" x2="14.5" y2="15" stroke="black"/>
                            </svg>
                            <button className="">Register</button>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 h-[320px] bg-white shadow-all flex justify-center items-center">
                    <div className="p-6">
                        <h1 className="font-extrabold text-2l text-center">Use Admin Account</h1>
                        <p className="font-normal text-1l text-center">To achieve the full experience of this e-commerce application it is recommended to utilize the admin account to achieve full privileges.</p>
                        <div className="flex justify-center items-center gap-4 w-[50%] bg-[color:var(--blue)] px-8 py-2 rounded-md mx-auto mt-6 hover:scale-105 transition-all" onClick={()=>handleAdminSubmit()}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.6667 10.6667C19.12 10.6667 19.56 10.72 20 10.7867V4.36L10 0L0 4.36V10.9067C0 16.96 4.26667 22.6267 10 24C10.7333 23.8267 11.44 23.5733 12.1333 23.2667C11.2133 21.96 10.6667 20.3733 10.6667 18.6667C10.6667 14.2533 14.2533 10.6667 18.6667 10.6667Z" fill="black"/>
                                <path d="M18.6667 13.3333C15.72 13.3333 13.3334 15.72 13.3334 18.6667C13.3334 21.6133 15.72 24 18.6667 24C21.6134 24 24 21.6133 24 18.6667C24 15.72 21.6134 13.3333 18.6667 13.3333ZM18.6667 15.1733C19.4934 15.1733 20.16 15.8533 20.16 16.6667C20.16 17.48 19.48 18.16 18.6667 18.16C17.8534 18.16 17.1734 17.48 17.1734 16.6667C17.1734 15.8533 17.84 15.1733 18.6667 15.1733ZM18.6667 22.3333C17.4267 22.3333 16.3467 21.72 15.68 20.7733C15.7467 19.8133 17.6934 19.3333 18.6667 19.3333C19.64 19.3333 21.5867 19.8133 21.6534 20.7733C20.9867 21.72 19.9067 22.3333 18.6667 22.3333Z" fill="black"/>
                            </svg>
                            <button className="">Login Admin</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

 
  )
}

export default Login
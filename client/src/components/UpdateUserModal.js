import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Current, Update } from '../services/userActions'

function Modal({setModal, options, user, setUser, setToken}) {
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    console.log(user)
    const handleSubmit = (e) => {
        e.preventDefault()
        Update(user?.id, setUser, setToken,username,email,password)
        Current(localStorage.getItem('access'),setUser)
        setModal(false)
    }
  return (
    <div className="w-[99vw] h-screen  top-0 left-0 flex justify-center items-center overflow-x-hidden fixed">
        <div className="bg-white rounded-modal">
            <div className="flex  justify-center flex-col gap-4 px-8 p-4">
                <div className="flex gap-4 items-center">
                    <h1 className="relative left-6 text-2l">Update {options[0]}</h1>
                    <AiFillCloseCircle className="relative left-4 -top-4 hover:scale-105 hover:cursor-pointer" size={26} onClick={()=>setModal(false)}/>
                </div>
                <input className="bg-[color:var(--input)] px-4 py-2" type="text" placeholder={options[1]} onChange={(e)=>{options[0]==="Username" ? setUsername(e.target.value) : options[0]==="Email" ? setEmail(e.target.value) : setPassword(e.target.value)}}/>
                <button className="bg-[color:var(--highlight-blue)] text-1l hover:scale-105 hover:cursor-pointer text-white" onClick={(e)=>handleSubmit(e)}>Update</button>
            </div>
        </div>
    </div>
  )
}

export default Modal
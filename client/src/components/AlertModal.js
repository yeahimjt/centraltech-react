import React from 'react'
import { Delete } from '../services/userActions'
import {useNavigate} from 'react-router-dom'

function AlertModal  ({setDeleteModal, token, setToken, userId, setUser})  {
    const nav = useNavigate()
    console.log(token,setToken,userId,setUser)
    const handleDelete = () => {
        Delete(token, setToken, userId, setUser)
        setDeleteModal(false)
        nav('/')
    }
    return (
    <div className="w-[99vw] h-screen  top-0 left-0 flex justify-center items-center overflow-x-hidden fixed">
        <div className="bg-white rounded-modal w-[536px]">
            <div className="flex  justify-center flex-col gap-4 px-8 p-4">
                <div className="flex gap-4 items-center">
                    <h1 className="text-1l text-center">You are about to permanentantly delete your account, are you sure you want to continue?</h1>
                </div>
                <div className="flex gap-4 justify-evenly">
                    <button className="bg-[color:var(--highlight-blue)] text-1l hover:scale-105 hover:cursor-pointer w-[45%] h-[49px] rounded-xl text-white" onClick={()=>handleDelete()}>Delete Account</button>
                    <button className="text-1l border-black border-solid border-[2px] hover:scale-105 hover:cursor-pointer w-[45%] h-[49px] rounded-xl" onClick={()=>setDeleteModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AlertModal
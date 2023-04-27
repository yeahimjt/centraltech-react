import React, {useState,useEffect} from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { Update } from '../services/userActions';
const EditUser = ({editUser, setEditUser,updateUser, setUpdateUser}) => {
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [user, setUser] = useState(null)
    useEffect(()=> {
        console.log(username,email)
        Update(editUser[1], setUser,null, username, email)
    },[editUser])
  return (
    <div className="flex flex-col gap-4 bg-white p-6 w-[25%]">
        <div className="flex justify-between">
            <h1>Edit user</h1>
            <AiFillCloseCircle className="hover:scale-105 hover:text-[color:var(--highlight-blue)] hover:cursor-pointer" size={26} onClick={()=>setEditUser(false)}/>
        </div>
        <div className="flex flex-col">
            <label>Username</label>
            <input className="bg-[color:var(--input)] p-2" type="text" onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <div className="flex flex-col">
            <label>Email</label>
            <input className="bg-[color:var(--input)] p-2" type="text" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="flex justify-center">
            <button className="flex justify-center bg-[color:var(--highlight-blue)] px-8 py-1 rounded-sm hover:scale-105 hover:cursor-pointer text-white transition-all" onClick={()=> {setUpdateUser(!updateUser); setEditUser(false)}}>Submit edit</button>
        </div>
    </div>
  )
}

export default EditUser
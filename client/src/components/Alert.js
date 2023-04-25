import React, { useState } from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
const Alert = ({Icon, Header, Text, alert, setAlert}) => {
  return (  
    <div className={"fixed bottom-6 right-6 flex justify-center items-center gap-4  p-6 bg-[color:var(--highlight-blue)] text-white rounded-alert animate-slideright"}>
        <div>
            <Icon size={32}/>
        </div>
        <div>
        <AiFillCloseCircle size={20} className="absolute right-2 top-2 hover:scale-105 hover:cursor-pointer" onClick={()=>setAlert(false)}/>
            <h1 className="text-1l mt-2">{Header}</h1>
            <p className="text-text">{Text}</p>
        </div>
    </div>
  )
}

export default Alert
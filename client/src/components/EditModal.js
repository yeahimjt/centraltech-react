import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
const EditModal = ({modal,setModal, update, setUpdate, setName, setDescription, setPrice, setSale, setSeller, setCategory}) => {
  return (
    <div className="flex flex-col gap-4 bg-white p-6 w-[25%]">
        <div className="flex justify-between">
            <h1>Edit product</h1>
            <AiFillCloseCircle className="hover:scale-105 hover:text-[color:var(--highlight-blue)] hover:cursor-pointer" size={26} onClick={()=>setModal(!modal)}/>
        </div>
        <p className="text-xss text-center font-bold text-red-600">Inputs for 'price' and 'sale' do not require $ symbol. Text inputs for name, description, seller, category can have any symbols.</p>
        <div className="flex flex-col">
            <label>Name</label>
            <input className="bg-[color:var(--input)] p-2" type="text" onChange={(e)=>setName(e.target.value)} placeholder={`Beats Headphones`}/>
        </div>
        <div className="flex flex-col">
            <label>Description</label>
            <input className="bg-[color:var(--input)] p-2" type="text" onChange={(e)=>setDescription(e.target.value)} placeholder={`Good headphones`}/>
        </div>
        <div className="flex flex-col">
            <label>Price</label>
            <input className="bg-[color:var(--input)] p-2" type="text" onChange={(e)=>setPrice(e.target.value)} placeholder={`48.00`}/>
        </div>
        <div className="flex flex-col">
            <label>Sale</label>
            <input className="bg-[color:var(--input)] p-2" type="text" onChange={(e)=>setSale(e.target.value)} placeholder={`30.00`}/>
        </div>
        <div className="flex flex-col">
            <label>Seller</label>
            <input className="bg-[color:var(--input)] p-2" type="text" onChange={(e)=>setSeller(e.target.value)} placeholder={`Beats`}/>
        </div>
        <div className="flex flex-col">
            <label>Category</label>
            <input className="bg-[color:var(--input)] p-2" type="text" onChange={(e)=>setCategory(e.target.value)} placeholder={`Headphones`}/>
        </div>
        <div className="flex justify-center">
            <button className="flex justify-center bg-[color:var(--highlight-blue)] px-8 py-1 rounded-sm hover:scale-105 hover:cursor-pointer text-white transition-all" onClick={()=> {setUpdate(!update); setModal(false)}}>Submit edit</button>
        </div>
    </div>
  )
}

export default EditModal
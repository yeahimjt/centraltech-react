import React from 'react'
import TopNav from '../components/TopNav'

const History = () => {
  return (
    <div className="flex flex-col nav:w-[calc(100vw-300px)] w-full h-screen bg-right-bg overflow-x-hidden relative nav:left-[300px]">
        <TopNav/>
        <div className="p-6 flex flex-col gap-6">
          <div className="flex gap-6">
            <div className="flex-[0.5] flex justify-center items-center gap-6 bg-white shadow-all p-4"><h1 className="text-2l">Total Spent</h1><p className="text-1l">$32,000</p></div>
            <div className="flex-[0.5] flex justify-center items-center gap-6 bg-white shadow-all p-4"><h1 className="text-2l">Total Saved</h1><p className="text-1l">$32,000</p></div>
          </div>
          <div className="flex gap-6">
            <button className="bg-[color:var(--highlight-blue)] rounded-md py-2 px-4 w-[150px] text-white hover:scale-105 hover:cursor-pointer transition-all"><h1>All</h1></button>
            <button className="bg-[color:var(--highlight-blue)] rounded-md py-2 px-4 w-[150px] text-white hover:scale-105 hover:cursor-pointer transition-all"><h1>Pending</h1></button>
            <button className="bg-[color:var(--highlight-blue)] rounded-md py-2 px-4 w-[150px] text-white hover:scale-105 hover:cursor-pointer transition-all"><h1>Fulfilled</h1></button>
          </div>
          <div className="flex flex-col">
            <table className="bg-white shadow-all ">
              <tr className="">
                <th className="border-b-2 p-2">Order #</th>
                <th className="border-b-2 p-2 text-left w-[50%]">Products</th>
                <th className="border-b-2 p-2">Status</th>
                <th className="border-b-2 p-2">Saved</th>
                <th className="border-b-2 p-2">Spent</th>
              </tr>
              <tr>
                <td className=" text-center">#32</td>
                <td className=" py-4">Computer, laptop</td>
                <td className=" p-2 text-center">Fulfilled</td>
                <td className=" p-2 text-center">$32.00</td>
                <td className=" p-2 text-center">$500.00</td>
              </tr>
              <tr className="bg-[color:var(--light)]">
                <td className=" text-center">#32</td>
                <td className="py-4 text-ellipsis text-wrap w-[560px]">Computer, laptop Computer, laptop Computer, laptop Computer, laptopComputer, laptop Computer, laptop Computer, laptop Computer, laptop</td>
                <td className=" p-2 text-center">Fulfilled</td>
                <td className=" p-2 text-center">$32.00</td>
                <td className=" p-2 text-center">$500.00</td>
              </tr>
              <tr>
                <td className=" text-center">#32</td>
                <td className=" py-4">Computer, laptop</td>
                <td className=" p-2 text-center">Fulfilled</td>
                <td className=" p-2 text-center">$32.00</td>
                <td className=" p-2 text-center">$500.00</td>
              </tr>
              <tr className="bg-[color:var(--light)]">
                <td className=" text-center">#32</td>
                <td className=" py-4">Computer, laptop</td>
                <td className=" p-2 text-center">Fulfilled</td>
                <td className=" p-2 text-center">$32.00</td>
                <td className=" p-2 text-center">$500.00</td>
              </tr>
            </table>
          </div>
        </div>
    </div>
  )
}

export default History
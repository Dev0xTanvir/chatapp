import React from 'react'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router'

const Rootlayout = () => {
  return (
    <div className='p-5 flex gap-[30px] '>
      <div>
      <Sidebar/>
      </div>
      <div className='w-full h-[100dvh] rounded-3xl '>
        <Outlet/>
      </div>
    </div>
  )
}

export default Rootlayout

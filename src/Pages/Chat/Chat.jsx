import React from 'react'
import Friend from '../../Components/CommonComponent/Friend'
import smspng from '../../assets/sms.png.png'
import { HiDotsVertical } from 'react-icons/hi'
import Grouplist from '../../Components/CommonComponent/Grouplist'
const Chat = () => {
  return (
    <div className='w-full h-[100dvh]'>
      <div className='h-full flex'>
      <div className='w-[40%] h-full '>
        <div className='mb-5'>
        <Grouplist/>
        </div>
        <div>
        <Friend/>
        </div>
      </div>
      <div className='w-[60%] h-full bg-amber-300'>
        <div className='flex justify-between items-center m-5 border-b border-gray-200 shadow-2xs'>
        <div className='flex items-center gap-[33px]'>
        <div>
          <picture>
            <img src={smspng} alt={smspng} />
          </picture>
        </div>
        <div>
          <h1>Swathi </h1>
          <p>Online</p>
        </div>
        </div>
        <div>
          <samp><HiDotsVertical /></samp>
        </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Chat;

import React from 'react'
import Input from '../../Components/CommonComponent/Input'
import Friend from '../../Components/CommonComponent/Friend'
const Chat = () => {
  return (
    <div className='w-full h-[100dvh]'>
      <div className='h-full flex'>
      <div className='w-[40%] h-full '>
        <div className='mb-5'>
        <Input/>
        </div>
        <div>
        <Friend/>
        </div>
      </div>
      <div className='w-[60%] h-full bg-amber-300'>2</div>
      </div>
    </div>
  )
}

export default Chat;

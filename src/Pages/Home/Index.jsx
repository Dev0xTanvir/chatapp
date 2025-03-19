import React from 'react'
import Input from '../../Components/CommonComponent/Input'
import Friend from '../../Components/CommonComponent/Friend'
import User from '../../Components/CommonComponent/User'
import FriendRequest from '../../Components/CommonComponent/FriendRequest'
import Group from '../../Components/CommonComponent/Group'
import Block from '../../Components/CommonComponent/Block'

const Index = () => {
  return (
    <div className='flex justify-between gap-y-5 flex-wrap'>
      <div className=' w-[30%] '>
      <Input/>
      </div>
      <div className=' w-[30%] '>
      <Friend/>
      </div>
      <div className=' w-[30%] '>
      <User/>
      </div>
      <div className=' w-[30%] '>
      <FriendRequest/>
      </div>
      <div className=' w-[30%] '>
      <Group/>
      </div>
      <div className=' w-[30%] '>
      <Block/>
      </div>
    </div>
    
  )
}

export default Index

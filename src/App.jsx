import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Singin from './Pages/SingIn/Singin';
import Singup from './Pages/Singup';
import Rootlayout from './Components/Roorlayout/Rootlayout';
import Index from './Pages/Home/Index';
import Chat from './Pages/Chat/Chat';
import Dark from './Pages/Dark/Dark';
import Notifications from './Components/CommonComponent/Notifications';

const App = () => {
  return (
    <>
    <BrowserRouter>
      {/* <Dark/> */}
    <Routes>
      <Route path="/" element={<Rootlayout/>}>
      <Route index element={<Index/>}></Route>v
      <Route path='/message'element={<Chat/>}></Route>
      <Route path='/notification'element={<Notifications/>}></Route>
      <Route path='/setting'element={'this is setting page'}></Route>
      </Route>
      <Route path="/singup" element={<Singup />} />
      <Route path="/singin" element={<Singin />} />
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App

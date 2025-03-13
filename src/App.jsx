import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Singin from './Pages/SingIn/Singin';
import Singup from './Pages/Singup';
import Rootlayout from './Components/Roorlayout/Rootlayout';
import Index from './Pages/Home/Index';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Rootlayout/>}>
      <Route index element={<Index/>}></Route>
      <Route path='/message'element={'this is massage page'}></Route>
      <Route path='/notification'element={'this is notification page'}></Route>
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

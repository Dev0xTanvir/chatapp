import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Singin from './Pages/SingIn/Singin';
import Singup from './Pages/Singup';
import Index from './Pages/Home/Index';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/singup" element={<Singup />} />
      <Route path="/singin" element={<Singin />} />
      <Route path="/Index" element={<Index/>} />
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App

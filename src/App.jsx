import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Singin from './Pages/SingIn/Singin';
import Singup from './Pages/Singup';
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/singup" element={<Singup />} />
      <Route path="/singin" element={<Singin />} />
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App

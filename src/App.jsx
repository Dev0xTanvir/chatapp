import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Singin from './Pages/SingIn/Singin';
import Index from './Pages/Index';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/index" element={<Index />} />
      <Route path="/singin" element={<Singin />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Visor from './components/Visor/Visor'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/visor' element={<Visor/>}/>
      </Routes>
      
    </div>
  )
}

export default App

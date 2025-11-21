import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Index from './Pages/Index'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'

function App() {

  return (
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path='signup' element={<SignUp />}/>
          <Route path='signin' element={<SignIn />}/>
        </Route>
      </Routes>
  )
}

export default App

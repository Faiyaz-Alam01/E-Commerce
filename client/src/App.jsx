import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Index from './Pages/Index'
import SignUp from './Pages/AuthPage/SignUp'
import SignIn from './Pages/AuthPage/SignIn'
import { GetAllProducts } from './Pages/Products/GetAllProducts'
import { Wislist } from './Pages/Whislist'
import Dashboard from './Pages/Dashboard'
import AdminPage from './Pages/AdminPage'
import AddProducts from './Pages/Products/AddProducts'
import Profile from './Pages/AuthPage/Profile'
import Contact from './Pages/Contact'
import PageNotfound from './Pages/PageNotfound'
import ForgotPassword from './Pages/forgotPass'
import ResetPassword from './Pages/resetPass'

function App() {

  return (
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path='signup' element={<SignUp />}/>
          <Route path='signin' element={<SignIn />}/>
          <Route path='products' element={<GetAllProducts />}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='admin' element={<AdminPage/>}/>
          <Route path='delete' element={<AdminPage/>}/>
          <Route path='product/add' element={<AddProducts/>}/>
          <Route path='wishlist' element={<Wislist/>}/>
          <Route  path='profile' element={<Profile />} />
          <Route path='forgot-password' element={<ForgotPassword/>} />
          <Route path='reset-password/:token' element={<ResetPassword />} />
          <Route path='contact' element={<Contact />} />

          <Route path='*' element={<PageNotfound/>}/>
        </Route>
      </Routes>
  )
}

export default App

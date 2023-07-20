import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Address from './pages/Address'
import CheckOut from './pages/CheckOut'
import { useSelector } from 'react-redux'
import LogOut from './pages/LogOut'
import Setting from './pages/Setting'
import ChangeProfile from './pages/ChangeProfile'
import ChangePassword from './pages/ChangePassword'
import UploadAvatar from './pages/UploadAvatar'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import Order from './pages/Order'

const Router = () => {
  const profile=useSelector((state)=>state.profile)
const flage=false;
  return (
    <div>
         <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:Id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={!localStorage.getItem("token")?<SignUp />:<LogOut/>} />
        <Route path="/login" element={!localStorage.getItem("token")?<Login />:<LogOut/>} />
        <Route path="/address" element={localStorage.getItem("token")?<Address />:<Login/>} />
        <Route path="/orders" element={localStorage.getItem("token")?<Orders />:<Login/>} />
        <Route path="/order/:Id" element={localStorage.getItem("token")?<Order />:<Login/>} />
        <Route path="/checkout" element={localStorage.getItem("token")?<CheckOut />:<Login/>} />
        <Route path="/profile" element={localStorage.getItem("token")?<Profile />:<Login/>} />
        <Route path="*" element={<NotFound />} />

        <Route path="/setting" element={localStorage.getItem("token")?<Setting />:<Login/>} >
        <Route index element={localStorage.getItem("token")?<ChangeProfile />:<Login/>} />
        <Route path="change-password" element={localStorage.getItem("token")?<ChangePassword />:<Login/>} />
        <Route path="upload-avatar" element={localStorage.getItem("token")?<UploadAvatar />:<Login/>} />

        </Route>

      </Routes>
    </div>
  )
}

export default Router
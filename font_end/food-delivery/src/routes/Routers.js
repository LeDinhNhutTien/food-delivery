import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";
import FoodDetails from "../pages/FoodDetails";
import AllFoods from "../pages/AllFoods";
import AdminHeader from "../Admin/index";
import UserManagement from "../Admin/userManagement";
import ProductManagement from "../Admin/productManagement";
import RevenueManagement from "../Admin/revenueManagement";
import Account from "../pages/Account"
import ReviewOrder from "../pages/ReviewOrder"
import ChangePassword from  "../pages/changePassword"
import ForgetPassword from "../pages/ForgetPassword";
import OrderDetail from  "../pages/OrderDetail";
import ConfirmCheckOut from "../pages/ConfirmCheckOut";
import AddUser from "../Admin/AddUser";
import UpdateUser from "../Admin/UpdateUser";
import OrderManagement from "../Admin/OrderManagement"
import OrderDetailManagement from "../Admin/OrderDetailManagement"
import Root from "../root/index"
import WorkDiary from "../root/WorkDiary"
const Routers = () => {
  return (
      <Routes>
          <Route path="/admin" element={<AdminHeader />} />
          <Route path="/userManagement" element={<UserManagement />} />
          <Route path="/productManagement" element={<ProductManagement />} />
          <Route path="/orderManagement" element={<OrderManagement />} />
          <Route path="/orderDetailAdmin" element={<OrderDetailManagement />} />
          <Route path="/revenueManagement" element={<RevenueManagement />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/foods" element={<AllFoods />} />
          <Route path="/detailProduct" element={<FoodDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminHeader />} />
          <Route path="/account" element={<Account />} />
          <Route path="/reviewOrder" element={<ReviewOrder />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/orderDetail" element={<OrderDetail />} />
          <Route path="/order-confirmation" element={<ConfirmCheckOut />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/updateUser" element={<UpdateUser />} />
          <Route path="/root" element={<Root />} />
           <Route path="/root/diary" element={<WorkDiary />} />
      </Routes>

  );
};

export default Routers;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Pizzas from "../pages/Pizzas";
import PizzaDetails from "../pages/PizzaDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";
import FoodDetails from "../pages/FoodDetails";
import AllFoods from "../pages/AllFoods";
import AdminHeader from "../Admin/ProductList";
import UserManagement from "../Admin/userManagement";
import ProductManagement from "../Admin/productManagement";
import RevenueManagement from "../Admin/revenueManagement";
import Account from "../pages/Account"
import ReviewOrder from "../pages/ReviewOrder"
import ChangePassword from  "../pages/changePassword"

const Routers = () => {
  return (
      <Routes>
          <Route path="/admin" element={<AdminHeader />} />
          <Route path="/userManagement" element={<UserManagement />} />
          <Route path="/productManagement" element={<ProductManagement />} />
          <Route path="/revenueManagement" element={<RevenueManagement />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/foods" element={<AllFoods />} />
          <Route path="/foods/:id" element={<FoodDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminHeader />} />
                  <Route path="/account" element={<Account />} />
              <Route path="/reviewOrder" element={<ReviewOrder />} />
          <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>

  );
};

export default Routers;

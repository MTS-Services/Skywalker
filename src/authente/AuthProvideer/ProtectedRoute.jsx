// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = () => {
  // AuthContext থেকে isAuthenticated স্টেট নিন
  const { isAuthenticated } = useContext(AuthContext);

  // যদি ব্যবহারকারী লগইন করা না থাকে
  if (!isAuthenticated) {
    // তাহলে তাদেরকে '/login' পেজে রিডাইরেক্ট করুন
    // 'replace' prop ব্যবহার করলে ব্রাউজার হিস্টরিতে লগইন পেজ যোগ হবে না
    return <Navigate to="/login" replace />;
  }

  // যদি ব্যবহারকারী লগইন করা থাকে, তাহলে চাইল্ড রাউটগুলো রেন্ডার করুন
  // Outlet ব্যবহার করা হয় nested routes রেন্ডার করার জন্য
  return <Outlet />;
};

export default ProtectedRoute;

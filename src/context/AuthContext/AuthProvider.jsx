// src/context/AuthProvider.js
import React, { useState, useEffect } from "react";
import { AuthContext } from "../AuthContext"; // AuthContext এর সঠিক পাথ

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse user data from localStorage:", e);
      return null;
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const storedUsers = localStorage.getItem("registeredUsers");
    try {
      return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (e) {
      console.error("Failed to parse registered users from localStorage:", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const login = (mobileNumber, password) => {
    const foundUser = registeredUsers.find(
      (u) => u.mobileNumber === mobileNumber && u.password === password,
    );

    if (foundUser) {
      setIsAuthenticated(true);
      setUser({
        mobileNumber: foundUser.mobileNumber,
        name: foundUser.name || "User",
      });
      return { success: true, message: "Login successful!" };
    } else {
      setIsAuthenticated(false);
      setUser(null);
      return { success: false, message: "Invalid mobile number or password." };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    // Optionally remove registeredUsers if needed on logout, though usually not.
    // localStorage.removeItem("registeredUsers");
  };

  const registerUser = (mobileNumber, password) => {
    const userExists = registeredUsers.some(
      (u) => u.mobileNumber === mobileNumber,
    );
    if (userExists) {
      return { success: false, message: "Mobile number already registered." };
    }

    const newUser = {
      mobileNumber,
      password,
      name: `User_${mobileNumber.substring(mobileNumber.length - 4)}`,
    };
    setRegisteredUsers((prevUsers) => [...prevUsers, newUser]);

    // **গুরুত্বপূর্ণ পরিবর্তন:** রেজিস্ট্রেশনের পর স্বয়ংক্রিয়ভাবে লগইন করা হচ্ছে
    setIsAuthenticated(true);
    setUser({
      mobileNumber: newUser.mobileNumber,
      name: newUser.name,
    });

    return {
      success: true,
      message: "Registration successful! You are now logged in.",
    };
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

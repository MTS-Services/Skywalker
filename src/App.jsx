// src/App.jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./router/AppRoutes";
import { LanguageProvider } from "./context/LanguageContext";
import AuthProvider from "./context/AuthContext/AuthProvider";
function App() {
  return (
    <React.StrictMode>
      <LanguageProvider>
        <AuthProvider>        
          <RouterProvider router={AppRoutes} />
        </AuthProvider>
      </LanguageProvider>
    </React.StrictMode>
  );
}

export default App;

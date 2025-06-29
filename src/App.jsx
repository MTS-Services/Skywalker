import React from "react";
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./router/AppRoutes"; // Make sure you have this file configured
import { LanguageProvider } from "./context/LanguageContext"; // Language context provider
import AuthProvider from "./context/AuthContext/AuthProvider"; // Auth context provider
import { Toaster } from "react-hot-toast"; // Import the Toaster component

function App() {
  return (
    <React.StrictMode>
      <LanguageProvider>
        <AuthProvider>
          {/* The Toaster component must be rendered in the app tree */}
          <Toaster
        position="top-right" // 👈 toast position here
        reverseOrder={false}
      />
          <RouterProvider router={AppRoutes} />
        </AuthProvider>
      </LanguageProvider>
    </React.StrictMode>
  );
}

export default App;

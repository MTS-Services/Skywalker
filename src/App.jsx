// src/App.jsx
import React from "react"; // <<--- এটি অবশ্যই যোগ করুন
import { RouterProvider } from "react-router-dom"; // <<--- এটি রাখুন, কারণ AppRoutes createBrowserRouter অবজেক্ট
import { AppRoutes } from "./router/AppRoutes"; // <<--- AppRoutes কে named import করুন, কারণ AppRoutes.jsx এ export { AppRoutes }; আছে
// import SiAuth0 from "react-icons/si"; // <<--- যদি ব্যবহার না করেন তাহলে সরিয়ে দিন
import { LanguageProvider } from "./context/LanguageContext";
import AuthProvider from "./context/AuthContext/AuthProvider";

function App() {
  return (
    <React.StrictMode>
      {/* LanguageProvider এবং AuthProvider উভয়ই RouterProvider কে র্যাপ করবে */}
      <LanguageProvider>
        <AuthProvider>
          <RouterProvider router={AppRoutes} />{" "}
          {/* <<--- এখানে RouterProvider ব্যবহার করা সঠিক */}
        </AuthProvider>
      </LanguageProvider>
    </React.StrictMode>
    // <<--- এখানে অতিরিক্ত কমা (,) ছিল, সেটি মুছে ফেলা হয়েছে (যদি আপনার কোডে থাকে)
  );
}

export default App;
